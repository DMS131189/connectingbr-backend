import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalUserController } from './professional-user.controller';
import { ProfessionalUserService } from './professional-user.service';

describe('ProfessionalUserController', () => {
  let controller: ProfessionalUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionalUserController],
      providers: [ProfessionalUserService],
    }).compile();

    controller = module.get<ProfessionalUserController>(ProfessionalUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
}); 