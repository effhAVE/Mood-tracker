<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/chart">Chart</router-link>
      |
      <router-link to="/list">List</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getStoredMoods");
    /* this.$store.dispatch("addMood", {
      y: 3,
      x: this.$moment("2019-09-01"),
      timestamp: this.$moment("2019-09-01"),
      img: `${process.env.BASE_URL}img/neutral.png`
    });
    this.$store.dispatch("addMood", {
      y: 4,
      x: this.$moment("2019-09-02"),
      timestamp: this.$moment("2019-09-02"),
      img: `${process.env.BASE_URL}img/smile.png`
    }); */
  }
};
</script>


<style lang="scss">
html,
body {
  height: 100%;
}

html {
  overflow-y: auto !important;
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
