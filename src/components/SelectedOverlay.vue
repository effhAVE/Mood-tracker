<template>
  <div class="is-overlay">
    <button class="delete is-large" @click="toggle"></button>
    <div class="hero is-fullheight">
      <div class="hero-body">
        <div class="container is-flex-column">
          <h3 class="title">Your choice has been saved</h3>
          <figure class="image is-128x128">
            <img :src="mood.img" :alt="mood.type" />
          </figure>
          <div class="comment-container" v-if="!addComment">
            <h4 class="subtitle">Add comment?</h4>
            <div class="field is-grouped">
              <p class="control">
                <button
                  class="button is-large is-primary"
                  @click="addComment = true"
                >
                  Yes
                </button>
              </p>
              <p class="control">
                <button class="button is-large" @click="toggle">
                  No
                </button>
              </p>
            </div>
          </div>
          <div v-else>
            <div class="field">
              <div class="control">
                <textarea
                  class="textarea is-primary"
                  placeholder="e.g. Final exam"
                  v-model="comment"
                ></textarea>
              </div>
            </div>
            <div class="field">
              <button
                class="button is-large is-primary"
                @click="addMoodComment"
              >
                Save comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mood: this.$store.getters.lastSelected,
      addComment: false,
      comment: ""
    };
  },
  methods: {
    toggle() {
      this.$store.commit("toggleOverlay");
    },
    addMoodComment() {
      this.mood.comment = this.comment;
      this.toggle();
    }
  }
};
</script>
<style lang="scss" scoped>
.is-overlay {
  position: fixed;
  background: white;
  display: block;
  z-index: 99;
  .delete {
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .image {
    margin: 40px auto;
  }

  .field {
    margin: 40px 0;
    justify-content: center;
  }

  .textarea {
    max-height: 200px;
  }
}
</style>