import { DataSource } from 'typeorm';
import { Review } from '../../review/entities/review.entity';
import { User } from '../../user/entities/user.entity';
import { UserRole } from '../../user/enums/user-role.enum';

export const reviewSeeds = [
  {
    rating: 5,
    comment: 'Excelente profissional! Superou minhas expectativas.',
    reviewerEmail: 'joao@connectingbr.com',
    professionalEmail: 'maria@connectingbr.com'
  },
  {
    rating: 4,
    comment: 'Muito bom atendimento, recomendo!',
    reviewerEmail: 'admin@connectingbr.com',
    professionalEmail: 'maria@connectingbr.com'
  },
  {
    rating: 5,
    comment: 'Profissional muito atenciosa e competente.',
    reviewerEmail: 'joao@connectingbr.com',
    professionalEmail: 'maria@connectingbr.com'
  }
];

export async function seedReviews(dataSource: DataSource) {
  const reviewRepository = dataSource.getRepository(Review);
  const userRepository = dataSource.getRepository(User);
  
  // Check if reviews already exist
  const existingReviews = await reviewRepository.find();
  if (existingReviews.length > 0) {
    console.log('⭐ Reviews already exist in database');
    return;
  }

  // Create reviews
  for (const reviewData of reviewSeeds) {
    const { reviewerEmail, professionalEmail, ...reviewInfo } = reviewData;

    // Find reviewer
    const reviewer = await userRepository.findOne({
      where: { email: reviewerEmail }
    });

    // Find professional
    const professional = await userRepository.findOne({
      where: { email: professionalEmail }
    });

    if (!reviewer || !professional) {
      console.log(`⚠️ Reviewer or professional not found for review`);
      continue;
    }

    const review = reviewRepository.create({
      ...reviewInfo,
      reviewerId: reviewer.id,
      professionalId: professional.id
    });

    await reviewRepository.save(review);
  }

  // Calculate and update average rating for professionals
  const professionals = await userRepository.find({
    where: { role: UserRole.PROFESSIONAL }
  });

  for (const professional of professionals) {
    const result = await reviewRepository
      .createQueryBuilder('review')
      .where('review.professionalId = :professionalId', { professionalId: professional.id })
      .select('AVG(review.rating)', 'average')
      .getRawOne();

    if (result.average) {
      const averageRating = Number(result.average);
      await userRepository.update(
        professional.id,
        { averageRating }
      );
      console.log(`📊 Updated professional ${professional.name} (ID: ${professional.id}) with average rating: ${averageRating}`);
    }
  }

  // Verify the updates
  const updatedProfessionals = await userRepository.find({
    where: { role: UserRole.PROFESSIONAL },
    select: ['id', 'name', 'averageRating']
  });

  console.log('🔍 Current professional ratings:');
  updatedProfessionals.forEach(prof => {
    console.log(`   - ${prof.name}: ${prof.averageRating}`);
  });

  console.log('🌱 Reviews seeded successfully');
}
