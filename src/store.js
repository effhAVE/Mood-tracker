import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    moodsChartList: []
  },

  mutations: {
    addMood (state, mood) {
      state.moodsChartList.push(mood);
    },
    setMoodsList (state, array) {
      state.moodsChartList = array;
    }
  },

  actions: {
    getStoredMoods ({ commit }) {
      const storedMoods = JSON.parse(localStorage.getItem("moodsChartList"));
      if (storedMoods) {
        commit("setMoodsList", storedMoods);
      } else {
        localStorage.setItem("moodsChartList", []);
      }
    },
    addMood ({ state, commit }, mood) {
      commit("addMood", mood);
      localStorage.setItem("moodsChartList", JSON.stringify(state.moodsChartList));
    }
  }
});

export default store;
