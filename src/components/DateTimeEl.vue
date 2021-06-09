<template>
  <span>
    {{datetime.date}} {{datetime.time}}
  </span>
</template>
<script>
export default {
  name: 'DateTimeEl',
  computed: {
    datetime: function () {
      const datetime = new Date(this.value);
      const date = datetime.getDate() + '-' + datetime.getMonth() + '-' + datetime.getFullYear();
      const time = datetime.getHours() + ':' + datetime.getMinutes();
      return {date: date, time: time};
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>
