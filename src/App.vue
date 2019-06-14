<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/chart">Chart</router-link>
      |
      <router-link to="/list">List</router-link>
    </div>
    <router-view :moodsChartList="moodsChartList" />
  </div>
</template>

<script>
import eventBus from "./eventBus";

export default {
  data() {
    return {
      moodsChartList: []
    };
  },

  mounted() {
    eventBus.$on("moodAdded", el => {
      this.moodsChartList.push(el);
    });
  }
};
</script>


<style lang="scss">
html,
body {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
#nav {
  padding: 30px;
  flex-shrink: 0;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
