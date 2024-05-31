import { PrismaClient } from '@prisma/client';
export const getClient = async () => {
  const client = new PrismaClient();
  await client.$connect();
  return client;
};
