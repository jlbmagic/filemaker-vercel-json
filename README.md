# FileMaker Vercel API

A secure API endpoint for processing FileMaker data.

## Setup

1. Clone this repository
2. Copy `.env.example` to `.env.local` (for local development) or set environment variables in your Vercel dashboard
3. Set your API key in the environment variable:
   ```
   API_KEY=your-secret-api-key-here
   ```

## API Usage

### Authentication

All requests must include an API key in one of the following ways:

1. **x-api-key header:**
   ```
   x-api-key: your-api-key-here
   ```

2. **Authorization header with Bearer token:**
   ```
   Authorization: Bearer your-api-key-here
   ```

### Endpoint

**POST** `/api/process`

**Headers:**
- `Content-Type: application/json`
- `x-api-key: your-api-key-here` (or Authorization header)

**Request Body:**
```json
{
  "data": [
    {
      "code": "ABC",
      "value": "123"
    }
  ]
}
```

**Response:**
```json
{
  "status": "success",
  "timestamp": 1642516800000,
  "result": [
    {
      "quantity": 1,
      "code": "ABC",
      "value": "123"
    }
  ]
}
```

## Deployment

Deploy to Vercel and make sure to set the `API_KEY` environment variable in your Vercel project settings.

## Security

- The API key should be kept secret and not committed to version control
- Use a strong, randomly generated API key
- Rotate the API key periodically for better security
