import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Database URL parsing', () => {
    it('should parse PostgreSQL URL correctly', () => {
      const testUrl = 'postgresql://connectingbrdata_user:6fSWkRo02oGaTPiWih8FguDsTg1Aw9kH@dpg-d21nd42dbo4c73ed4670-a/connectingbrdata';
      
      // Access the private method through reflection for testing
      const parsePostgresUrl = (service as any).parsePostgresUrl.bind(service);
      const result = parsePostgresUrl(testUrl);
      
      expect(result).toEqual({
        host: 'dpg-d21nd42dbo4c73ed4670-a',
        port: 5432, // Default port when not specified
        username: 'connectingbrdata_user',
        password: '6fSWkRo02oGaTPiWih8FguDsTg1Aw9kH',
        database: 'connectingbrdata',
      });
    });

    it('should parse PostgreSQL URL with custom port', () => {
      const testUrl = 'postgresql://user:pass@host:5433/database';
      
      const parsePostgresUrl = (service as any).parsePostgresUrl.bind(service);
      const result = parsePostgresUrl(testUrl);
      
      expect(result).toEqual({
        host: 'host',
        port: 5433,
        username: 'user',
        password: 'pass',
        database: 'database',
      });
    });

    it('should throw error for invalid URL', () => {
      const invalidUrl = 'invalid-url';
      
      const parsePostgresUrl = (service as any).parsePostgresUrl.bind(service);
      
      expect(() => parsePostgresUrl(invalidUrl)).toThrow('Invalid DATABASE_URL format');
    });
  });

  describe('Environment detection', () => {
    it('should detect development environment by default', () => {
      expect(service.isDevelopment).toBe(true);
      expect(service.isProduction).toBe(false);
      expect(service.dbType).toBe('sqlite');
    });

    it('should detect production environment when NODE_ENV is set', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      
      const productionService = new ConfigService();
      expect(productionService.isProduction).toBe(true);
      expect(productionService.isDevelopment).toBe(false);
      expect(productionService.dbType).toBe('postgres');
      
      // Restore original environment
      process.env.NODE_ENV = originalEnv;
    });
  });
}); 