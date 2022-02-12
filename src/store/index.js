import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    jobs: [],
    isEmpty: false,
    task: [],
    status: "",
  },
  mutations: {
    UPDATE_JOBS(state, payload) {
      state.jobs = payload;
    },
    SET_JOBS(state, jobs) {
      const newJobs = Object.keys(jobs).map((key) => {
        return {
          key: key,
          ...jobs[key],
        };
      });
      state.jobs = newJobs;
    },
    SET_TASK(state, task) {
      state.task = task;
    },
  },
  actions: {
    async getTasks({ state, commit }) {
      await axios(
        "https://vue-job-exchange-default-rtdb.europe-west1.firebasedatabase.app/task.json"
      )
        .then((res) => {
          commit("SET_JOBS", res.data);
        })
        .catch((e) => {
          console.warn(e);
        });
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
      console.log(payload);
      try {
        await axios
          .put(
            `https://vue-job-exchange-default-rtdb.europe-west1.firebasedatabase.app/task/${payload.key}.json`,
            payload
          )
          .then((res) => {
            commit("SET_TASK", res.data);
          });
      } catch (error) {
        console.warn(error.message);
      }
    },
    async openTask({ commit }, key) {
      await axios
        .get(
          `https://vue-job-exchange-default-rtdb.europe-west1.firebasedatabase.app/task/${key}.json`
        )
        .then((res) => {
          commit("SET_TASK", res.data);
        })
        .catch((e) => console.warn(e));
    },
  },
  getters: {
    jobs(state) {
      return state.jobs;
    },
    activeCounter(state) {
      return state.jobs.filter((job) => job.status === "active").length;
    },
    status(state) {
      return state.status;
    },
    task(state) {
      return state.task;
    },
  },
});
