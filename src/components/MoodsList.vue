<template>
  <div class="columns">
    <div class="column" v-for="(mood, index) in moods" :key="index">
      <figure class="image is-128x128">
        <img
          class="mood-icon"
          :src="mood.img"
          :value="mood.value"
          :alt="mood.type"
          @click="onMoodSelected(mood)"
        />
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moods: [
        {
          type: "Happy",
          img: `${process.env.BASE_URL}img/happy.png`,
          value: 5
        },
        {
          type: "Smile",
          img: `${process.env.BASE_URL}img/smile.png`,
          value: 4
        },
        {
          type: "Neutral",
          img: `${process.env.BASE_URL}img/neutral.png`,
          value: 3
        },
        {
          type: "Sad",
          img: `${process.env.BASE_URL}img/sad.png`,
          value: 2
        },
        {
          type: "Cry",
          img: `${process.env.BASE_URL}img/cry.png`,
          value: 1
        }
      ]
    };
  },

  methods: {
    onMoodSelected(moodType) {
      const moodData = {
        y: moodType.value,
        x: new Date(),
        img: moodType.img
      };

      this.$store.dispatch("addMood", moodData);
      this.$router.push("chart");
    }
  }
};
</script>

<style lang="scss" scoped>
.image {
  margin: 0 auto;
  cursor: pointer;
  filter: grayscale(90%);
  transition: filter 0.3s;
  &:hover {
    filter: grayscale(0);
  }
}
</style>