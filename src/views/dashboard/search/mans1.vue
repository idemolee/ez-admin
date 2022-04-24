<template>
<div class="man-bg">
  <a-descriptions title="简介" bordered>
    <a-descriptions-item label="姓名">{{ iforms.name }}</a-descriptions-item>
    <a-descriptions-item label="编号">{{ iforms.num }}</a-descriptions-item>
    <a-descriptions-item label="出生日期">{{ iforms.birth }}</a-descriptions-item>
    <a-descriptions-item label="罪名">{{ iforms.crime }}</a-descriptions-item>
    <a-descriptions-item label="刑期">{{ iforms.lasts }}</a-descriptions-item>
    <a-descriptions-item label="状态">
      <a-badge status="processing" text="正常" />
    </a-descriptions-item>
    <a-descriptions-item label="起止">{{ iforms.start }}-{{ iforms.end }}</a-descriptions-item>
    <a-descriptions-item label="余刑">{{ iforms.left }}</a-descriptions-item>
    <a-descriptions-item label="从严">{{ iforms.level }}</a-descriptions-item>
    <a-descriptions-item label="住址" :span="3">{{ iforms.area }}</a-descriptions-item>
    <a-descriptions-item label="详情">{{ iforms.details }}</a-descriptions-item>
  </a-descriptions>
</div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
props:['formdata'],
setup(props,context){
    const iforms = props.formdata;
return{
    iforms,
}
},
})
</script>
<style scoped>
.man-bg{
  margin: 15px 20px;
  background:white;
}
</style>