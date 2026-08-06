import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  captchaToken?: string;
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const { name, email, phone, message } = data;

    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'dan@apexcovenant.com',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
          <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">
            This email was sent from your Apex Covenant contact form.
          </p>
        </div>
      `,
    });

    if (response.error) {
      console.error('Resend error:', response.error);
      return { success: false, error: 'Failed to send email' };
    }

    return { success: true, id: response.data?.id };
  } catch (error) {
    console.error('Contact form error:', error);
    return { success: false, error: 'An error occurred' };
  }
}
