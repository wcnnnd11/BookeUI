<template>
  <div class="gvb_logo">
    <img src="/image/logo.png" alt="booke">
    <div class="logo_head">
      <div>书识</div>
      <div>Booke</div>
    </div>
  </div>
</template>

<style  scoped lang="scss">
.gvb_logo {
  border-bottom: 1px solid var(--bg);
  height: 90px;
  display: flex;
  padding: 20px;
  align-items: center;

  img {
    width: 60px;
    height: 60px;
    border-radius: 15px;
  }

  .logo_head {
    margin-left: 20px;

    > div:nth-child(1) {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 2px;
    }
  }

  > div:nth-child(2) {
    font-size: 15px;
  }
}
</style>