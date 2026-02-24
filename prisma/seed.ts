import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Find your user by email (change this to your actual email)
  const user = await prisma.user.findUnique({
    where: { email: 'your-email@gmail.com' } // ← CHANGE THIS
  })

  if (!user) {
    console.error('User not found. Change the email in seed.ts')
    return
  }

  // Create a test project
  const project = await prisma.project.create({
    data: {
      name: 'My First Project',
      description: 'Testing the dashboard',
      status: 'in_progress',
      userId: user.id,
    }
  })

  // Create some test generations
  await prisma.generation.createMany({
    data: [
      {
        prompt: 'A cinematic shot of a city skyline at sunset',
        engine: 'runway',
        style: 'Cinematic',
        aspectRatio: '16:9',
        duration: 10,
        resolution: '1080p',
        status: 'complete',
        credits: 2,
        userId: user.id,
        projectId: project.id,
      },
      {
        prompt: 'Slow motion rain falling on neon-lit streets',
        engine: 'pika',
        style: 'Film Noir',
        aspectRatio: '16:9',
        duration: 8,
        resolution: '720p',
        status: 'complete',
        credits: 2,
        userId: user.id,
        projectId: project.id,
      },
      {
        prompt: 'Desert landscape with dramatic clouds',
        engine: 'kling',
        style: 'Epic Drama',
        aspectRatio: '2.39:1',
        duration: 12,
        resolution: '4K',
        status: 'processing',
        credits: 3,
        userId: user.id,
      },
    ]
  })

  console.log('✅ Seed data created!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())