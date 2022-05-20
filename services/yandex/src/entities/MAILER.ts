import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  secure: process.env.MAILER_PORT === '465',
  port: Number(process.env.MAILER_PORT),
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS
  }
});

const from = `"${process.env.MAILER_USER}" <${process.env.MAILER_USER}>`;

export async function sendCode(email: string, code: number) {
  const info = await transporter.sendMail({
    from,
    to: email,
    subject: 'E-posta doğrulama ✔', // subject
    text: `Aktivasyon kodu: ${code}`, // plain text
  });

  console.log('[ activation code ] message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

export async function sendContactForm(from: string, title: string, text: string) {
  const info = await transporter.sendMail({
    from,
    to: process.env.CONTACT_EMAIL_ADDRESS,
    subject: 'contact ✔',
    html: `<h3>${title}</h3><p>sender: ${from}</p><p>${text}</p>`
  });

  console.log('[ contact ] message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}
