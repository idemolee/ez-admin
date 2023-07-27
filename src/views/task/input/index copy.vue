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
        :labelWidth="200"
        :schemas="schemas"
        :actionColOptions="{ span: 24 }"
        :submitButtonOptions="{ text: '提交' }"
        @submit="handleSubmit"
        @reset="handleReset"
      >
        <!-- <template #selectA="{ model, field }">
          <a-select
            :options="optionsA"
            mode="multiple"
            v-model:value="model[field]"
            @change="valueSelectA = model[field]"
            allowClear
          />
        </template>
        <template #selectB="{ model, field }">
          <a-select
            :options="optionsB"
            mode="multiple"
            v-model:value="model[field]"
            @change="valueSelectB = model[field]"
            allowClear
          />
        </template> -->
        <!-- <template #localSearch="{ model, field }">
          <ApiSelect
            :api="optionsListApi"
            showSearch
            v-model:value="model[field]"
            optionFilterProp="label"
            resultField="list"
            labelField="name"
            valueField="id"
          />
        </template>-->
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
  // import { optionsListApi } from '/@/api/demo/select';
  import { useDebounceFn } from '@vueuse/core';
  import { Select } from 'ant-design-vue';
  import { cloneDeep } from 'lodash-es';
  import { defHttp } from '/@/utils/http/axios';
  const choose = ref('normal');
  const valueSelectA = ref<string[]>([]);
  const valueSelectB = ref<string[]>([]);
  const options = ref<Recordable[]>([]);
  for (let i = 1; i < 10; i++) options.value.push({ label: '选项' + i, value: `${i}` });
  // const optionsA = computed(() => {
  //   return cloneDeep(unref(options)).map((op) => {
  //     op.disabled = unref(valueSelectB).indexOf(op.value) !== -1;
  //     return op;
  //   });
  // });
  // const optionsB = computed(() => {
  //   return cloneDeep(unref(options)).map((op) => {
  //     op.disabled = unref(valueSelectA).indexOf(op.value) !== -1;
  //     return op;
  //   });
  // });
  const provincesOptions = [
    {
      id: 'guangdong',
      label: '监管改造',
      value: '1',
      key: '1',
    },
    {
      id: 'jiangsu',
      label: '教育改造',
      value: '2',
      key: '2',
    },
  ];
  const citiesOptionsData = {
    guangdong: [
      {
        label: '违规1',
        value: '1',
        key: '1',
      },
      {
        label: '违规2',
        value: '2',
        key: '2',
      },
      {
        label: '违规3',
        value: '3',
        key: '3',
      },
    ],
    jiangsu: [
      {
        label: '违规4',
        value: '1',
        key: '1',
      },
      {
        label: '违规5',
        value: '2',
        key: '2',
      },
      {
        label: '违规6',
        value: '3',
        key: '3',
      },
    ],
  };
  const schemas: FormSchema[] = ref([
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '日常加扣分',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'field3',
      component: 'DatePicker',
      label: '日期',
      colProps: {
        span: 6,
      },
    },
    {
      field: 'field4',
      component: 'Select',
      label: '姓名',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '李军',
            value: '1',
            key: '1',
          },
          {
            label: '王豪',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'field11',
      component: 'Cascader',
      label: '事由',
      colProps: {
        span: 10,
      },
      componentProps: {
        options: [
          {
            value: '1',
            label: '监管',
            children: [
              {
                value: '12',
                label: '卫生差',
                children: [
                  {
                    value: '123',
                    label: '扣1分',
                  },
                ],
              },
            ],
          },
          {
            value: '2',
            label: '教育',
            children: [
              {
                value: '22',
                label: '上课讲话',
                children: [
                  {
                    value: '223',
                    label: '扣1分',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ]);
  export default defineComponent({
    components: { BasicForm, CollapseContainer, PageWrapper, ApiSelect, ASelect: Select },
    setup() {
      const check = ref(null);
      const { createMessage } = useMessage();
      const keyword = ref<string>('');
      const optionsListApi = (params?) =>{
          defHttp.get({ url: '/test', params });
          console.log(defHttp.get({ url: '/test', params }));
        }
      const searchParams = computed<Recordable>(() => {
        return { keyword: unref(keyword) };
      });

      function onSearch(value: string) {
        keyword.value = value;
      }
      watch(choose,(newValue,oldValue)=>{
        if(newValue=='special'){
          schemas.value = [    
          {
            field: 'divider-api-select',
            component: 'Divider',
            label: '特殊改造事件',
            colProps: {
              span: 24,
            },
          },
          {
            field: 'field32',
            component: 'Input',
            label: '下拉远程搜索',
            helpMessage: ['ApiSelect组件', '将关键词发送到接口进行远程搜索'],
            required: true,
            slot: 'remoteSearch',
            colProps: {
              span: 8,
            },
            defaultValue: '0',
          },
          {
            field: 'province',
            component: 'Select',
            label: '事件',
            colProps: {
              span: 8,
            },
            componentProps: ({ formModel, formActionType }) => {
              return {
                options: provincesOptions,
                placeholder: '省份与城市联动',
                onChange: (e: any) => {
                  // console.log(e)
                  let citiesOptions =
                    e == 1
                      ? citiesOptionsData[provincesOptions[0].id]
                      : citiesOptionsData[provincesOptions[1].id];
                  // console.log(citiesOptions)
                  if (e === undefined) {
                    citiesOptions = [];
                  }
                  formModel.city = undefined; //  reset city value
                  const { updateSchema } = formActionType;
                  updateSchema({
                    field: 'city',
                    componentProps: {
                      options: citiesOptions,
                    },
                  });
                },
              };
            },
          },
          {
            field: 'city',
            component: 'Select',
            label: '原因',
            colProps: {
              span: 8,
            },
            componentProps: {
              options: [], // defalut []
              placeholder: '省份与城市联动',
            },
          },
          {
            field: '[startTime, endTime]',
            label: '时间范围',
            component: 'RangePicker',
            componentProps: {
              format: 'YYYY-MM-DD',
              placeholder: ['开始时间', '结束时间'],
            },
          },
          ];
        }else{
          schemas.value = [
            {
              field: 'divider-basic',
              component: 'Divider',
              label: '日常加扣分',
              colProps: {
                span: 24,
              },
            },
            {
              field: 'field3',
              component: 'DatePicker',
              label: '日期',
              colProps: {
                span: 6,
              },
            },
            {
              field: 'field4',
              component: 'Select',
              label: '姓名',
              colProps: {
                span: 8,
              },
              componentProps: {
                options: [
                  {
                    label: '李军',
                    value: '1',
                    key: '1',
                  },
                  {
                    label: '王豪',
                    value: '2',
                    key: '2',
                  },
                ],
              },
            },
            {
              field: 'field11',
              component: 'Cascader',
              label: '事由',
              colProps: {
                span: 10,
              },
              componentProps: {
                options: [
                  {
                    value: '1',
                    label: '监管',
                    children: [
                      {
                        value: '12',
                        label: '卫生差',
                        children: [
                          {
                            value: '123',
                            label: '扣1分',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    value: '2',
                    label: '教育',
                    children: [
                      {
                        value: '22',
                        label: '上课讲话',
                        children: [
                          {
                            value: '223',
                            label: '扣1分',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
          ]
        }
        console.log(newValue);
      });
      return {
        choose,
        schemas,
        optionsListApi,
        // optionsA,
        // optionsB,
        // valueSelectA,
        // valueSelectB,
        onSearch: useDebounceFn(onSearch, 300),
        searchParams,
        handleReset: () => {
          keyword.value = '';
        },
        handleSubmit: (values: any) => {
          console.log('values',values,);
          createMessage.success('click search,values:' + JSON.stringify(values));
        },
        check,
      };
    },
  });
</script>
