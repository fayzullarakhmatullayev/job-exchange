import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    jobs: [],
    isEmpty: false,
    status: "",
  },
  mutations: {
    SET_STATUS(state, status) {
      localStorage.setItem("status", status);
      state.status = status;
    },
  },
  actions: {
    async getTasks({ state }) {
      try {
        const { data } = await axios(
          "https://vue-job-exchange-default-rtdb.europe-west1.firebasedatabase.app/task.json"
        );
        if (data === null) {
          state.isEmpty = true;
        } else {
          state.isEmpty = false;
          const res = Object.keys(data).map((key) => {
            return {
              key: key,
              ...data[key],
            };
          });
          state.jobs = res;
        }
      } catch (error) {
        console.warn(error.message);
      }
    },
    async createTask({ _ }, payload) {
      try {
        await axios.post(
          "https://vue-job-exchange-default-rtdb.europe-west1.firebasedatabase.app/task.json",
          payload
        );
      } catch (error) {
        console.warn(error.message);
      }
    },
    async changeStatus({ state, commit }, payload) {
      try {
        await axios.put(
          `https://vue-job-exchange-default-rtdb.europe-west1.firebasedatabase.app/task/${payload.key}.json`,
          payload
        );
        state.task = payload;
        commit("SET_STATUS", payload.status);
      } catch (error) {
        console.warn(error.message);
      }
    },
  },
  getters: {
    jobs(state) {
      if (state.jobs) {
        return state.jobs.sort((a, b) => {
          if (a.id > b.id) return -1;
          return 1;
        });
      }
    },
    activeCounter(state) {
      return state.jobs.filter((job) => job.status === "active").length;
    },
    status(state) {
      return state.status;
    },
  },
});
