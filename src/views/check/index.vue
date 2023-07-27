<template>
<div>
<div style="margin-top:10px;margin-bottom:0px">
  <BasicForm
    :schemas="schemas"
    ref="formElRef"
    :labelWidth="100"
    @submit="handleSubmit"
    :actionColOptions="{span:24}"
  />
</div>
<div class="p-4" style="padding-top:0px">
    <BasicTable
      :canResize="false"
      :title="titles"
      ref="tableRef"
      :dataSource="data"
      :pagination="{pageSize:18}"
      :columns="columns"
      rowKey="id"
      :rowSelection="{ type: 'checkbox' }"
      size="small"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'details'" :part="part">
          <router-link :to="{path:'/task/next',query:{area:record.area,date:record.date,part:part}}">
          {{ text }}</router-link>
        </template>
      </template>
      <template #toolbar>
        <a-button ghost danger @click="checkSubmit(0)"> 退回 </a-button>
        <a-button @click="checkSubmit(1)"> 审核 </a-button>
      </template>
    </BasicTable>
  </div>
</div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted ,unref } from 'vue';
  import { BasicForm, FormSchema, FormActionType, FormProps } from '/@/components/Form/index';
  import { BasicTable, TableActionType } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { formColumns } from './data';
  import { Loading, useLoading } from '/@/components/Loading';
  import axios from 'axios';
  import dayjs from 'dayjs';
  const area = sessionStorage.getItem('area');
  const role = sessionStorage.getItem('role');
  const roleName = sessionStorage.getItem('realName');
  const schemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: '监区',
      colProps: {
        span: 5,
      },
      defaultValue:area,
    },
    {
      field: 'field2',
      component: 'Select',
      label: '类型',
      required: true,
      colProps: {
        span: 5,
      },
      componentProps: {
        options: [
          {
            label: '超欠产',
            value: '1',
            key: '1',
          },
          {
            label: '互监组',
            value: '2',
            key: '2',
          },
          {
            label: '月奖励',
            value: '3',
            key: '3',
          },
          {
            label: '加扣分',
            value: '4',
            key: '4',
          },
          {
            label: '特殊事件',
            value: '5',
            key: '5',
          },
        ],
      },
    },
    {
      field: 'field3',
      component: 'MonthPicker',
      label: '日期',
      colProps: {
        span: 4,
      },
    },
  ];
  
  export default defineComponent({
    name:'Report',
    components: { BasicTable, BasicForm, Loading },
    setup() {
      const tableRef = ref<Nullable<TableActionType>>(null);
      const formElRef = ref<Nullable<FormActionType>>(null);
      const { createMessage } = useMessage();
      const columns = ref(formColumns[0]);
      const data = ref();
      const part = ref();
      const titles = ref();
      const [openFullLoading, closeFullLoading] = useLoading({
        tip: 'Loading...',
      });
      function getTableAction() {
        const tableAction = unref(tableRef);
        if (!tableAction) {
          throw new Error('tableAction is null');
        }
        return tableAction;
      };
      function getSelectRowList() {
        createMessage.info('请在控制台查看！');
        console.log(getTableAction().getSelectRows());
      };
      function handleSubmit(values: any){
        if(!values.field1){values.field1=''};
        if(values.field3){
          values.field3 = dayjs(values.field3).format('YYYY-MM');
        }
        else {
          values.field3='';
          };
        axios.post('/basic-api/checkList',{values:values}).then(response => {
        data.value = response.data;
        titles.value = '';
        columns.value = formColumns[values.field2];
        part.value = values.field2;
        });
      };

      return {
        tableRef,
        area,
        role,
        roleName,
        part,
        formElRef,
        schemas,
        handleSubmit,
        // handleSubmit: (values: any) => {
        //   if(!values.field1){values.field1=''};
        //   if(values.field3){
        //     values.field3 = dayjs(values.field3).format('YYYY-MM');
        //   }
        //   else {
        //     values.field3='';
        //     };
        //   axios.post('/basic-api/checkList',{values:values}).then(response => {
        //   data.value = response.data;
        //   titles.value = '';
        //   columns.value = formColumns[values.field2];
        //   part.value = values.field2;
        //   });
        // },
        setProps(props: FormProps) {
          const formEl = formElRef.value;
          if (!formEl) return;
          formEl.setProps(props);
        },
        checkSubmit: (types) => {
          openFullLoading();
          const getList = getTableAction().getSelectRows();
          axios.post('/basic-api/check',{selectRows:getList,
          part:part.value,types:types}).then(response => {
            getList.forEach(element => {
              data.value = data.value.filter((item) => {
                return item.id != element.id;
              });
            });
          });
          setTimeout(() => {
          closeFullLoading();
          }, 500);
        },
        columns,
        data,
        titles,
        getSelectRowList
      };
    },
  });
</script>
