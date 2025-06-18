export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

    const obj = req.body;
    const data = obj.data;
    console.log("Received from FileMaker:", data);
    function aggregateData(data) {
      const aggregationMap = new Map();

      for (const item of data) {
        const key = `${item.code}_${item.value}`;
        if (aggregationMap.has(key)) {
          const existingItem = aggregationMap.get(key);
          existingItem.quantity += 1;
        } else {
          aggregationMap.set(key, {
            quantity: 1,
            code: item.code,
            value: item.value,
          });
        }
      }

      return Array.from(aggregationMap.values());
    }

  const result = aggregateData(data);
  console.log(result);
  // Example processing
  const processed = {
    status: "success",
    timestamp: Date.now(),
    data: JSON.stringify(result),
  };

  res.status(200).json(processed);
}