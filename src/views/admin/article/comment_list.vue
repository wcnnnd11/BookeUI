<template>
  <div class="maintenance-page">
    <div class="content">
      <img src="E:\NewIT\gvb_study\gvb_web_ts\public\image\头像.png" alt="页面建设中" class="image" style="border-radius: 5px" />
      <h1>页面建设中</h1>
      <p>正在努力开发中o((>ω< ))o</p>
      <a-button type="primary" @click="goBack">返回首页</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MaintenancePage",
  methods: {
    goBack() {
      this.$router.push("/admin"); // 跳转到 admin/index.vue 页面
    },
  },
};
</script>

<style scoped>
.maintenance-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f5f5f5;
}

.content {
  max-width: 600px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.image {
  width: 200px;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}
</style>
