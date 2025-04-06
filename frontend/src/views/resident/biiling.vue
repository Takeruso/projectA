<template>
  <div>
    <header>
      <div class="container header-container">
        <div class="logo">
          <span>Swin Care</span>
        </div>
        <div class="user-info">
          <button class="notifications-btn">
            📋
            <span class="alert-count">3</span>
          </button>
          <div class="user-name">Martha Johnson</div>
          <div class="user-avatar">MJ</div>
        </div>
      </div>
    </header>

    <main class="container">
      <div class="billing-section">
        <h1>Billing & Payments</h1>
        <p>Here you can view your current bills, payment history, and make new payments securely.</p>
        <div class="dashboard-grid">
          <div class="card card-view-bills">
            <div class="card-icon">📜</div>
            <h2>View Bills</h2>
            <p>Check your outstanding bills and payment history in detail.</p>
            <button class="cta" @click="showModal('viewBillsModal')">View Bills</button>
          </div>
          <div class="card card-make-payment">
            <div class="card-icon">💳</div>
            <h2>Make Payment</h2>
            <p>Securely make payments for any pending bills using our online payment system.</p>
            <button class="cta" @click="showModal('makePaymentModal')">Make Payment</button>
          </div>
          <div class="card card-billing-history">
            <div class="card-icon">📈</div>
            <h2>Billing History</h2>
            <p>View your complete billing history and download statements if needed.</p>
            <button class="cta" @click="showModal('billingHistoryModal')">View History</button>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <div class="container footer-container">
        <div class="copyright">© 2025 Swin Care. All rights reserved.</div>
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Contact Us</a>
          <a href="#">Feedback</a>
        </div>
      </div>
    </footer>

    <!-- Modals for Viewing Bills, Making Payments, and Viewing Billing History -->
    <div id="viewBillsModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal('viewBillsModal')">&times;</span>
        <h2>View Bills</h2>
        <ul id="billsList">
          <li v-for="(bill, index) in bills" :key="index" class="bill-item">
            Bill #{{ bill.id }} - ${{ bill.amount }} - Due: {{ bill.dueDate }}
          </li>
        </ul>
      </div>
    </div>

    <div id="makePaymentModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal('makePaymentModal')">&times;</span>
        <h2>Make Payment</h2>
        <form id="paymentForm" @submit.prevent="makePayment">
          <label for="bill">Select Bill to Pay:</label>
          <select id="bill" v-model="selectedBill" required>
            <option v-for="(bill, index) in bills" :key="index" :value="index">
              Bill #{{ bill.id }} - ${{ bill.amount }} - Due: {{ bill.dueDate }}
            </option>
          </select>
          <label for="cardNumber">Card Number:</label>
          <input type="text" id="cardNumber" v-model="paymentDetails.cardNumber" required>
          <label for="expiry">Expiry Date:</label>
          <input type="month" id="expiry" v-model="paymentDetails.expiry" required>
          <label for="cvv">CVV:</label>
          <input type="text" id="cvv" v-model="paymentDetails.cvv" required>
          <button type="submit">Pay</button>
        </form>
      </div>
    </div>

    <div id="billingHistoryModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal('billingHistoryModal')">&times;</span>
        <h2>Billing History</h2>
        <ul id="billingHistoryList">
          <li v-for="(payment, index) in payments" :key="index" class="payment-item">
            Bill #{{ payment.bill.id }} - ${{ payment.bill.amount }} - Paid with card ending in {{ payment.cardNumber.slice(-4) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --primary: #ff2474;
  --primary-light: #ff5d98;
  --secondary: #F4B942;
  --dark: #2A3950;
  --light: #F9F9F9;
  --danger: #D64045;
  --success: #4CAF50;
  --gray: #E5E9F0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: var(--light);
  color: var(--dark);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--gray);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: var(--dark);
}

main {
  padding: 2rem 0;
}

.billing-section {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.billing-section h1 {
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: var (--dark);
}

.billing-section p {
  color: #666;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.card {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.1);
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 2rem;
  color: white;
}

.card-view-bills .card-icon {
  background-color: var(--primary);
}

.card-make-payment .card-icon {
  background-color: var(--secondary);
}

.card-billing-history .card-icon {
  background-color: var(--success);
}

.card h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--dark);
}

.card p {
  color: #666;
  margin-bottom: 1rem;
  font-size: 1rem;
  flex-grow: 1;
}

.card .cta {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-light);
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  text-align: center;
  margin-top: auto;
  border: none;
}

.card .cta:hover {
  background-color: var(--primary);
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

form label {
  display: block;
  margin-top: 10px;
}

form input, form select, form button {
  display: block;
  width: 100%;
  margin-top: 5px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
}

form button {
  background-color: var(--primary-light);
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

form button:hover {
  background-color: var(--primary);
}

.notification {
  display: none;
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 2rem;
  background-color: var(--success);
  color: white;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: opacity 0.3s ease;
}

.notification.danger {
  background-color: var(--danger);
}

.notification.success {
  background-color: var(--success);
}

.bill-item, .payment-item {
  background-color: var(--light);
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.bill-item h3, .payment-item h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: var(--dark);
}

.bill-item p, .payment-item p {
  color: #666;
}
</style>

<script>
export default {
  data() {
    return {
      bills: [
        { id: 123, amount: 200, dueDate: '2025-04-15' },
        { id: 124, amount: 150, dueDate: '2025-04-20' }
      ],
      payments: [],
      selectedBill: null,
      paymentDetails: {
        cardNumber: '',
        expiry: '',
        cvv: ''
      },
      notificationMessage: '',
      notificationType: ''
    };
  },
  methods: {
    showModal(modalId) {
      document.getElementById(modalId).style.display = "block";
      if (modalId === 'viewBillsModal') {
        this.updateBillsList();
      } else if (modalId === 'makePaymentModal') {
        this.updateBillsOptions();
      } else if (modalId === 'billingHistoryModal') {
        this.updateBillingHistory();
      }
    },
    closeModal(modalId) {
      document.getElementById(modalId).style.display = "none";
    },
    makePayment() {
      const bill = this.bills[this.selectedBill];
      this.payments.push({ ...this.paymentDetails, bill });
      alert('Payment made successfully!');
      this.closeModal('makePaymentModal');
      this.updateBillsList();
      this.updateBillingHistory();
    },
    updateBillsList() {
      // This method updates the bills list
    },
    updateBillsOptions() {
      // This method updates the bills options
    },
    updateBillingHistory() {
      // This method updates the billing history
    }
  }
};
</script>
