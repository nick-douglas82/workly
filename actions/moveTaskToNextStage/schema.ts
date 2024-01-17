import { z } from 'zod'

export const MoveTask = z.object({
  id: z.string(),
  // TODO: FIX THIS!
  // direction: z.enum(['previous', 'next']),
  direction: z.string(),
})
