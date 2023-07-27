<template>
  <div class="my-search-form">
  <a-row>
    <a-col :span="23" :offset="1">
    <right-outlined :style="{fontSize:'25px'}"/>
    <a-select
    v-model:value="value"
    show-search
    placeholder="请输入姓名搜索"
    style="width: 700px"
    :allowClear="true"
    :default-active-first-option="false"
    :show-arrow="false"
    :filter-option="false"
    :not-found-content="null"
    :options="data"
    size="large"
    @search="handleSearch"
    @change="handleChange"
    ></a-select>
    </a-col>
  </a-row>
  <component :is="currentComponent" :formdata='manform' :key='new Date().getTime()'></component>
  </div>
</template>

<script>
import axios from 'axios';
import detailForm from './mans.vue'
import { defineComponent, ref, shallowRef } from 'vue';
import { validateSearch } from 'ant-design-vue/lib/vc-mentions/src/util';
let timeout;
let currentValue = '';
function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;
  function fake() {
    if(value){
    axios.post('/basic-api/search',{values:value}).then(response => {
      if (currentValue === value) {
        const result = response.data.result;
        const data = [];
        result.forEach(r => {data.push({value: r.id,label: r.name,});});
        callback(data);
      }
    });
    };
  }
  timeout = setTimeout(fake, 300);
}

export default defineComponent({
  name:'SearchPage',
  components:{
    detailForm,
  },
  setup() {
    const data = ref([]);
    const value = ref();
    const currentComponent = shallowRef();
    const manform = ref();
    const handleSearch = val => {
      fetch(val, d => data.value = d);
    };
    const handleChange = val => {
      value.value = val;
      if(val){
      axios.post('/basic-api/manform',{values:val}).then(response => {
        manform.value = response.data;
        currentComponent.value = detailForm;
      });
      };
      fetch(val, d => data.value = d);
    };
    return {
      handleSearch,
      handleChange,
      data,
      value,
      currentComponent,
      manform,
    };
  },
});
</script>

<style scoped>
.my-search-form{
  padding:15px 15px;
}
</style>