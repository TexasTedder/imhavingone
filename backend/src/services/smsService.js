async function sendSms(destination, message, testMode = true) {
  const clientId = process.env.SMSPORTAL_CLIENT_ID;
  const secretKey = process.env.SMSPORTAL_SECRET_KEY;

  if (!clientId || !secretKey) {
    throw new Error("SMSPortal credentials are not configured.");
  }

  const credentials = Buffer.from(
    `${clientId}:${secretKey}`
  ).toString("base64");

  const response = await fetch(
    "https://rest.smsportal.com/v3/BulkMessages",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            destination,
            content: message,
          },
        ],
        sendOptions: {
          testMode,
        },
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `SMSPortal error ${response.status}: ${JSON.stringify(data)}`
    );
  }

  return data;
}

module.exports = {
  sendSms,
};