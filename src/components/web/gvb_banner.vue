<template>
  <div class="web_show_first">
    <ul class="slider">
      <li
          v-for="(item, index) in container"
          :key="item.id"
          class="item"
          :style="{ backgroundImage: `url(${item.image})` }"
          :class="[getPositionClass(index), { active: index === 1 }]"
      >
        <div class="content">
          <h2 class="title">{{ item.title }}</h2>
          <p class="description">{{ item.description }}</p>
          <button>Read More</button>
        </div>
      </li>
    </ul>
    <div class="nav">
      <IconLeft class="btn prev" @click="prev"></IconLeft>
      <IconRight class="btn next" @click="next"></IconRight>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {IconLeft, IconRight} from "@arco-design/web-vue/es/icon";
import {onMounted, onUnmounted} from "vue";

// 首页的展示先写死，后期可能还要在添加一个接口
const container = ref([
  {
    id: 0,
    title: '"测试1"',
    description: '测试内容1',
    image: 'https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg',
  },
  {
    id: 1,
    title: '"测试2"',
    description:
        '测试内容2',
    image: 'https://i.redd.it/tc0aqpv92pn21.jpg',
  },
  {
    id: 2,
    title: '"测试3"',
    description:
        '测试内容3',
    image: 'https://wharferj.files.wordpress.com/2015/11/bio_north.jpg',
  },
  {
    id: 3,
    title: '"测试4"',
    description:
        '测试内容4',
    image: 'https://images7.alphacoders.com/878/878663.jpg',
  },
  {
    id: 4,
    title: '"测试5"',
    description:
        '测试内容5',
    image: 'https://theawesomer.com/photos/2017/07/simon_stalenhag_the_electric_state_6.jpg',
  },
  {
    id: 5,
    title: '"测试6"',
    description:
        '测试内容6',
    image: 'https://da.se/app/uploads/2015/09/simon-december1994.jpg',
  }
]);
const next = () => {
  const firstItem = container.value.shift();
  if (firstItem) container.value.push(firstItem);
};
const prev = () => {
  const lastItem = container.value.pop();
  if (lastItem) container.value.unshift(lastItem);
};
const getPositionClass = (index: number) => {
  return `pos-${index}`;
};
let timer: any = null;
onMounted(() => {
  // 每隔 5 秒切换到下一项
  timer = setInterval(() => {
    next();
  }, 5000);
});
onUnmounted(() => {
  // 清除定时器
  clearInterval(timer);
});

</script>

<style lang="scss">
@keyframes show {
  0% {
    filter: blur(5px);
    transform: translateY(calc(-50% + 75px));
  }
  100% {
    opacity: 1;
    filter: blur(0);
    transform: translateY(-50%);
  }
}

.web_show_first {
  overflow: hidden;
  display: grid;
  height: 700px;
  width: 100%;
  position: relative;

  .nav {
    display: flex;
    justify-content: space-between;
    position: relative;
    bottom: 2rem;
    left: 0;
    width: 100%;
    user-select: none;
    color: white;


    .btn {
      background: var(--color-text-2);
      border-radius: 50%;
      font-size: 1.5rem;
    }

    .prev {
      position: relative;
      margin-right: 10px;
    }
  }

  .slider {
    display: flex;

    .item {
      width: 200px;
      height: 300px;
      list-style-type: none;
      position: absolute;
      top: calc(40% + 60px);
      transform: translateY(-50%);
      background-position: center;
      background-size: cover;
      border-radius: 20px;
      box-shadow: 0 20px 30px rgba(255, 255, 255, 0.3) inset;
      transition: transform 0.1s, left 0.75s, top 0.75s, width 0.75s, height 0.75s;
      object-fit: cover;

      &.pos-0,
      &.pos-1 {
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transform: none;
        border-radius: 0;
        box-shadow: none;
        opacity: 1;
      }

      &.pos-2 {
        left: 60%;
      }

      &.pos-3 {
        left: calc(60% + 220px);
      }

      &.pos-4 {
        left: calc(60% + 440px);
      }

      &.pos-5 {
        opacity: 0;
        left: calc(60% + 660px);
      }


      .content {
        justify-content: center;
        width: min(30vw, 400px);
        position: relative;
        top: 50%;
        margin-left: 3rem;
        font: 400 0.85rem helvetica, sans-serif;
        color: white;
        text-shadow: 0 3px 8px rgba(0, 0, 0, 0.5);
        display: none;
        opacity: 0;
        filter: blur(5px);
        transform: translateY(calc(-50% + 75px));
        transition: opacity 0.75s ease-in-out, filter 0.75s ease-in-out, transform 0.75s ease-in-out;

        .title {
          font-family: 幼圆;
          text-transform: uppercase; // 所有的字母转换成大写
          font-size: 1.2rem;
        }

        .description {
          line-height: 1.7;
          margin: 1rem 0 1.5rem;
          font-size: 0.9rem;
        }

        button {
          width: fit-content;
          background-color: rgba(0, 0, 0, 0.1);
          color: white;
          border: 2px solid white;
          border-radius: 0.25rem;
          padding: 0.75rem;
          cursor: pointer;
        }

      }

      &.active .content {
        opacity: 1;
        filter: blur(0);
        transform: translateY(-50%);
      }
    }

    //文字部分的动画
    .item:nth-of-type(2) .content {
      display: block;
      animation: show 0.75s ease-in-out 0.3s forwards;
    }
  }

}

@media (width > 650px) and (width < 900px) {
  .content {
    & .title {
      font-size: 1rem;
    }

    & .description {
      font-size: 0.7rem;
    }

    & button {
      font-size: 0.7rem;
    }
  }

  .item {
    width: 160px;
    height: 270px;

    &:nth-child(3) {
      left: 50%;
    }

    &:nth-child(4) {
      left: calc(50% + 170px);
    }

    &:nth-child(5) {
      left: calc(50% + 340px);
    }

    &:nth-child(6) {
      left: calc(50% + 510px);
      opacity: 0;
    }
  }
}

@media (width < 650px) {
  .content {
    & .title {
      font-size: 0.9rem;
    }

    & .description {
      font-size: 0.65rem;
    }

    & button {
      font-size: 0.7rem;
    }
  }

  .item {
    width: 130px;
    height: 220px;

    &:nth-child(3) {
      left: 50%;
    }

    &:nth-child(4) {
      left: calc(50% + 140px);
    }

    &:nth-child(5) {
      left: calc(50% + 280px);
    }

    &:nth-child(6) {
      left: calc(50% + 420px);
      opacity: 0;
    }
  }
}
</style>