import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);
Vue.use(require('vue-moment'));

const store = new Vuex.Store({
  state: {
    moodsList: [],
    moodsAverages: []
  },

  mutations: {
    addMood (state, mood) {
      state.moodsList.push(mood);
    },
    addAverage (state, avg) {
      state.moodsAverages.push(avg);
    },
    setMoodsLists (state, arrays) {
      state.moodsAverages = JSON.parse(arrays.avg);
      state.moodsList = JSON.parse(arrays.all);
    }
  },

  getters: {
    todaysMoods: state => state.moodsList.filter(moodObj => Vue.moment(moodObj.x).isSame(Vue.moment(), "day")),
    dailyAverage: (state, getters) => {
      const todaysMoods = getters.todaysMoods;
      return todaysMoods.reduce((total, current) => total += current.y, 0) / (todaysMoods.length || 1);
    }
  },

  actions: {
    getStoredMoods ({ commit }) {
      const storedMoodsAvg = localStorage.getItem("moodsChartList");
      const storedMoodsAll = localStorage.getItem("moodsAll");
      if (storedMoodsAvg && storedMoodsAll) {
        commit("setMoodsLists", { avg: storedMoodsAvg, all: storedMoodsAll });
      } else {
        localStorage.setItem("moodsChartList", []);
        localStorage.setItem("moodsAll", []);
      }
    },
    addMood ({ state, commit, getters }, mood) {
      commit("addMood", mood);
      const moodsAverages = state.moodsAverages;
      if (moodsAverages.length === 0) {
        commit("addAverage", { x: mood.x, y: mood.y });
      } else {
        const lastAverage = moodsAverages[moodsAverages.length - 1];
        if (Vue.moment(lastAverage.x).isSame(mood.x, "day")) {
          lastAverage.y = getters.dailyAverage;
        } else {
          commit("addAverage", { x: mood.x, y: mood.y });
        }
      }

      localStorage.setItem("moodsChartList", JSON.stringify(state.moodsAverages));
      localStorage.setItem("moodsAll", JSON.stringify(state.moodsList));
    }
  }
});

export default store;
