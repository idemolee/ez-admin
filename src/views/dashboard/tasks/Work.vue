<template>
<div>
<p v-for="j in aList">this is {{ j }}</p>
<works v-for="i in aList" :data="i"></works>
</div>
</template>
<script>
import works from './Hello.vue';
import {defineComponent,ref} from 'vue';
export default defineComponent({
  components:{
    works,
  },
  setup(){
    const aList = ['a','b'];
    let i = ref();
    return {
      aList,
      i,
    };
  },
})
</script>
