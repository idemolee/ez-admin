<template>
<a-collapse v-model:activeKey="activeKey" style="margin:15px 10px">
<a-collapse-panel key="1" header="档卡">
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
    <a-descriptions-item label="起止">{{ iforms.start }}--{{ iforms.end }}</a-descriptions-item>
    <a-descriptions-item label="余刑">{{ iforms.left }}</a-descriptions-item>
    <a-descriptions-item label="从严">{{ iforms.level }}</a-descriptions-item>
    <a-descriptions-item label="住址" :span="3">{{ iforms.area }}</a-descriptions-item>
    <a-descriptions-item label="详情">{{ iforms.details }}</a-descriptions-item>
  </a-descriptions>
</div>
</a-collapse-panel>
<a-collapse-panel key="2" header="月考核">
  <div style="background-color:#fafafa; padding: 10px; margin:5px 20px">
    <a-row :gutter="16">
      <a-col :span="8" style="margin-bottom:10px">
      <a-badge-ribbon :text="aform[0].text" :color="aform[0].color">
        <a-card :title="aform[0].date" :hoverable="true" @click="showDrawer(aform[0].date)">
          <p>基础分：{{aform[0].base}}</p>
          <p>月总分：{{aform[0].total}}</p>
        </a-card>
      </a-badge-ribbon>
      </a-col>
      <a-col :span="8">
      <a-badge-ribbon :text="aform[1].text" :color="aform[1].color">
        <a-card :title="aform[1].date" :hoverable="true" @click="showDrawer(aform[1].date)">
          <p>基础分：{{aform[1].base}}</p>
          <p>月总分：{{aform[1].total}}</p>
        </a-card>
      </a-badge-ribbon>
      </a-col>
      <a-col :span="8">
      <a-badge-ribbon :text="aform[2].text" :color="aform[2].color">
        <a-card :title="aform[2].date" :hoverable="true" @click="showDrawer(aform[2].date)">
          <p>基础分：{{aform[2].base}}</p>
          <p>月总分：{{aform[2].total}}</p>
        </a-card>
      </a-badge-ribbon>
      </a-col>
      <a-col :span="8">
      <a-badge-ribbon :text="aform[3].text" :color="aform[3].color">
        <a-card :title="aform[3].date" :hoverable="true" @click="showDrawer(aform[3].date)">
          <p>基础分：{{aform[3].base}}</p>
          <p>月总分：{{aform[3].total}}</p>
        </a-card>
      </a-badge-ribbon>
      </a-col>
      <a-col :span="8">
      <a-badge-ribbon :text="aform[4].text" :color="aform[4].color">
        <a-card :title="aform[4].date" :hoverable="true" @click="showDrawer(aform[4].date)">
          <p>基础分：{{aform[4].base}}</p>
          <p>月总分：{{aform[4].total}}</p>
        </a-card>
      </a-badge-ribbon>
      </a-col>
    </a-row>
  </div>
</a-collapse-panel>
<a-collapse-panel key="3" header="等级评定">
   <a-card :v-if="pform[0].date" :title="pform[0].date" class="card-styl" :hoverable="true">
   <template #extra><a-button type="primary">More</a-button></template>
    <p>{{pform.level}}</p>
    <p>card content</p>
    <p>card content</p>
  </a-card>
  <a-card :v-if="pform[1].date" :title="pform[1].date" class="card-styl" :hoverable="true">
  <template #extra><a-button type="primary">More</a-button></template>
    <p>card content</p>
    <p>card content</p>
    <p>card content</p>
  </a-card>
</a-collapse-panel>
</a-collapse>
 <a-drawer
    v-model:visible="visible"
    class="custom-class"
    title="日记载"
    placement="right"
    width="800"
    @after-visible-change="afterVisibleChange"
  >
  <div>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </div>
  </a-drawer>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
props:['formdata'],
setup(props,context){
    const iforms = props.formdata.res;
    const aform = props.formdata.res1;
    const pform = props.formdata.res2;
    const activeKey = ref(['1','2','3']);
    const visible = ref(false);
    const afterVisibleChange = bool => {
      console.log('visible', bool);
    };
    const showDrawer = (e) => {
      console.log(e);
      visible.value = true;
    };

return{
    iforms,
    aform,
    pform,
    activeKey,
    visible,
    afterVisibleChange,
    showDrawer,
}
},
})
</script>
<style scoped>
.man-bg{
  margin: 15px 20px;
  background:white;
}
.card-styl{
  padding: 10px 20px;
  margin: 40px 20px;
  background-color: #fafafa;
}
</style>