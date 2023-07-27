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
      :title="titles"
      :columns="columns"
      :dataSource="data"
      :pagination="{pageSize:17}"
      :beforeEditSubmit="beforeEditSubmit"
      size="small"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'action'">
          <router-link :to="{path:'/task/next',query:{id:record.num,name:record.name,date:record.times,surplus:record.surplus}}">
          {{ text }}</router-link>
        </template>
        <template v-if="column.dataIndex === 'details'">
          <router-link :to="{path:'/task/next',query:{id:record.num,name:record.name,date:record.date}}">
          {{ text }}</router-link>
        </template>
        <!-- <template v-if="column.dataIndex === 'export'">
          <a @click="exportWrd(record)">{{ text }}</a>
        </template> -->
      </template>
      <template #toolbar>
        <a-button @click="exportForm(part)"> 导出 </a-button>
      </template>
    </BasicTable>
  </div>
</div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { BasicForm, FormSchema, FormActionType, FormProps } from '/@/components/Form/index';
  import { BasicTable } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { formColumns, resPraise } from './data';
  import { Loading, useLoading } from '/@/components/Loading';
  import axios from 'axios';
  import dayjs from 'dayjs';
  import { jsonToSheetXlsx } from '/@/components/Excel/src/Export2Excel';
  import { exportWord } from '/@/utils/exportWord';
  const area = sessionStorage.getItem('area');
  const role = sessionStorage.getItem('role');
  const schemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: '监区',
      componentProps: {
        disabled:/user/.test(role),
      },
      colProps: {
        span: 5,
      },
      defaultValue:area,
    },
    {
      field: 'field2',
      component: 'Input',
      label: '姓名',
      colProps: {
        span: 5,
      },
      componentProps:{
        placeholder:'请输入姓名或编号',
        // onChange: (e: any) => {
          // console.log(e.data);
        // },
      },
    },
    {
      field: 'field3',
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
            label: '月报表',
            value: '4',
            key: '4',
          },
          {
            label: '转表扬',
            value: '5',
            key: '5',
          },
          {
            label: '日记载',
            value: '6',
            key: '6',
          },
          {
            label: '加扣分',
            value: '7',
            key: '7',
          },
        ],
      },
    },
    {
      field: 'field4',
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
    componentProps:{},
    setup() {
      const formElRef = ref<Nullable<FormActionType>>(null);
      const { createMessage } = useMessage();
      const columns = ref(formColumns[0]);
      const data = ref();
      const titles = ref();
      const objs = ref();
      const part = ref();
      const [openFullLoading, closeFullLoading] = useLoading({
        tip: 'Loading...',
      });
      const exportWrd = (objs,part)=>{
        axios.post('/basic-api/export',{values:objs,part:part}).then(response => {
          if(part=='5'){
            exportWord(`${part}.docx` ,resPraise(response.data), `${objs[0].num}.docx`);
          }else if(part=='6'){
            exportWord(`${part}.docx` ,{'res':response.data}, `${objs[0].num}.docx`);
          }else{
            exportWord(`${part}.docx` ,response.data, `${objs[0].num}.docx`);
          };
          });
      }
      const exportXls = ()=>{
        jsonToSheetXlsx({
          header:{
            area:'监区',
            date:'日期',
            name:'姓名',
            num:'编号',
            post:'岗位',
            score1:'监管基础分',
            add1:'监管加分',
            del1:'监管扣分',
            sum1:'监管合计',
            score2:'教育基础分',
            add2:'教育加分',
            del2:'教育扣分',
            sum2:'教育合计',
            score3:'劳动基础分',
            add3:'劳动加分',
            del3:'劳动扣分',
            work:'超欠产分',
            sum3:'劳动合计',
            yj:'月奖',
            hjz:'互监组',
            zx:'专项',
            cf:'处罚',
            total:'总分',
          },
          data: data.value,
        });
      };
      onMounted(()=>{
        titles.value = '回退数据';
        axios.post('/basic-api/task',{values:area}).then(response => {
          data.value = response.data;
        });
      });
      async function beforeEditSubmit({ record, index, key, value }) {
        console.log('单元格数据正在准备提交', { record, index, key, value });

      };
      return {
        exportForm: (part) => {
          openFullLoading();
          if(part=='4'){
            exportXls();
          }else if(part=='5'){
            exportWrd(data.value?.map((item)=>{
              return {'date':item.times.slice(0,7),'num':item.num};
            }),part);
          }else if(part=='7'){
            exportWord(`${part}.docx` ,{'res':data.value?.filter((item)=>{
              return item.score>=2 || item.score<=-7
            })}, `list${part}.docx`);
            exportWord(`${part}a.docx` ,{'res':data.value?.filter((item)=>{
              return item.score<2 && item.score>-7
            })}, `list${part}a.docx`);
          }else if(part=='6'){
            exportWrd(data.value?.map((item)=>{
              return {'date':item.date,'num':item.num};
            }),part);
          }else{
            exportWrd(data.value[0],part);
          };
          setTimeout(() => {
          closeFullLoading();
          }, 600);
        },
        exportWrd,
        exportXls,
        objs,
        area,
        role,
        formElRef,
        schemas,
        handleSubmit: (values: any) => {
          if(!values.field2){values.field2=''};
          if(values.field4){
            values.field4 = dayjs(values.field4).format('YYYY-MM');
          }
          else {
            values.field4='';
            };
          axios.post('/basic-api/task',{values:values}).then(response => {
          data.value = response.data;
          titles.value = '';
          columns.value = formColumns[values.field3];
          part.value = values.field3;
          });
        },
        setProps(props: FormProps) {
          const formEl = formElRef.value;
          if (!formEl) return;
          formEl.setProps(props);
        },
        columns,
        data,
        titles,
        part,
        beforeEditSubmit,
      };
    },
  });
</script>
