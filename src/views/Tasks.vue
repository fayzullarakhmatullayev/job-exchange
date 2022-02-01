<template>
  <app-loader v-if="!$store.state.isEmpty && !jobs.length"></app-loader>

  <h1 class="text-white center" v-else-if="$store.state.isEmpty">
    Задач пока нет
  </h1>

  <div v-else>
    <h3 class="text-white">Всего активных задач: {{ statusLength }}</h3>

    <div class="card" v-for="task in jobs" :key="task.id">
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{ task.date }}
          </small>
        </strong>
      </p>
      <div class="wrapper">
        <button class="btn primary" @click="openTask(task.id, task)">
          Посмотреть
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import AppStatus from "../components/AppStatus";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import AppLoader from "../components/AppLoader.vue";

export default {
  components: { AppStatus, AppLoader },
  setup() {
    const store = useStore();
    const router = useRouter();
    onMounted(async () => {
      await store.dispatch("getTasks");
    });

    const jobs = computed(() => store.getters["jobs"]);
    const openTask = async (id, task) => {
      router.push(`/task/${id}`);
      localStorage.setItem("task", JSON.stringify(task));
    };
    const statusLength = computed(() => store.getters["activeCounter"]);
    return {
      jobs,
      openTask,
      statusLength,
    };
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
