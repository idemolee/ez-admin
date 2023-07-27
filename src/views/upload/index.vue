<template>
  <div class="site-layout-content">
  <a-row>
    <a-col :span='4' :offset='1'>
    <a-select
      ref="select"
      v-model:value="values"
      style="width: 120px"
      :options="options"
      size='large'
    >
    </a-select>
    </a-col>
    <a-col :span='19'>
    <a-upload
    v-model:file-list="fileList"
    name="file"
    :multiple="true"
    :action="toUrl"
    :headers="headers"
    @change="handleChange2"
    >
    <a-button size='large' block>
      <upload-outlined></upload-outlined>
      点击上传
    </a-button>
    </a-upload>
    </a-col>
    </a-row>
    <div>
    </div>
  </div>
</template>
<script>
import { message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, onMounted } from 'vue';
const role = sessionStorage.getItem('role');
export default defineComponent({
  components: {
    UploadOutlined,
  },
  setup() {
    const handleChange2 = info => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.response === 'success') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    };
    const fileList = ref([]);
    const options = ref();
    const values = ref('请选择');
    const toUrl = () => {
      return "/basic-api/upload/"+values.value
    }
    onMounted(()=>{
      if(role=='super'){
        options.value = [
          {value:'0',label:'数据表',},
          {value:'11',label:'月报表',},
          {value:'22',label:'加扣分',},
          {value:'33',label:'记录表',},
          {value:'44',label:'互监组',},
        ];
      }else if(role=='manage'||role=='admin'){
        options.value = [
          {value:'2',label:'加扣分',},
          {value:'3',label:'记录表',},
          {value:'4',label:'互监组',},
        ];
      }else{
        options.value = [
          {value:'2',label:'加扣分',},
          {value:'4',label:'互监组',},
        ]
      };
    });
    return {
      role,
      toUrl,
      values,
      options,
      fileList,
      headers: {
        authorization: 'authorization-text',
      },
      handleChange2,
    };
  },
});
</script>

<style scoped>
.site-layout-content{
  margin-top: 10px;
  padding:15px 15px;
}
</style>