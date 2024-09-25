
<template>
  <div class="form-container">
    <h2>Submit New Transaction</h2>
    <form @submit.prevent="submitTransaction">
      <label for="account-id">Account ID:</label>
      <input
        id="account-id"
        type="text"
        v-model="accountId"
        placeholder="Enter Account ID"
        required
      />
      <label for="amount">Amount:</label>
      <input
        id="amount"
        type="number"
        v-model="amount"
        placeholder="Enter Amount"
        required
      />
      <button type="submit" class="submit-button">Submit</button>
    </form>
    <Toast v-if="toastMessage" :message="toastMessage.message" :type="toastMessage.type" />
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import axios from 'axios';
import Toast from './Toast.vue'; // Import the Toast component

const emit = defineEmits(['transaction-status']);
const accountId = ref('');
const amount = ref(0);
const toastMessage = ref(null);

const handleSubmit = async () => {
  // Assuming this is where you handle the transaction
  try {
    // On success
    emit('transaction-status', 'Transaction successful!', 'success');
  } catch (error) {
    // On error
    emit('transaction-status', 'Transaction failed!', 'error');
  }
};

const submitTransaction = async () => {
  try {
    console.log('Submitting transaction with:', {
      account_id: accountId.value,
      amount: amount.value
    });
    const response = await axios.post('/api/transactions', {
      account_id: accountId.value,
      amount: amount.value,
    });
    console.log('Response:', response.data);
    toastMessage.value = { message: 'Transaction submitted successfully!', type: 'success' };
    accountId.value = '';
    amount.value = 0;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      toastMessage.value = { message: 'Failed to submit transaction. Please try again.', type: 'error' };
    } else {
      console.error('Unknown error:', error);
    }
  }
};

</script>

<style scoped>
/* Background gradient */
body {
  background: linear-gradient(135deg, #f0f4f8, #cfd9df);
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Container for the form */
.form-container {
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  margin: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.form-container:hover {
  transform: translateY(-5px);
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.2);
}

/* Form and input styling */
form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

input {
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #4caf50;
  outline: none;
}

/* Submit button */
.submit-button {
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(90deg, #4caf50, #66bb6a);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-button:hover {
  background: linear-gradient(90deg, #388e3c, #43a047);
}

/* Hide arrows in number input fields */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none; /* Chrome, Safari, Edge */
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
  appearance: textfield; /* Standard property */
}

/* Responsiveness */
@media (max-width: 600px) {
  .form-container {
    padding: 20px;
    margin: 10px;
  }
}
</style>
