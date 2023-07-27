<template>
  <div id="components-table-demo-size">
    <a-table :columns="columns" :data-source="iforms" :pagination='{pageSize:18}' size="small" />
  </div>
</template>

<style>
#components-table-demo-size{
  margin-top: 16px;
}
</style>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
props:['forms'],
setup(props,context){
    const columns = [
  {title: '监区',dataIndex: 'area',},{title: '编号',dataIndex: 'num',},{title: '姓名',dataIndex: 'name',},
  {title: '加分事由',dataIndex: 'tips',},{title: '互监组专项加分',dataIndex: 'score',}];
    const iforms = props.forms;
return{
    columns,
    iforms,
}
},
})
</script>