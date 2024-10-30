<template>
  <div class="gvb_logo">
    <img src="/image/logo.png" alt="booke">
    <div class="logo_head">
      <div>博书</div>
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
  transition: all .3s;



  img {
    width: 60px;
    height: 60px;
    border-radius: 15px;
    transition: all .3s;

  }

  .logo_head {
    margin-left: 20px;
    transition: all .3s;
    transform: scale(1);
    transform-origin: left;


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

.collapsed{
  .gvb_logo{
    padding: 2px;
    img{
      width: 40px;
      height: 40px;
    }
    .logo_head{
      transform: scale(0);
    }
  }
}
</style>