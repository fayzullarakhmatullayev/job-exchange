<template>
  <div class="card">
    <h2>{{ task.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
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
import AppStatus from "@/components/AppStatus";
import AppLoader from "@/components/AppLoader";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted } from "@vue/runtime-core";
export default {
  name: "task",
  components: { AppStatus, AppLoader },
  setup() {
    const { currentRoute } = useRouter();
    const key = currentRoute.value.params.id;
    const status = computed(() => store.getters["status"]);
    const task = computed(() => store.getters.task);

    const store = useStore();
    async function getStatus(status) {
      const payload = {
        ...task.value,
        key: key,
        status: status,
      };
      store.dispatch("changeStatus", payload);
    }
    onMounted(async () => {
      await store.dispatch("openTask", key);
    });

    return {
      task,
      status,
      getStatus,
    };
  },
};
</script>

<style scoped></style>
