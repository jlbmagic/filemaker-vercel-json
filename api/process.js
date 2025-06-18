export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data = req.body;
  console.log('Received from FileMaker:', data);

  // Example processing
  const processed = { status: 'received', timestamp: Date.now() };

  res.status(200).json(processed);
}