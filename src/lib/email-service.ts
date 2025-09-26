// Email service using Google Apps Script via proxy server
// Sends emails via forms@scrumboks.nl

// Proxy server URL (handles CORS)
const PROXY_URL = import.meta.env.DEV
  ? 'http://localhost:3005/api/email'
  : '/api/email';

// File upload URL
const UPLOAD_URL = import.meta.env.DEV
  ? 'http://localhost:3005/api/upload'
  : '/api/upload';

// Upload file and get temporary URL
const uploadFile = async (file: File): Promise<{ 
  fileUrl: string; 
  fileId: string;
  optimizedUrl?: string;
  thumbnailUrl?: string;
} | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      return {
        fileUrl: result.fileUrl,
        fileId: result.fileId,
        optimizedUrl: result.optimizedUrl,
        thumbnailUrl: result.thumbnailUrl,
      };
    } else {
      throw new Error(result.error || 'Upload failed');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

// Convert file to base64 (fallback for non-photo uploads)
const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data:image/jpeg;base64, prefix
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

// Email Configuration - Pas deze aan om emails te sturen naar andere adressen
const EMAIL_CONFIG = {
  contact: {
    to: 'secretaris@scrumboks.nl', // Contact formulier
    subject: 'Nieuw Contact Bericht',
  },
  club50: {
    to: 'bestuur@scrumboks.nl', // Club van 50 formulier
    subject: 'Nieuwe Club van 50 Aanmelding',
  },
  sponsor: {
    to: 'bestuur@scrumboks.nl', // Sponsor formulier
    subject: 'Nieuwe Sponsor Aanvraag',
  },
  proeftraining: {
    to: 'secretaris@scrumboks.nl', // Proeftraining formulier
    subject: 'Nieuwe Proeftraining Aanvraag',
  },
  wordLidIncomplete: {
    to: 'forms@scrumboks.nl', // Incomplete Word Lid aanmelding (test)
    subject: 'Incomplete Word Lid Aanmelding',
  },
  wordLidComplete: {
    to: 'forms@scrumboks.nl', // Complete Word Lid aanmelding (test)
    subject: 'Nieuwe Word Lid Aanmelding',
  },
};

// Email templates
export const generateContactEmailHTML = (data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
      <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1e40af; margin: 0; font-size: 28px;">🏉 Rugby Club de Scrumboks</h1>
          <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 16px;">Nieuw Contact Bericht</p>
        </div>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Contactgegevens:</h3>
          <p style="margin: 8px 0;"><strong>Naam:</strong> ${data.name}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${
            data.email
          }" style="color: #1e40af;">${data.email}</a></p>
          ${
            data.phone
              ? `<p style="margin: 8px 0;"><strong>Telefoon:</strong> <a href="tel:${data.phone}" style="color: #1e40af;">${data.phone}</a></p>`
              : ''
          }
          <p style="margin: 8px 0;"><strong>Onderwerp:</strong> ${
            data.subject
          }</p>
        </div>
        
        <div style="background: #e0e7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #1e40af; margin-top: 0;">Bericht:</h4>
          <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            Dit bericht is ontvangen via de <a href="https://scrumboks.nl" style="color: #1e40af;">scrumboks.nl</a> website.
          </p>
        </div>
      </div>
    </div>
  `;
};

export const generateClub50EmailHTML = (data: {
  naam: string;
  email: string;
  telefoon?: string;
  extraTekst?: string;
}) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
      <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1e40af; margin: 0; font-size: 28px;">🏉 Rugby Club de Scrumboks</h1>
          <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 16px;">Nieuwe Club van 50 Aanmelding</p>
        </div>
        
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
          <h3 style="color: #92400e; margin-top: 0;">🎉 Nieuwe Club van 50 Lid!</h3>
          <p style="margin: 0; color: #92400e;">Iemand wil lid worden van de exclusieve Club van 50.</p>
        </div>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Lid Gegevens:</h3>
          <p style="margin: 8px 0;"><strong>Naam:</strong> ${data.naam}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${
            data.email
          }" style="color: #1e40af;">${data.email}</a></p>
          ${
            data.telefoon
              ? `<p style="margin: 8px 0;"><strong>Telefoon:</strong> <a href="tel:${data.telefoon}" style="color: #1e40af;">${data.telefoon}</a></p>`
              : ''
          }
        </div>
        
        ${
          data.extraTekst
            ? `
        <div style="background: #e0e7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #1e40af; margin-top: 0;">Extra Tekst:</h4>
          <p style="margin: 0; white-space: pre-wrap;">${data.extraTekst}</p>
        </div>
        `
            : ''
        }
        
        <div style="background: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #059669; margin-top: 0;">Volgende Stappen:</h4>
          <p style="margin: 0; color: #059669;">Neem contact op met dit lid om de betaling van €50 te regelen en de Club van 50 status te activeren.</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            Deze aanmelding is ontvangen via de <a href="https://scrumboks.nl" style="color: #1e40af;">scrumboks.nl</a> website.
          </p>
        </div>
      </div>
    </div>
  `;
};

export const generateSponsorEmailHTML = (data: {
  companyName: string;
  contactPerson: string;
  email: string;
  phone?: string;
  description?: string;
  selectedPackage: string;
}) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
      <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1e40af; margin: 0; font-size: 28px;">🏉 Rugby Club de Scrumboks</h1>
          <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 16px;">Nieuwe Sponsor Aanvraag</p>
        </div>
        
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
          <h3 style="color: #92400e; margin-top: 0;">💰 Nieuwe Sponsor Interesse!</h3>
          <p style="margin: 0; color: #92400e;">Een bedrijf wil sponsor worden van de Scrumboks.</p>
        </div>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Bedrijfsgegevens:</h3>
          <p style="margin: 8px 0;"><strong>Bedrijf:</strong> ${
            data.companyName
          }</p>
          <p style="margin: 8px 0;"><strong>Contactpersoon:</strong> ${
            data.contactPerson
          }</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${
            data.email
          }" style="color: #1e40af;">${data.email}</a></p>
          ${
            data.phone
              ? `<p style="margin: 8px 0;"><strong>Telefoon:</strong> <a href="tel:${data.phone}" style="color: #1e40af;">${data.phone}</a></p>`
              : ''
          }
        </div>
        
        <div style="background: #e0e7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #1e40af; margin-top: 0;">Geselecteerd Pakket:</h4>
          <p style="margin: 0; font-weight: bold; font-size: 18px; color: #1e40af;">${
            data.selectedPackage
          }</p>
        </div>
        
        ${
          data.description
            ? `
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #1e40af; margin-top: 0;">Bericht van Sponsor:</h4>
          <p style="margin: 0; white-space: pre-wrap;">${data.description}</p>
        </div>
        `
            : ''
        }
        
        <div style="background: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #059669; margin-top: 0;">Volgende Stappen:</h4>
          <p style="margin: 0; color: #059669;">Neem contact op met deze sponsor om de details van het ${
            data.selectedPackage
          } pakket te bespreken.</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            Deze aanvraag is ontvangen via de <a href="https://scrumboks.nl" style="color: #1e40af;">scrumboks.nl</a> website.
          </p>
        </div>
      </div>
    </div>
  `;
};

// Email sending functions
export const sendContactEmail = async (data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) => {
  try {
    // Use GET request with URL parameters to avoid CORS
    // Add fields in the order they appear in the form
    const params = new URLSearchParams();
    params.append('type', 'contact');
    params.append('name', data.name);
    params.append('email', data.email);
    params.append('phone', data.phone || '');
    params.append('subject', data.subject);
    params.append('message', data.message);
    params.append('to', EMAIL_CONFIG.contact.to);
    params.append('emailSubject', EMAIL_CONFIG.contact.subject);

    const response = await fetch(`${PROXY_URL}?${params.toString()}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Proxy server responded with status: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: result.success,
      messageId: result.messageId || 'sent_' + Date.now(),
    };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const sendClub50Email = async (data: {
  naam: string;
  email: string;
  telefoon?: string;
  extraTekst?: string;
}) => {
  try {
    // Use GET request with URL parameters to avoid CORS
    // Add fields in the order they appear in the form
    const params = new URLSearchParams();
    params.append('type', 'club50');
    params.append('naam', data.naam);
    params.append('email', data.email);
    params.append('telefoon', data.telefoon || '');
    params.append('extraTekst', data.extraTekst || '');
    params.append('to', EMAIL_CONFIG.club50.to);
    params.append('emailSubject', EMAIL_CONFIG.club50.subject);

    const response = await fetch(`${PROXY_URL}?${params.toString()}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Proxy server responded with status: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: result.success,
      messageId: result.messageId || 'sent_' + Date.now(),
    };
  } catch (error) {
    console.error('Error sending Club van 50 email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const sendSponsorEmail = async (data: {
  companyName: string;
  contactPerson: string;
  email: string;
  phone?: string;
  description?: string;
  selectedPackage: string;
}) => {
  try {
    // Use GET request with URL parameters to avoid CORS
    // Add fields in the order they appear in the form
    const params = new URLSearchParams();
    params.append('type', 'sponsor');
    params.append('companyName', data.companyName);
    params.append('contactPerson', data.contactPerson);
    params.append('email', data.email);
    params.append('phone', data.phone || '');
    params.append('description', data.description || '');
    params.append('package', data.selectedPackage);
    params.append('to', EMAIL_CONFIG.sponsor.to);
    params.append('emailSubject', EMAIL_CONFIG.sponsor.subject);

    const response = await fetch(`${PROXY_URL}?${params.toString()}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Proxy server responded with status: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: result.success,
      messageId: result.messageId || 'sent_' + Date.now(),
    };
  } catch (error) {
    console.error('Error sending sponsor email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const sendProeftrainingEmail = async (data: {
  naam: string;
  telefoon: string;
  email?: string;
  leeftijd: string;
}) => {
  try {
    // Use GET request with URL parameters to avoid CORS
    // Add fields in the order they appear in the form
    const params = new URLSearchParams();
    params.append('type', 'proeftraining');
    params.append('naam', data.naam);
    params.append('telefoon', data.telefoon);
    params.append('email', data.email || '');
    params.append('leeftijd', data.leeftijd);
    params.append('to', EMAIL_CONFIG.proeftraining.to);
    params.append('emailSubject', EMAIL_CONFIG.proeftraining.subject);

    const response = await fetch(`${PROXY_URL}?${params.toString()}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Proxy server responded with status: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: result.success,
      messageId: result.messageId || 'sent_' + Date.now(),
    };
  } catch (error) {
    console.error('Error sending proeftraining email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const sendWordLidIncompleteEmail = async (data: {
  currentStep: number;
  voornaam: string;
  achternaam: string;
  email: string;
  mobiel: string;
  [key: string]: any;
}) => {
  try {
    const params = new URLSearchParams();
    params.append('type', 'wordLidIncomplete');
    params.append('currentStep', data.currentStep.toString());
    params.append('voornaam', data.voornaam);
    params.append('achternaam', data.achternaam);
    params.append('email', data.email);
    params.append('mobiel', data.mobiel);

    // Upload file and get URL if present
    if (data.pasfoto && data.pasfoto instanceof File) {
      try {
        const uploadResult = await uploadFile(data.pasfoto);
        if (uploadResult) {
          // Use the original parameter names that Google Apps Script expects
          params.append('pasfoto_base64', uploadResult.fileUrl); // Keep original name for compatibility
          params.append('pasfoto_name', data.pasfoto.name);
          params.append('pasfoto_type', data.pasfoto.type);
          // Add additional info for Google Apps Script
          params.append('pasfoto_info', `Foto geüpload naar Cloudinary: ${uploadResult.fileUrl}`);
        } else {
          // Fallback: send file info without data
          params.append(
            'pasfoto_info',
            `Pasfoto geüpload: ${data.pasfoto.name} (${Math.round(
              data.pasfoto.size / 1024
            )}KB) - Kon niet uploaden`
          );
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        // Fallback: send file info without data
        params.append(
          'pasfoto_info',
          `Pasfoto geüpload: ${data.pasfoto.name} (${Math.round(
            data.pasfoto.size / 1024
          )}KB) - Upload gefaald`
        );
      }
    }

    // Add all other fields that have values
    Object.keys(data).forEach(key => {
      if (
        key !== 'currentStep' &&
        key !== 'voornaam' &&
        key !== 'achternaam' &&
        key !== 'email' &&
        key !== 'mobiel' &&
        key !== 'pasfoto' &&
        data[key]
      ) {
        params.append(key, data[key].toString());
      }
    });

    params.append('to', EMAIL_CONFIG.wordLidIncomplete.to);
    params.append('emailSubject', EMAIL_CONFIG.wordLidIncomplete.subject);

    console.log('Sending incomplete word lid email:', data);

    const response = await fetch(`${PROXY_URL}?${params.toString()}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Proxy server responded with status: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: result.success,
      messageId: result.messageId || 'sent_' + Date.now(),
    };
  } catch (error) {
    console.error('Error sending incomplete word lid email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const sendWordLidCompleteEmail = async (data: {
  [key: string]: any;
}) => {
  try {
    const formData = new FormData();
    formData.append('type', 'wordLidComplete');

    // Upload file and get URL if present
    if (data.pasfoto && data.pasfoto instanceof File) {
      try {
        const uploadResult = await uploadFile(data.pasfoto);
        if (uploadResult) {
          // Use the original parameter names that Google Apps Script expects
          formData.append('pasfoto_base64', uploadResult.fileUrl); // Keep original name for compatibility
          formData.append('pasfoto_name', data.pasfoto.name);
          formData.append('pasfoto_type', data.pasfoto.type);
          // Add additional info for Google Apps Script
          formData.append('pasfoto_info', `Foto geüpload naar Cloudinary: ${uploadResult.fileUrl}`);
        } else {
          // Fallback: send file info without data
          formData.append(
            'pasfoto_info',
            `Pasfoto geüpload: ${data.pasfoto.name} (${Math.round(
              data.pasfoto.size / 1024
            )}KB) - Kon niet uploaden`
          );
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        // Fallback: send file info without data
        formData.append(
          'pasfoto_info',
          `Pasfoto geüpload: ${data.pasfoto.name} (${Math.round(
            data.pasfoto.size / 1024
          )}KB) - Upload gefaald`
        );
      }
    }

    // Add all other fields that have values
    Object.keys(data).forEach(key => {
      if (data[key] && key !== 'pasfoto') {
        formData.append(key, data[key].toString());
      }
    });

    formData.append('to', EMAIL_CONFIG.wordLidComplete.to);
    formData.append('emailSubject', EMAIL_CONFIG.wordLidComplete.subject);

    const response = await fetch(PROXY_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Proxy server responded with status: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: result.success,
      messageId: result.messageId || 'sent_' + Date.now(),
    };
  } catch (error) {
    console.error('Error sending complete word lid email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
