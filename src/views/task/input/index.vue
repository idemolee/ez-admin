<template>
  <PageWrapper title="日常改造数据录入" contentFullHeight>
    <div>
      <a-radio-group v-model:value="choose">
        <a-radio-button value="normal">加扣分</a-radio-button>
        <a-radio-button value="special">特殊事件</a-radio-button>
      </a-radio-group>
    </div>
      <BasicForm
        autoFocusFirstItem
        :labelWidth="150"
        :schemas="schemas"
        ref="formElRef"
        :actionColOptions="{ span: 24 }"
        :submitButtonOptions="{ text: '提交' }"
        @submit="handleSubmit"
        @reset="handleReset"
      >
      <template #remoteSearch="{ model, field }">
        <ApiSelect
          :api="optionsListApi"
          showSearch
          v-model:value="model[field]"
          :filterOption="false"
          resultField="list"
          labelField="name"
          valueField="id"
          :params="searchParams"
          @search="onSearch"
        />
      </template> 
      </BasicForm>
  </PageWrapper>
</template>
<script lang="ts">
  import { computed, defineComponent, unref, ref, watch } from 'vue';
  import { BasicForm, FormSchema, ApiSelect } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { optionsListApi } from '/@/api/demo/select';
  import { useDebounceFn } from '@vueuse/core';
  import { Select } from 'ant-design-vue';
  import { cloneDeep } from 'lodash-es';
  import { defHttp } from '/@/utils/http/axios';
  import { commonSchemas, specialSchemas, source } from './data'
  const choose = ref('normal');
  const schemas: FormSchema[] = ref(commonSchemas);
  export default defineComponent({
    components: { BasicForm, CollapseContainer, PageWrapper, ApiSelect, ASelect: Select },
    setup() {
      let theRes = ref('');
      const formElRef = ref<Nullable<FormActionType>>(null);
      const check = ref(null);
      const { createMessage } = useMessage();
      const keyword = ref<string>('');
      const searchParams = computed<Recordable>(() => {
        return { keyword: unref(keyword) };
      });
      const handleSubmit = async(values: any) => {
          if(choose.value=='normal'){
            theRes.value = source[values.result]; 
          };
          try{
            await defHttp.post({url:`/insert/${choose.value}`,params:{value:values,result:theRes.value}});
            createMessage.success('success-' + JSON.stringify(values.nameField));
            formElRef.value.resetFields();
          }catch(error){
            createMessage.error('error!');
          }
        };
      function onSearch(value: string) {
        keyword.value = value;
      };
      watch(choose,(newValue,oldValue)=>{
        if(newValue=='special'){
          schemas.value = specialSchemas;
        }else{
          schemas.value = commonSchemas;
        }
      });
      return {
        formElRef,
        theRes,
        choose,
        schemas,
        optionsListApi,
        onSearch: useDebounceFn(onSearch, 300),
        searchParams,
        handleReset: () => {
          keyword.value = '';
        },
        handleSubmit: useDebounceFn(handleSubmit, 300),
        check,
      };
    },
  });
</script>
