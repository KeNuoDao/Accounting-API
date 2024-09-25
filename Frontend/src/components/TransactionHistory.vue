<template>
  <div class="history-container">
    <h2>Transaction History</h2>
    <ul>
      <li v-for="transaction in transactions" :key="transaction.transaction_id" class="transaction-item">
        <div class="transaction-details">
          <p><strong>ID:</strong> {{ transaction.transaction_id }}</p>
          <p><strong>Account ID:</strong> {{ transaction.account_id }}</p>
          <p>
            <strong>Amount:</strong> 
            <span :class="{'amount-positive': transaction.amount > 0, 'amount-negative': transaction.amount < 0}">
              {{ formatAmount(transaction.amount) }}
            </span>
          </p>
          <p><strong>Date:</strong> {{ new Date(transaction.created_at).toLocaleString() }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const transactions = ref([]);

const fetchTransactions = async () => {
  try {
    const response = await axios.get('/api/transactions');
    transactions.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const formatAmount = (amount) => {
  return amount >= 0 ? `+${amount}` : `${amount}`;
};

onMounted(fetchTransactions);
</script>

<style scoped>
/* Main container for the transaction history */
.history-container {
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Transaction item styling */
.transaction-item {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.05);
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

/* Hover effect for transaction item */
.transaction-item:hover {
  transform: translateY(-5px);
  background: #f1f1f1;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.2);
}

/* Styling for the transaction details */
.transaction-details p {
  margin: 10px 0;
}

/* Positive amount styling */
.amount-positive {
  color: #4caf50;
  font-weight: bold;
}

/* Negative amount styling */
.amount-negative {
  color: #e53935;
  font-weight: bold;
}

/* Responsive design adjustments */
@media (max-width: 600px) {
  .history-container {
    padding: 20px;
    margin: 10px;
  }

  .transaction-item {
    padding: 10px;
  }

  .transaction-details p {
    margin: 5px 0;
  }
}
</style>
