// validations/transactionValidation.ts
import { z } from 'zod';

export const transactionValidation = z.object({
  account_id: z.string().uuid({ message: 'Invalid account ID format' }),  // Validates that it's a UUID
  amount: z.number({ message: 'Amount must be a number' }),  // Accepts any number (positive, negative, or zero)
});
