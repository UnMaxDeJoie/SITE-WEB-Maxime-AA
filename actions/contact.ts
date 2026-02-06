'use server';

import nodemailer from 'nodemailer';

export async function sendEmail(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!email || !subject || !message) {
        return { success: false, message: 'Tous les champs sont requis.' };
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: 'maxime.aitadda@gmail.com',
            replyTo: email,
            subject: `[Contact Portfolio] ${subject}`,
            text: `Message de: ${email}\n\n${message}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #333;">Nouveau message de contact</h2>
                    <p><strong>De :</strong> ${email}</p>
                    <p><strong>Sujet :</strong> ${subject}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="white-space: pre-wrap; color: #555;">${message}</p>
                </div>
            `,
        });

        return { success: true, message: 'Email envoyé avec succès.' };
    } catch (error: any) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer.' };
    }
}
