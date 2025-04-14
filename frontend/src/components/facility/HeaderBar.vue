<template>
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
</template>

<script setup></script>

<style scoped>
header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  width: 80vw;
  max-width: none;
  margin: 0;
  padding: 0 20px;
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

.alert-count {
  background-color: var(--danger);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  position: absolute;
  top: -5px;
  right: -5px;
}

.notifications-btn {
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
}

.upcoming-section {
  margin-top: 2rem;
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}
</style>
