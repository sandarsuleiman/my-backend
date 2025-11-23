export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { emails, workerEmails, ...data } = req.body;

  const emailText = `
New Submission:
${JSON.stringify(data, null, 2)}
  `;

  // Ye email-js, SMTP ya koi bhi email service integrate kar sakta hun agar tum batao ki konsa use karna hai
  console.log("Sending email to:", emails);
  console.log("Sending worker email to:", workerEmails);

  return res.status(200).json({ message: "Success" });
}
