<template>
  <div class="main-container">
    <h1>Transaction Dashboard</h1>
    <div class="content-wrapper">
      <TransactionForm />
      <TransactionHistory />
    </div>
  </div>
</template>

<script setup>
import TransactionForm from './components/TransactionForm.vue';
import TransactionHistory from './components/TransactionHistory.vue';
</script>

<style scoped>
/* Adding a stylish gradient background */
body {
  margin: 0;
  font-family: 'Helvetica', sans-serif;
  background: linear-gradient(135deg, #8ec5fc, #e0c3fc); /* Gradient background */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Main container styling */
.main-container {
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8); /* Slightly transparent background */
  border-radius: 12px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  max-width: 900px;
  width: 100%;
}

/* Heading styling */
h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
}

/* Wrapping the form and history side by side */
.content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

/* Add padding and shadow to components */
.transaction-form,
.transaction-history {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  flex-basis: 48%; /* Ensure both take up similar width */
}

/* Transaction form adjustments */
.transaction-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

/* Adding hover animation */
.transaction-item:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

/* Customizing the scroll bar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

/* More readable amounts with conditional coloring */
.amount-positive {
  color: #4caf50;
  font-weight: bold;
}

.amount-negative {
  color: #f44336;
  font-weight: bold;
}
</style>
