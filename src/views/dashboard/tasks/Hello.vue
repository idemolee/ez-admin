<template>
<a-row>
  <a-col v-for="i in testTable">{{i}}</a-col>
</a-row>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  props:['forms'],
  setup(props,context) {
    const testTable = props.forms;
    return {
      testTable,
    };
  },
});
</script>