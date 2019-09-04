<template>
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Selected</th>
        <th>Timestamp</th>
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
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.table-image {
  max-width: 64px;
}

.table td,
.table th {
  vertical-align: middle;
}
</style>


