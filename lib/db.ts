
// Since Prisma Client is not generated in this environment, we mock it to prevent build errors.
const globalForPrisma = globalThis as unknown as { prisma: any };

export const prisma = globalForPrisma.prisma || {
  project: {
    create: async () => {},
    findMany: async () => [],
    update: async () => {},
    delete: async () => {},
  },
  review: {
    create: async () => {},
    findMany: async () => [],
    update: async () => {},
    delete: async () => {},
  },
  $disconnect: async () => {},
};

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
