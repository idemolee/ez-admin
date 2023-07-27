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
    <!-- <div style="background-color:#fafafa; padding: 10px; margin:5px 20px">
      <a-list>
        <a-row :gutter="16">
        <template v-for="a in aform">
          <a-col :span="6" >
          <a-list-item>
            <a-card style="width:100%" :hoverable="true" @click="showDrawer(a.num,a.date)">
              <p>{{a.date}}</p>
              <p>基础分：{{a.base}}</p>
              <p>月总分：{{a.total}}</p>
            </a-card>
          </a-list-item>
          </a-col>
        </template>
        </a-row>
      </a-list>
    </div> -->
    <div :class="`${prefixCls}__content`" style="background-color:#fafafa;padding:0 10px;">
      <a-list>
        <a-row :gutter="16">
          <template v-for="item in aform" :key="item.date">
            <a-col :span="6">
              <a-list-item>
                <a-card :hoverable="true" :class="`${prefixCls}__card`" @click="showDrawer(item.num,item.date)">
                  <div :class="`${prefixCls}__card-title`">
                    {{ item.date }}
                  </div>
                  <div :class="`${prefixCls}__card-detail`">
                    <p>基础分：{{item.base}}</p>
                    <p>月总分：{{item.total}}</p>
                  </div>
                </a-card>
              </a-list-item>
            </a-col>
          </template>
        </a-row>
      </a-list>
    </div>
  </div>
  <div v-else><a-empty /></div>
</a-collapse-panel>
<a-collapse-panel key="3" header="等级评定">
  <div v-if="pform[0]">
   <a-card v-for="i in pform" :title="i.date" class="card-styl" :hoverable="true" @click="showPraise(i.num,i.date,i.surplus)">
   <template #extra><a-button type="primary" @click="showPraise(i.num,i.date,i.surplus)">More</a-button></template>
   <a-row>
     <a-col :span="16">
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
<div>
 <a-drawer
    id="the-drawer"
    v-model:visible="visible"
    :title="titles"
    placement="right"
    width="600"
  >
  <template #extra>
    <a-button type="primary" @click="showModal">打印</a-button>
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
  </div>

  <a-modal
      v-model:visible="visible1"
      title="Basic Modal"
      width="50%"
      wrap-class-name="full-modal"
      @ok="handleOk"
    >
    <div id="printArea">
      <div style="text-align:center;margin:auto">
        <component :is="currentComponent" :postdata='detailData' :key='new Date().getTime()'></component>
      </div>
    </div>
  </a-modal>

</template>
<script>
import { defineComponent, ref, shallowRef } from 'vue';
import print from "print-js"
import axios from 'axios';
import praiseTable from './tablePraise.vue'
import dateTable from './tableDate.vue'
export default defineComponent({
components:{
  praiseTable,
  },
props:['formdata'],
setup(props,context){
    const currentComponent = shallowRef();
    const iforms = props.formdata.res;
    const aform = props.formdata.res1;
    const pform = props.formdata.res2;
    const activeKey = ref(['1','2','3']);
    const visible = ref(false);
    const visible1 = ref(false);
    const showData = ref();
    const status = ref();
    const praiseData = ref();
    const detailData = ref();
    const titles = ref();
    const surplusP = ref();
    const showPraise = (pnum,pdate,p) => {
      axios.post('/basic-api/getPraise',{
        praiseNum:pnum,
        praiseDate:pdate,
      })
      .then(response => {
        titles.value = '考核周期';
        status.value = 2;
        surplusP.value = p;
        praiseData.value = response.data.res;
        detailData.value = response.data.detail;
        visible.value = true;
        })
      .catch(error => alert('Error!!'));
    };
    const showDrawer = (num,date) => {
      axios.post('/basic-api/show',{
        showNum:num,
        showDay:date,
      })
      .then(response => {
        titles.value = '日记载';
        status.value = 1;
        showData.value = response.data.res;
        visible.value = true;
        })
      .catch(error => alert('Error!!'));
    };
    const showModal = () => {
      visible.value = false;
      visible1.value = true;
      if(status.value==2){currentComponent.value = praiseTable;}
      else if(status.value==1){currentComponent.value = dateTable;}
    };
    const handleOk = e => {
      console.log(e);
      printJS({
          printable: "printArea",
          type:'html',
          header:'',
          targetStyles:['*'],
          style:"@page {margin:0 10mm}"
        }) 
    };
return{
    iforms,
    aform,
    pform,
    activeKey,
    visible,
    visible1,
    showDrawer,
    showData,
    praiseData,
    detailData,
    showPraise,
    status,
    titles,
    surplusP,
    currentComponent,
    showModal,
    handleOk,
    prefixCls: 'list-card',
}
},
})
</script>
<style lang="less" scoped>
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
  background:url('/basic-api/static/003.jpeg') no-repeat center;
  background-size:105% 105%;
  height:130px;
  width: 130px;
}
.list-card {
    &__link {
      margin-top: 10px;
      font-size: 14px;

      a {
        margin-right: 30px;
      }

      span {
        margin-left: 5px;
      }
    }

    &__card {
      width: 100%;
      margin-bottom: -8px;

      .ant-card-body {
        padding: 16px;
      }

      &-title {
        margin-bottom: 5px;
        font-size: 16px;
        font-weight: 500;
        color: @text-color;

        .icon {
          margin-top: -5px;
          margin-right: 10px;
          font-size: 38px !important;
        }
      }

      &-detail {
        padding-top: 10px;
        padding-left: 30px;
        font-size: 14px;
        color: @text-color-secondary;
      }
    }
  }
</style>