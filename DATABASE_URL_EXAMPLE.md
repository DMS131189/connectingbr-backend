# DATABASE_URL Configuration Example

This example demonstrates how to use the `DATABASE_URL` environment variable for PostgreSQL connection.

## Example DATABASE_URL

```env
DATABASE_URL=postgresql://connectingbrdata_user:6fSWkRo02oGaTPiWih8FguDsTg1Aw9kH@dpg-d21nd42dbo4c73ed4670-a/connectingbrdata
```

## URL Structure

```
postgresql://username:password@host:port/database
```

### Components:
- **Protocol**: `postgresql://`
- **Username**: `connectingbrdata_user`
- **Password**: `6fSWkRo02oGaTPiWih8FguDsTg1Aw9kH`
- **Host**: `dpg-d21nd42dbo4c73ed4670-a`
- **Port**: `5432` (default, not specified in URL)
- **Database**: `connectingbrdata`

## Environment Setup

### Development (SQLite)
```bash
# No environment variables needed
npm run start:dev
```

### Production (PostgreSQL with DATABASE_URL)
```bash
# Set environment variable
export DATABASE_URL="postgresql://connectingbrdata_user:6fSWkRo02oGaTPiWih8FguDsTg1Aw9kH@dpg-d21nd42dbo4c73ed4670-a/connectingbrdata"
export NODE_ENV=production
npm run start:prod
```

### Production (PostgreSQL with individual variables)
```bash
# Alternative: Use individual environment variables
export NODE_ENV=production
export DB_HOST=dpg-d21nd42dbo4c73ed4670-a
export DB_PORT=5432
export DB_USERNAME=connectingbrdata_user
export DB_PASSWORD=6fSWkRo02oGaTPiWih8FguDsTg1Aw9kH
export DB_DATABASE=connectingbrdata
npm run start:prod
```

## Priority Order

1. **DATABASE_URL** (if provided) - Recommended for cloud platforms
2. **Individual variables** (DB_HOST, DB_PORT, etc.) - Fallback option

## Testing the Configuration

Access the `/config` endpoint to verify your database configuration:

```bash
curl http://localhost:3000/config
```

Expected response for production with DATABASE_URL:
```json
{
  "environment": "production",
  "database": "postgres",
  "isDevelopment": false,
  "isProduction": true,
  "databaseUrl": "***hidden***",
  "databaseConfig": {
    "host": "dpg-d21nd42dbo4c73ed4670-a",
    "port": 5432,
    "database": "connectingbrdata",
    "username": "connectingbrdata_user",
    "password": "***hidden***"
  }
}
```

## Cloud Platform Integration

This configuration works seamlessly with:
- **Heroku**: Uses `DATABASE_URL` automatically
- **Railway**: Provides `DATABASE_URL` environment variable
- **Supabase**: Connection string format
- **DigitalOcean**: Managed PostgreSQL clusters
- **AWS RDS**: Connection string format 