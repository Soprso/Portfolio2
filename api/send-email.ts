import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
      service_id: process.env.EMAILJS_SERVICE,
      template_id: process.env.EMAILJS_TEMPLATE,
      user_id: process.env.EMAILJS_PUBLIC,
      accessToken: process.env.EMAILJS_PRIVATE,
      template_params: { from_name: name, from_email: email, message }
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully', data: response.data });
  } catch (error) {
    console.error('EmailJS Error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
