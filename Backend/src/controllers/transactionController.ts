import { FastifyRequest, FastifyReply } from 'fastify';
import { createTransaction, getAllTransactions, getTransactionById, getAccountById } from '../services/dbService';
import { TransactionRequest } from '../types/transactionTypes';

// Handler to create a new transaction
export async function handleCreateTransaction(req: FastifyRequest, reply: FastifyReply) {
  const transaction = req.body as TransactionRequest;

  try {
    await createTransaction(transaction);
    reply.code(201).send({ message: 'Transaction created successfully' });
  } catch (error) {
    reply.code(500).send({ error: 'Failed to create transaction' });
  }
}

// Handler to get all transactions
export async function handleGetAllTransactions(req: FastifyRequest, reply: FastifyReply) {
  try {
    const transactions = await getAllTransactions();
    reply.send(transactions);
  } catch (error) {
    reply.code(500).send({ error: 'Failed to retrieve transactions' });
  }
}

// Handler to get a transaction by ID
export async function handleGetTransactionById(req: FastifyRequest, reply: FastifyReply) {
  const { transaction_id } = req.params as { transaction_id: string };

  try {
    const transaction = await getTransactionById(transaction_id);
    if (transaction) {
      reply.send(transaction);
    } else {
      reply.code(404).send({ error: 'Transaction not found' });
    }
  } catch (error) {
    reply.code(500).send({ error: 'Failed to retrieve transaction' });
  }
}

// Handler to get account data by ID
export async function handleGetAccountById(req: FastifyRequest, reply: FastifyReply) {
  const { account_id } = req.params as { account_id: string };

  try {
    const account = await getAccountById(account_id);
    if (account) {
      reply.send(account);
    } else {
      reply.code(404).send({ error: 'Account not found' });
    }
  } catch (error) {
    console.error('Failed to retrieve account:', error);
    reply.code(500).send({ error: 'Failed to retrieve account' });
  }
}

