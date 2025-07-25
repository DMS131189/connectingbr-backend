# Database Configuration

This NestJS project supports both SQLite (development) and PostgreSQL (production) databases.

## Environment Detection

The application automatically detects the environment:
- **Development**: Uses SQLite with `database.sqlite` file
- **Production**: Uses PostgreSQL with environment variables

## Configuration Logic

### Development Environment (Local)
```typescript
// SQLite configuration
{
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [User, Category, Review],
  synchronize: true, // for development only
}
```

### Production Environment
```typescript
// PostgreSQL configuration
{
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'connectingbr',
  entities: [User, Category, Review],
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
}
```

## Environment Variables

### Development (SQLite)
No environment variables needed - uses SQLite by default.

### Production (PostgreSQL)

#### Option 1: Individual Environment Variables
Create a `.env` file or set environment variables:

```env
NODE_ENV=production
DB_HOST=your-postgres-host
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_DATABASE=connectingbr
DB_SYNCHRONIZE=false
```

#### Option 2: DATABASE_URL (Recommended for Cloud Platforms)
Set a single DATABASE_URL environment variable:

```env
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:port/database
DB_SYNCHRONIZE=false
```

**Example:**
```env
DATABASE_URL=postgresql://connectingbrdata_user:6fSWkRo02oGaTPiWih8FguDsTg1Aw9kH@dpg-d21nd42dbo4c73ed4670-a/connectingbrdata
```

**Priority Order:**
1. `DATABASE_URL` (if provided)
2. Individual environment variables (`DB_HOST`, `DB_PORT`, etc.)

## How to Run

### Development (SQLite)
```bash
npm run start:dev
```

### Production (PostgreSQL)
```bash
NODE_ENV=production npm run start:prod
```

## Test Configuration

Access the `/config` endpoint to verify database configuration:
```bash
curl http://localhost:3000/config
```

Response:
```json
{
  "environment": "development",
  "database": "sqlite",
  "isDevelopment": true,
  "isProduction": false
}
```

## Database Setup

### SQLite (Development)
- Automatically creates `database.sqlite` file
- No additional setup required

### PostgreSQL (Production)
1. Install PostgreSQL
2. Create database: `createdb connectingbr`
3. Set environment variables
4. Run the application

## Files Structure

```
src/
├── config/
│   ├── database.config.ts    # Database configuration logic
│   └── config.service.ts     # Environment management
├── app.module.ts             # Updated to use dynamic config
└── app.controller.ts         # Added config endpoint
``` 