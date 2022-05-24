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
  <div v-if="aform[0]">
  <div style="background-color:#fafafa; padding: 10px; margin:5px 20px">
    <a-row :gutter="16">
      <a-col v-for="a in aform" :span="8" style="margin-bottom:10px">
      <a-badge-ribbon :text="a.text" :color="a.color">
        <a-card :title="a.date" :hoverable="true" @click="showDrawer(a.num,a.date)">
          <p>基础分：{{a.base}}</p>
          <p>月总分：{{a.total}}</p>
        </a-card>
      </a-badge-ribbon>
      </a-col>
    </a-row>
  </div>
  </div>
  <div v-else><a-empty /></div>
</a-collapse-panel>
<a-collapse-panel key="3" header="等级评定">
  <div v-if="pform[0]">
   <a-card v-for="i in pform" :title="i.date" class="card-styl" :hoverable="true">
   <template #extra><a-button type="primary" @click="showPraise(i.num,i.date,i.surplus)">More</a-button></template>
   <a-row><a-col :span="16">
    <p>等级评定：{{ i.rank }}</p>
    <p>结果适用：{{ i.result }}</p>
    <p>转换剩余：{{ i.surplus }}</p>
    <p>根据《细则》第七章 第五十四条 规定，拟同意管教民警对该罪犯的等级评定建议，并拟按规定给予相应奖励。</p>
    </a-col>
    <a-col :span="2"><div class="ac-div"></div></a-col>
    </a-row>
  </a-card>
  </div>
  <div v-else><a-empty /></div>
</a-collapse-panel>
</a-collapse>
 <a-drawer
    v-model:visible="visible"
    :title="titles"
    placement="right"
    width="600"
    @after-visible-change="afterVisibleChange"
  >
  <template #extra>
    <a-button type="primary" v-print="print" @click="printMe">打印</a-button>
  </template>
  <div v-if="status==1">
    <a-row v-for="s in showData">
      <p :style="{
      fontSize: '16px',
      color: s.score>0?'green':'red',
      lineHeight: '24px',
      display: 'block',
      marginBottom: '16px',
    }">{{s.date}}</p>
      <a-col>{{s.part}}：{{s.score}}</a-col>
      <a-col>处理民警：{{s.police}}</a-col>
      <a-col>事由：{{s.reason}}</a-col>
      <a-col>条款：{{s.clause}}</a-col>
      <a-divider />
     </a-row> 
  </div>
  <div v-else-if="status==2">
    <a-timeline>
    <a-timeline-item v-for="i in praiseData" :color="i.pass">
      <p :style="{fontSize:'16px',lineHeight: '24px'}">{{ i.day }}</p>
      <a-row><a-col :span="11">
      <p v-if="i.score1">监管改造：{{ i.score1 }}</p>
      <p v-if="i.score2">文化教育：{{ i.score2 }}</p>
      </a-col><a-col :span="13">
      <p v-if="i.score3">劳动改造：{{ i.score3 }}</p>
      <p v-if="i.score4">专项加分：{{ i.score4 }}</p>
      </a-col></a-row>
      <p>当月考核分：{{ i.score }}</p>
      <p>累计考核分：{{ i.sum }}</p>
      <a-divider/>
    </a-timeline-item>
    <a-timeline-item color="blue">
      <template #dot>
        <sync-outlined spin/>
      </template>
      <p>转换后剩余：{{ surplusP }}</p>
    </a-timeline-item>
  </a-timeline>
  </div>
  </a-drawer>
  <div id="printArea" v-show="toshow">
  <component :is="currentComponent" :postdata='detailData' :key='new Date().getTime()'></component>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import praiseTable from './tablePraise.vue'
export default defineComponent({
components:{
  praiseTable,
  },
props:['formdata'],
setup(props,context){
    const currentComponent = ref();
    const iforms = props.formdata.res;
    const aform = props.formdata.res1;
    const pform = props.formdata.res2;
    const activeKey = ref(['1','2','3']);
    const visible = ref(false);
    const showData = ref();
    const status = ref();
    const praiseData = ref();
    const detailData = ref();
    const titles = ref();
    const surplusP = ref();
    const toshow = ref(false);
    const showPraise = (pnum,pdate,p) => {
      axios.post('http://127.0.0.1:5000/getPraise',{
        praiseNum:pnum,
        praiseDate:pdate,
      })
      .then(response => {
        titles.value = '考核周期';
        status.value = 2;
        surplusP.value = p;
        praiseData.value = response.data.res;
        detailData.value = response.data.detail;
        console.log(detailData.value);
        visible.value = true;
        })
      .catch(error => alert('Error!!'));
    };
    const afterVisibleChange = bool => {
      toshow.value = bool;
      console.log('visible', bool);
    };
    const showDrawer = (num,date) => {
      axios.post('http://127.0.0.1:5000/show',{
        showNum:num,
        showDay:date,
      })
      .then(response => {
        titles.value = '日记载';
        status.value = 1;
        showData.value = response.data.res;
        console.log(showData.value);
        visible.value = true;
        })
      .catch(error => alert('Error!!'));
    };
    const printMe = () => {
      currentComponent.value = praiseTable;
    }
return{
    iforms,
    aform,
    pform,
    activeKey,
    visible,
    afterVisibleChange,
    showDrawer,
    showData,
    praiseData,
    detailData,
    showPraise,
    status,
    titles,
    surplusP,
    currentComponent,
    printMe,
    toshow,
    print: {
        id: 'printArea',
        popTitle: '打印', 
      },
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
  padding: 10px 30px;
  margin: 40px 20px;
  background-color: #F6F6F6;
}
.ac-div{
  background:url('http://127.0.0.1:5000/static/003.jpeg') no-repeat center;
  background-size:105% 105%;
  height:130px;
  width: 130px;
}
</style>