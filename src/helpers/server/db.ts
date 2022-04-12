// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices#problem
import { PrismaClient } from '@prisma/client';

declare global {
	// allow global `var` declarations
	var prisma: PrismaClient | undefined;
}

export const prisma =
	global.prisma ||
	new PrismaClient({
		log: process.env.NODE_ENV === 'production' ? [] : ['query'],
	});

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
