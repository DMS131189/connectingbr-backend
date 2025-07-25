import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get nodeEnv(): string {
    return process.env.NODE_ENV || 'development';
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  // Database configuration
  get dbType(): string {
    return this.isDevelopment ? 'sqlite' : 'postgres';
  }

  get dbUrl(): string | undefined {
    return process.env.DATABASE_URL;
  }

  get dbHost(): string {
    return process.env.DB_HOST || 'localhost';
  }

  get dbPort(): number {
    return parseInt(process.env.DB_PORT || '5432');
  }

  get dbUsername(): string {
    return process.env.DB_USERNAME || 'postgres';
  }

  get dbPassword(): string {
    return process.env.DB_PASSWORD || 'password';
  }

  get dbDatabase(): string {
    return process.env.DB_DATABASE || 'connectingbr';
  }

  get dbSynchronize(): boolean {
    return this.isDevelopment || process.env.DB_SYNCHRONIZE === 'true';
  }

  /**
   * Parse PostgreSQL URL to extract connection parameters
   * Format: postgresql://username:password@host:port/database
   */
  private parsePostgresUrl(url: string): {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  } {
    try {
      const urlObj = new URL(url);
      const host = urlObj.hostname;
      const port = parseInt(urlObj.port || '5432');
      const username = urlObj.username;
      const password = urlObj.password;
      const database = urlObj.pathname.slice(1); // Remove leading slash

      return {
        host,
        port,
        username,
        password,
        database,
      };
    } catch (error) {
      throw new Error(`Invalid DATABASE_URL format: ${error.message}`);
    }
  }

  getDatabaseConfig() {
    if (this.isDevelopment) {
      return {
        type: 'sqlite' as const,
        database: 'database.sqlite',
        synchronize: true,
      };
    } else {
      // Check if DATABASE_URL is provided (common in cloud platforms)
      if (this.dbUrl) {
        const parsedUrl = this.parsePostgresUrl(this.dbUrl);
        return {
          type: 'postgres' as const,
          host: parsedUrl.host,
          port: parsedUrl.port,
          username: parsedUrl.username,
          password: parsedUrl.password,
          database: parsedUrl.database,
          synchronize: this.dbSynchronize,
          ssl: this.isProduction ? { rejectUnauthorized: false } : false,
        };
      }

      // Fallback to individual environment variables
      return {
        type: 'postgres' as const,
        host: this.dbHost,
        port: this.dbPort,
        username: this.dbUsername,
        password: this.dbPassword,
        database: this.dbDatabase,
        synchronize: this.dbSynchronize,
        ssl: this.isProduction ? { rejectUnauthorized: false } : false,
      };
    }
  }
} 