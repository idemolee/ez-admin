<template>
  <div class="site-content">
    <a-row>
      <a-col :span='7'>
      <a-radio-group v-model:value="value1" size="large">
        <a-radio-button value="a">超产分</a-radio-button>
        <a-radio-button value="b" disabled>互监组</a-radio-button>
        <a-radio-button value="c" disabled>月奖</a-radio-button>
        <a-radio-button value="d">转表扬</a-radio-button>
        <a-radio-button value="e">月报表</a-radio-button>
      </a-radio-group>
      </a-col>
      <a-col :span='4'>
      <a-space direction="vertical" :size="16">
        <a-month-picker v-model:value="value2" size="large" placeholder="Select month" />
      </a-space>
      </a-col>
      <a-col :span='4'>
      <a-button type="primary" size="large" @click="compute" :disabled='!value2'>Start Now</a-button>
      </a-col>
    </a-row>
      <component :is="currentComponent" :forms='forms' :key='new Date().getTime()'></component>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import dayjs from 'dayjs';
import axios from 'axios';
import e from './Table.vue';
import a from './Hello.vue';
import d from './Praise.vue';
export default defineComponent({
  components:{
    a,
    d,
    e,
  },
  setup() {
    const value1 = ref('a');
    const value2 = ref();
    const currentComponent = ref();
    const forms = ref();
    const compute = () => {
      axios.post('http://127.0.0.1:5000/index',{
        task:value1.value,
        date:dayjs(value2.value).format('YYYY-MM')
      })
      .then(response => {
        currentComponent.value = response.data.task;
        forms.value = response.data.forms;
        console.log(forms.value);
        console.log(currentComponent.value);
        })
      .catch(error => alert('Error!!'));
      };
    return {
      forms,
      compute,
      value1,
      value2,
      currentComponent
    };
  },
});
</script>

<style scoped>
.site-content{
  padding:15px 15px;
}
</style>