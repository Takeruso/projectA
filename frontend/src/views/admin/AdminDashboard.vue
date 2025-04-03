<template>
  <div class="container mt-5">
    <h1 class="mb-4">Admin Dashboard</h1>

    <div class="row">
      <!-- Facility Management -->
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">Facility Management</h5>
            <p class="card-text text-break">
              部屋情報、インベントリ、予約管理など
            </p>
            <router-link
              to="/admin/facility"
              class="stretched-link"
            ></router-link>
            <!-- TODO: ここに後でリンク or コンポーネントを追加 -->
          </div>
        </div>
      </div>

      <!-- Service Management -->
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">Service Management</h5>
            <p class="card-text text-break">介護サービスの追加・更新</p>
            <router-link
              to="/admin/service"
              class="stretched-link"
            ></router-link>
          </div>
        </div>
      </div>

      <!-- Alerts & Notifications -->
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">Alerts & Notifications</h5>
            <p class="card-text text-break">
              設備エラーやサービス不足などのアラート通知
            </p>
            <router-link
              to="/admin/alerts"
              class="stretched-link"
            ></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// まだロジック不要。見た目だけ整える段階。
</script>

<style scoped>
.card {
  border-radius: 12px;
}
</style>
