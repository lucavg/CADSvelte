import prisma from '@prisma/client';

export const db = new prisma.PrismaClient({
	log: ['query', 'info', 'warn']
});
