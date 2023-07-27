<template>
  <div id="components-table-demo-size">
    <a-table :columns="columns" :data-source="iforms" :pagination='{pageSize:16}' size="small" />
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
  {title: '转换日期',dataIndex: 'day',},{title: '余分',dataIndex: 'surplus',},
  {title: '等级评定',dataIndex: 'rank',},{title: '结果适用',dataIndex: 'result',}];
    const iforms = props.forms;
return{
    columns,
    iforms,
}
},
})
</script>