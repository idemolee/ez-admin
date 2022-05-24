<template>
  <a-button type="primary" @click="showDrawer">Open</a-button>
  <a-drawer
    :width="500"
    title="Basic Drawer"
    placement="right"
    :visible="visible"
    @close="onClose"
  >
    <template #extra>
      <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
      <a-button type="primary" @click="onClose">Submit</a-button>
    </template>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const placement = ref('left');
    const visible = ref(false);

    const showDrawer = () => {
      visible.value = true;
    };

    const onClose = () => {
      visible.value = false;
    };

    return {
      placement,
      visible,
      showDrawer,
      onClose,
    };
  },

});
</script>