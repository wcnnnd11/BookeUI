<template>
  <div class="calendar">
    <div class="calendar-header">
      <span>{{ currentMonthName }} {{ currentYear }}</span>
    </div>
    <div class="calendar-grid">
      <div v-for="day in daysOfWeek" :key="day" class="calendar-day">
        {{ day }}
      </div>
      <div
          v-for="date in dates"
          :key="date.toDateString()"
          :class="['calendar-date', { 'current-date': isToday(date) }]"
      >
        {{ date.getDate() }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns";
import { zhCN } from "date-fns/locale"; // 使用中文语言包

export default defineComponent({
  name: "Calendar",
  setup() {
    // 设置当前日期为今天的日期
    const currentDate = ref(new Date());

    // 星期的显示名称
    const daysOfWeek = ["日", "一", "二", "三", "四", "五", "六"];

    // 使用中文月份名称
    const currentMonthName = computed(() => {
      // 确保 currentDate 有值
      return currentDate.value ? format(currentDate.value, "MMMM", { locale: zhCN }) : "";
    });

    const currentYear = computed(() => {
      return currentDate.value ? format(currentDate.value, "yyyy") : "";
    });

    // 计算当前月份的所有日期，包含前后空白的补齐日期
    const dates = computed(() => {
      if (!currentDate.value) return [];
      const start = startOfWeek(startOfMonth(currentDate.value));
      const end = endOfWeek(endOfMonth(currentDate.value));
      return eachDayOfInterval({ start, end });
    });

    // 检查是否为今天
    const isToday = (date: Date) => {
      return isSameDay(date, new Date());
    };

    return {
      currentMonthName,
      currentYear,
      daysOfWeek,
      dates,
      isToday,
    };
  },
});
</script>

<style scoped lang="scss">
.calendar {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: "幼圆";

  .calendar-header {
    display: flex;
    justify-content: center; /* 居中对齐 */
    width: 100%;
    margin-top: 15px;
    margin-bottom: 18px;
    font-weight: bold;
    font-size: 30px;
    color: #4e0057;
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 3px;

    .calendar-day,
    .calendar-date {
      text-align: center;
      font-weight: bolder;
      font-size: 20px;
      padding: 10px;
      margin-bottom: 5px;
      margin-right: 10px;
      //border: 1px solid #ddd;
      border-radius: 4px;
      color: var(--color-neutral-10);
    }
    .current-date {
      background-color: rgb(var(--arcoblue-5),0.5); /* 今天的日期背景色 */
      color: var(--color-neutral-4); /* 今天的日期字体颜色 */
      font-weight: bold;
      border-radius: 4px;

    }
  }
}
</style>
