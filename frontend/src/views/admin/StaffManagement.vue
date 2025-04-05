<template>
  <div class="container mt-5">
    <h1 class="mb-4">Staff Management</h1>

    <div class="row">
      <!-- View Staff Records -->
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">View Staff Records</h5>
            <p class="card-text text-break">
              View and filter all staff records.
            </p>
            <router-link
              to="/admin/staff-management/view"
              class="stretched-link"
            ></router-link>
            <!-- TODO: ここに後でリンク or コンポーネントを追加 -->
          </div>
        </div>
      </div>

      <!-- Add Staff Records -->
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">Add Staff Records</h5>
            <p class="card-text text-break">Add new staff to the records.</p>
            <router-link
              to="/admin/staff-management/add"
              class="stretched-link"
            ></router-link>
          </div>
        </div>
      </div>

      <!-- Edit Staff Records -->
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">Edit Staff Records</h5>
            <p class="card-text text-break">Edit existing records.</p>
            <router-link
              to="/admin/staff-management/edit"
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
