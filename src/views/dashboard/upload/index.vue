<template>
  <div class="site-layout-content">
  <a-row>
    <a-col :span='4' :offset='1'>
    <a-select
      ref="select"
      v-model:value="values"
      style="width: 120px"
      :options="options"
      @focus="focus"
      @change="handleChange1"
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
      Click to Upload
    </a-button>
    </a-upload>
    </a-col>
    </a-row>
  </div>
</template>
<script>
import { message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
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
    const focus = () => {
      console.log('focus');
    };
    const handleChange1 = value => {
      console.log(`selected ${value}`);
    };
    const options = ref([
      {value:'1',label:'月报表',},
      {value:'2',label:'加扣分',},
    ]);
    const values = ref('1');
    const toUrl = () => {
      return "http://127.0.0.1:5000/upload/"+values.value
    }
    return {
      toUrl,
      values,
      focus,
      options,
      fileList,
      headers: {
        authorization: 'authorization-text',
      },
      handleChange1,
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