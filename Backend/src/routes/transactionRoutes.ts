import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { handleCreateTransaction, handleGetAllTransactions, handleGetTransactionById, handleGetAccountById } from '../controllers/transactionController';
import { transactionValidation } from '../validation/transactionValidation'; // Import the validation

export async function transactionRoutes(fastify: FastifyInstance) {
  // Route for creating a transaction with validation
  fastify.post('/api/transactions', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Validate request body using Zod schema
      const validatedBody = transactionValidation.parse(request.body);
      await handleCreateTransaction(request, reply);  // Proceed to controller if valid
    } catch (error) {
      if (error instanceof Error) {
        // Type guard to safely access properties of the error
        reply.status(400).send({ error: 'Invalid input', details: error.message });
      } else {
        reply.status(400).send({ error: 'Unknown error occurred' });
      }
    }
  });

  // Route for fetching all transactions
  fastify.get('/api/transactions', handleGetAllTransactions);

  // Route for fetching transaction by ID
  fastify.get('/api/transactions/:transaction_id', handleGetTransactionById);

  // Route for fetching account by ID
  fastify.get('/api/accounts/:account_id', handleGetAccountById);
}
