<template>
  <form class="card" @submit.prevent="submitHandler">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model.trim="title" />
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date" />
    </div>
    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model.trim="text"></textarea>
    </div>
    <button
      class="btn primary"
      :disabled="
        title.length < 2 ||
        title === '' ||
        date === '' ||
        text.length < 2 ||
        text === ''
      "
    >
      Создать
    </button>
  </form>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "new",
  setup() {
    const store = useStore();
    const router = useRouter();
    const title = ref("");
    const date = ref("");
    const text = ref("");
    const submitHandler = async () => {
      const payload = {
        id: Date.now(),
        title: title.value,
        date: date.value,
        text: text.value,
        status:
          new Date(date).toLocaleDateString() > new Date().toLocaleDateString()
            ? "active"
            : "cancelled",
      };
      await store.dispatch("createTask", payload);
      router.push("/");
    };

    return {
      submitHandler,
      title,
      date,
      text,
    };
  },
};
</script>
