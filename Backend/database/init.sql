-- Create the accounts table first
CREATE TABLE accounts (
  account_id UUID PRIMARY KEY,  -- UUID provided by the user for each account
  balance INT DEFAULT 0 NOT NULL -- Current account balance, updated with each transaction
);

-- Create the transactions table
CREATE TABLE transactions (
  transaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- Auto-generated UUID for each transaction
  account_id UUID REFERENCES accounts(account_id),  -- UUID references the account_id in the accounts table
  amount INT NOT NULL,  -- Transaction amount
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of when the transaction was made
);
