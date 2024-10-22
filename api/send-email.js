import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_DELICE_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nombre, correo, mensaje } = req.body;

    try {
      const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['javierdpaz8@gmail.com', 'guzmancitaprado@gmail.com'],
        subject: `Formulario de Contacto - Nombre: ${nombre} - Correo: ${correo}`,
        html: `<p>${mensaje}</p>`,
      });

      if (error) {
        return res.status(500).json({ error: 'Error enviando el correo' });
      }

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error: 'Error en la solicitud' });
    }
  } else {
    // Responder con 405 si no es un POST
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
