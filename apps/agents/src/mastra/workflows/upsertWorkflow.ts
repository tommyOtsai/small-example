import { createStep, createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';
import { db } from '@repo/db';
import { users } from '@repo/db/users';



const upsert = createStep({
  id: 'upsert',
  inputSchema: z.object({
    name: z.string().describe('The name to upsert'),
    email: z.string().describe('The email to upsert'),
  }),
  outputSchema: z.object({
    user: z.any(),
  }),
  execute: async ({ inputData }) => {
    const { name, email } = inputData;
    const user = await db
      .insert(users)
      .values({ name, email })
      .onConflictDoUpdate({
        target: users.email,
        set: { name },
      })
      .returning();
    return { user };
  },
});



const upsertWorkflow = createWorkflow({
  id: 'upsert-workflow',
  inputSchema: z.object({
    name: z.string().describe('The name to upsert'),
    email: z.string().describe('The email to upsert'),
  }),
  outputSchema: z.object({
    user: z.any(),
  }),
  steps: [upsert],
})
  .then(upsert)

upsertWorkflow.commit();

export { upsertWorkflow };
