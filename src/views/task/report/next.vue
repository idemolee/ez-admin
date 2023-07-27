<template>
  <BasicTable
      :title="title"
      :columns="columns"
      :dataSource="data"
      size="small"
    >
    <template #footer v-if="sum">本周期累计：{{sum+600}}</template>
    <template #toolbar>
        <a-button @click=""> 导出 </a-button>
      </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent, onBeforeMount, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { BasicTable } from '/@/components/Table';
  import { formColumns } from './data';
  export default defineComponent({
    components: { BasicTable },
    setup(){
      const router = useRouter();
      const data = ref();
      const columns = ref();
      const sum = ref(0);
      const title = ref();

      onBeforeMount(()=>{
        axios.post('/basic-api/next',{values:router.currentRoute.value.query})
        .then(response => {
          if(response.data.surplus){
            columns.value = formColumns[9];
            data.value = response.data.praise;
            sum.value = parseFloat(response.data.surplus);
            title.value = response.data.name;
          }else{
            columns.value = formColumns[8];
            data.value = response.data.details;
            title.value = response.data.name;
          }
        });
      });

      return {
        data,
        columns,
        sum,
        title,

      }
    },
  });
</script>
