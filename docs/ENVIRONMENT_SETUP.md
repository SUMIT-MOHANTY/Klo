# Environment Setup Guide

## Overview

This document describes how to configure environment variables for the Full-Stack Web Application Scaffold.

## Quick Start

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Replace placeholder values with real credentials (see below).

3. Verify configuration on startup - the application will validate all required variables.

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Application environment | Yes | `development` |
| `PORT` | Server port number | Yes | `3000` |
| `API_BASE_URL` | Backend API base URL | Yes | `http://localhost:3001/api` |
| `AUTH_SERVICE_URL` | Authentication service URL | Yes | `http://localhost:3002/auth` |
| `AZURE_OPENAI_API_KEY` | Azure OpenAI API key | Yes | (placeholder) |
| `DATABASE_URL` | PostgreSQL connection string | Yes | `postgresql://user:password@localhost:5432/appdb` |

## Obtaining Credentials

### Azure OpenAI API Key

1. Log in to the [Azure Portal](https://portal.azure.com/)
2. Navigate to **Azure AI Services** > **Azure OpenAI**
3. Create or select an OpenAI resource
4. Go to **Keys and Endpoint** in the resource menu
5. Copy one of the available keys

### Database URL

Replace the placeholder with your PostgreSQL connection string:
```
postgresql://username:password@host:port/database_name
```

Example for local development:
```
postgresql://myuser:mypassword@localhost:5432/mydb
```

## Placeholder Values to Replace

The following values in `.env` are placeholders and MUST be replaced before production:

- `AZURE_OPENAI_API_KEY=placeholder_azure_openai_key_replace_me`
- `DATABASE_URL=postgresql://user:password@localhost:5432/appdb`

## Mock Services

In development mode, if credentials are unavailable or are placeholders:

- **Auth Service**: Falls back to `http://localhost:4000/mock/auth`
- **AI Service**: Falls back to `http://localhost:4000/mock/ai`

This allows development to proceed without real credentials.

## Verification

On application startup, the configuration module will:

1. Validate all required environment variables
2. Check for placeholder values and warn
3. Enable mock fallback if real credentials unavailable
4. Throw errors for missing required configuration

Example successful startup:
```
[Config] Loading configuration...
[Validator] Configuration validated successfully
[Server] Starting on port 3000
```

## Troubleshooting

### "Configuration validation failed"

Ensure all required variables are set and not placeholder values. Check the error message for specific issues.

### "PORT must be a valid port number"

Ensure PORT is between 1 and 65535.

### "Invalid URL format"

Ensure API_BASE_URL and AUTH_SERVICE_URL use http:// or https:// protocol.
