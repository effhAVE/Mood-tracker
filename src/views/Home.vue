<template>
  <div class="container is-flex-column">
    <h1 class="title">Hello! How are you?</h1>
    <MoodsList />
    <p class="subtitle is-hidden-mobile">
      The application helps you track your state of being. Just simply select
      the mood icon you can relate with. Don't overthink it. Just feel. <br />
      It was inspired by
      <a
        href="https://play.google.com/store/apps/details?id=dk.howareyou.aps&hl=en"
        target="_blank"
        >this awesome mobile app</a
      >.
    </p>
  </div>
</template>

<script>
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
  padding-bottom: 3em;
  flex-grow: 5;
}

@media (max-width: 768px) {
  .container {
    padding: 0;
    display: block;
  }

  .moods-columns {
    display: flex;
    @media (max-width: 480px) {
      display: block;
    }
  }
}
</style>

