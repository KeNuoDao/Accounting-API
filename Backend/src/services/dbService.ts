// src/services/dbService.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import pool from '../../database/dbConfig'; // Import the pool from dbConfig
import { transactions, accounts } from '../models/schema'; // Ensure the correct path
import { TransactionRequest } from '../types/transactionTypes';
import { eq, desc } from 'drizzle-orm'; // Import the required operators
import { v4 as uuidv4 } from 'uuid'; // Import the UUID generator

// Initialize Drizzle ORM with the pool
const db = drizzle(pool);

// Function to create a transaction
export async function createTransaction(transaction: TransactionRequest) {
  try {
    // Start a transaction to ensure atomicity
    await db.transaction(async (tx) => {
      // Check if the account exists
      const [account] = await tx.select().from(accounts).where(eq(accounts.account_id, transaction.account_id)).limit(1);

      if (account) {
        // Update the account balance if the account exists
        await tx.update(accounts).set({
          balance: account.balance + transaction.amount,
        }).where(eq(accounts.account_id, transaction.account_id));
      } else {
        // Create the account if it does not exist
        await tx.insert(accounts).values({
          account_id: transaction.account_id,
          balance: transaction.amount, // Initialize balance to the transaction amount
        });
      }

      // Create the transaction
      await tx.insert(transactions).values({
        transaction_id: transaction.transaction_id,
        account_id: transaction.account_id,
        amount: transaction.amount,
        created_at: new Date(), // Automatically set the current timestamp
      });
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
}


// Function to get all transactions
export async function getAllTransactions() {
  return await db.select()
    .from(transactions)
    .orderBy(desc(transactions.created_at)) // Use desc to order by created_at in descending order
    .limit(3);
}

// Function to get a transaction by ID
export async function getTransactionById(transaction_id: string) {
  const result = await db.select()
    .from(transactions)
    .where(eq(transactions.transaction_id, transaction_id)) // Corrected equality check
    .limit(1);

  // Return the first result if available
  return result.length > 0 ? result[0] : null;
}

// Function to get account data by ID
export async function getAccountById(account_id: string) {
  try {
    const result = await db.select()
      .from(accounts)
      .where(eq(accounts.account_id, account_id))
      .limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error in getAccountById:', error);
    throw error;
  }
}


// For testing purposes, you might add this function temporarily in dbService.ts

export async function testDbConnection() {
  try {
    const result = await db.select().from(accounts).limit(1);
    console.log('Database connection test result:', result);
    return result;
  } catch (error) {
    console.error('Database connection test error:', error);
    throw error;
  }
}
