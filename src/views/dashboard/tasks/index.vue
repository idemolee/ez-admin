<template>
  <div class="site-content">
    <a-row>
      <a-col :span='10' :offset='1'>
      <a-radio-group v-model:value="value1" size="large">
        <a-radio-button value="labor" disabled>超产分</a-radio-button>
        <a-radio-button value="report">月报表</a-radio-button>
        <a-radio-button value="praise">转表扬</a-radio-button>
      </a-radio-group>
      </a-col>
      <a-col :span='4' :offset="1">
      <a-space direction="vertical" :size="16">
        <a-month-picker v-model:value="value2" size="large" placeholder="Select month" />
      </a-space>
      </a-col>
      <a-col :span='8'>
      <a-button type="primary" size="large" @click="compute" :disabled='!value2'>Start Now</a-button>
      </a-col>
    </a-row>
      <component :is="currentComponent" :forms='aforms' :key='new Date().getTime()'></component>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import dayjs from 'dayjs';
import axios from 'axios';
import report from './Table.vue';
import labor from './Hello.vue';
import praise from './Praise.vue';
import group from './Group.vue';
import reward from './Reward.vue';
export default defineComponent({
  components:{
    report,
    labor,
    praise,
    group,
    reward,
  },
  setup() {
    const value1 = ref('labor');
    const value2 = ref();
    const currentComponent = ref();
    const aforms = ref();
    const compute = () => {
      axios.post('/basic-api/index',{
        task:value1.value,
        date:dayjs(value2.value).format('YYYY-MM'),
      })
      .then(response => {
        currentComponent.value = response.data.task;
        aforms.value = response.data.forms;
        })
      .catch(error => alert('Error!!'));
      };
    return {
      aforms,
      compute,
      value1,
      value2,
      currentComponent,
    };
  },
});
</script>

<style scoped>
.site-content{
  padding:15px 15px;
}
</style>