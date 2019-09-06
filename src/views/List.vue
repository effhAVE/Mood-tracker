<template>
  <div class="table-container">
    <table class="table is-fullwidth is-scrollable">
      <thead>
        <tr>
          <th>#</th>
          <th>Selected</th>
          <th>Timestamp</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(entry, index) in $store.state.moodsList.slice().reverse()"
          :key="index"
        >
          <th>{{ index }}</th>
          <td><img class="table-image" :src="entry.img" /></td>
          <td>{{ entry.timestamp | moment("from") }}</td>
          <td>{{ entry.comment }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.table-container {
  overflow: auto;
}

.table-image {
  max-width: 64px;
}

.table td,
.table th {
  vertical-align: middle;
}
</style>


