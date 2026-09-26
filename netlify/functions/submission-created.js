// Netlify event-triggered function: runs on every verified form submission.
// Forwards waitlist submissions to Google Apps Script. Always returns 200 so an
// Apps Script problem never blocks or fails the form submission.
// ESM export because package.json sets "type": "module".
export const handler = async (event) => {
  let payload;
  try {
    payload = JSON.parse(event.body).payload;
  } catch (err) {
    console.error('Could not parse event body', err);
    return { statusCode: 200, body: 'bad body' };
  }
  if (!payload || payload.form_name !== 'waitlist') {
    return { statusCode: 200, body: 'skipped' };
  }
  const url = process.env.WAITLIST_WEBHOOK_URL;
  if (!url) {
    console.error('WAITLIST_WEBHOOK_URL is not set');
    return { statusCode: 200, body: 'no url' };
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow'
    });
    const text = await res.text();
    console.log('Apps Script responded', res.status, text.slice(0, 100));
  } catch (err) {
    console.error('Forward to Apps Script failed', err);
  }
  return { statusCode: 200, body: 'ok' };
};
