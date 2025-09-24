// Email service using Gmail SMTP
// Sends emails via forms@scrumboks.nl

import nodemailer from 'nodemailer';

// SMTP Configuration
const SMTP_CONFIG = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'forms@scrumboks.nl',
    pass: 'mzkz zpco tzrm cbqp', // App password
  },
};

// Create transporter
const transporter = nodemailer.createTransporter(SMTP_CONFIG);

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
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #1e40af;">${data.email}</a></p>
          ${data.phone ? `<p style="margin: 8px 0;"><strong>Telefoon:</strong> <a href="tel:${data.phone}" style="color: #1e40af;">${data.phone}</a></p>` : ''}
          <p style="margin: 8px 0;"><strong>Onderwerp:</strong> ${data.subject}</p>
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
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #1e40af;">${data.email}</a></p>
          ${data.telefoon ? `<p style="margin: 8px 0;"><strong>Telefoon:</strong> <a href="tel:${data.telefoon}" style="color: #1e40af;">${data.telefoon}</a></p>` : ''}
        </div>
        
        ${data.extraTekst ? `
        <div style="background: #e0e7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #1e40af; margin-top: 0;">Extra Tekst:</h4>
          <p style="margin: 0; white-space: pre-wrap;">${data.extraTekst}</p>
        </div>
        ` : ''}
        
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
          <p style="margin: 8px 0;"><strong>Bedrijf:</strong> ${data.companyName}</p>
          <p style="margin: 8px 0;"><strong>Contactpersoon:</strong> ${data.contactPerson}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #1e40af;">${data.email}</a></p>
          ${data.phone ? `<p style="margin: 8px 0;"><strong>Telefoon:</strong> <a href="tel:${data.phone}" style="color: #1e40af;">${data.phone}</a></p>` : ''}
        </div>
        
        <div style="background: #e0e7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #1e40af; margin-top: 0;">Geselecteerd Pakket:</h4>
          <p style="margin: 0; font-weight: bold; font-size: 18px; color: #1e40af;">${data.selectedPackage}</p>
        </div>
        
        ${data.description ? `
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #1e40af; margin-top: 0;">Bericht van Sponsor:</h4>
          <p style="margin: 0; white-space: pre-wrap;">${data.description}</p>
        </div>
        ` : ''}
        
        <div style="background: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #059669; margin-top: 0;">Volgende Stappen:</h4>
          <p style="margin: 0; color: #059669;">Neem contact op met deze sponsor om de details van het ${data.selectedPackage} pakket te bespreken.</p>
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
    const mailOptions = {
      from: 'forms@scrumboks.nl',
      to: 'info@scrumboks.nl',
      subject: `Contact: ${data.subject} - ${data.name}`,
      html: generateContactEmailHTML(data),
      text: `
Contact via scrumboks.nl

Naam: ${data.name}
Email: ${data.email}
${data.phone ? `Telefoon: ${data.phone}` : ''}
Onderwerp: ${data.subject}

Bericht:
${data.message}
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Contact email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const sendClub50Email = async (data: {
  naam: string;
  email: string;
  telefoon?: string;
  extraTekst?: string;
}) => {
  try {
    const mailOptions = {
      from: 'forms@scrumboks.nl',
      to: 'sponsorzaken@scrumboks.nl',
      subject: `Club van 50 Aanmelding - ${data.naam}`,
      html: generateClub50EmailHTML(data),
      text: `
Club van 50 Aanmelding via scrumboks.nl

Naam: ${data.naam}
Email: ${data.email}
${data.telefoon ? `Telefoon: ${data.telefoon}` : ''}

${data.extraTekst ? `Extra Tekst:\n${data.extraTekst}` : ''}
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Club van 50 email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending Club van 50 email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
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
    const mailOptions = {
      from: 'forms@scrumboks.nl',
      to: 'sponsorzaken@scrumboks.nl',
      subject: `Sponsor Aanvraag - ${data.companyName} (${data.selectedPackage})`,
      html: generateSponsorEmailHTML(data),
      text: `
Sponsor Aanvraag via scrumboks.nl

Bedrijf: ${data.companyName}
Contactpersoon: ${data.contactPerson}
Email: ${data.email}
${data.phone ? `Telefoon: ${data.phone}` : ''}
Pakket: ${data.selectedPackage}

${data.description ? `Bericht:\n${data.description}` : ''}
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Sponsor email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending sponsor email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};
