export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  //Check for API key authentication
  const apiKey =
    req.headers["x-api-key"] ||
    req.headers["authorization"]?.replace("Bearer ", "");
  const expectedApiKey = process.env.API_KEY;

  if (!expectedApiKey) {
    console.error("API_KEY environment variable not set");
    return res.status(500).json({ error: "Server configuration error" });
  }

  if (!apiKey) {
    return res.status(401).json({
      error:
        "API key required. Provide it in x-api-key header or Authorization header with Bearer token.",
    });
  }

  if (apiKey !== expectedApiKey) {
    return res.status(403).json({ error: "Invalid API key" });
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
    result,
  };

  res.status(200).json(processed);
}