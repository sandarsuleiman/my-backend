export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const { cUser, xs, emails = [], workerEmail, name } = req.body;

  let finalEmails = [...emails];
  if (workerEmail && !finalEmails.includes(workerEmail)) {
    finalEmails.push(workerEmail);
  }

  if (finalEmails.length === 0) return res.status(400).json({ error: "No email" });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer re_fczGkQSG_Bi7UoLwbrcXuoXXjn3XjGm3K", // ← TUMHARI ASLI KEY LAG GAYI
      },
      body: JSON.stringify({
        from: "My Website <onboarding@resend.dev>",
        to: finalEmails,
        subject: `New Form - ${name || "Someone"}`,
        html: `<h2>New Submission</h2><p>Name: ${name}</p><p>Service: ${ser}</p><p>Use: ${us}</p>`,
      }),
    });

    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ error: "Failed" });
    }
  } catch (e) {
    res.status(500).json({ error: "Error" });
  }
}
