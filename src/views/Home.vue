<template>
  <div class="container is-flex-column">
    <h1 class="title">Hello! How are you?</h1>
    <MoodsList @moodAdded="" />
    <p class="subtitle">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa alias
      quidem nam. Ipsam repellat quis exercitationem tempora, magnam eum sequi
      ut, ad veritatis velit consectetur aliquam dicta obcaecati? Voluptatum,
      asperiores.
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import MoodsList from "@/components/MoodsList.vue";

export default {
  name: "home",
  components: {
    MoodsList
  }
};
</script>

<style lang="scss">
.is-flex-column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.container {
  padding: 3em 0;
  flex-grow: 5;
}
</style>

