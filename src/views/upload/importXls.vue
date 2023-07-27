<template>
  <ImpExcel @success="loadDataSuccess">
    <a-button class="m-3">导入Excel</a-button>
  </ImpExcel>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { ImpExcel, excelData } from '/@/components/Excel';
  export default defineComponent({
    components: { ImpExcel },
    setup() {
      function loadDataSuccess(excelDataList: ExcelData[]) {
        tableListRef.value = [];
        console.log(excelDataList);
        for (const excelData of excelDataList) {
          const {
            header,
            results,
            meta: { sheetName },
          } = excelData;
          const columns: BasicColumn[] = [];
          for (const title of header) {
            columns.push({ title, dataIndex: title });
          }
          tableListRef.value.push({ title: sheetName, dataSource: results, columns });
        }
      }
      return {
        loadDataSuccess,
      };
    },
  });
</script>
