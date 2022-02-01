<template>
  <div class="card">
    <h2>{{ task.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="status" /></p>
    <p><strong>Дэдлайн</strong>: {{ task.date }}</p>
    <p><strong>Описание</strong>: {{ task.text }}</p>
    <div>
      <button class="btn" @click="getStatus('pending')">Взять в работу</button>
      <button class="btn primary" @click="getStatus('done')">Завершить</button>
      <button class="btn danger" @click="getStatus('cancelled')">
        Отменить
      </button>
    </div>
  </div>
</template>

<script>
import AppStatus from "../components/AppStatus";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  components: { AppStatus },
  setup() {
    const { currentRoute } = useRouter();
    const id = currentRoute.value.params.id;

    const store = useStore();
    async function getStatus(status) {
      const payload = {
        ...JSON.parse(localStorage.getItem("task")),
        status: status,
      };
      await store.dispatch("changeStatus", payload);
    }
    const status = computed(() => store.getters["status"]);
    return {
      id,
      task: JSON.parse(localStorage.getItem("task")),
      status,
      getStatus,
    };
  },
};
</script>

<style scoped></style>
