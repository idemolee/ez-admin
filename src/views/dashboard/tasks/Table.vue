<template>
  <div id="components-table-demo-size">
    <a-table :columns="columns" :data-source="iforms" :pagination='{pageSize:16}' size="small" >
    <template #filterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <div style="padding: 8px">
        <a-input
          ref="searchInput"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          <template #icon><SearchOutlined /></template>
          Search
        </a-button>
        <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
          Reset
        </a-button>
      </div>
    </template>
    <template #filterIcon="filtered">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
    <template #customRender="{ text, column }">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
            class="highlight"
            :key="i"
          >
            {{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
      <template v-else>
        {{ text }}
      </template>
    </template>
    </a-table>
  </div>
</template>

<style>
#components-table-demo-size{
  margin-top: 16px;
}
</style>
<script>
import { SearchOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref ,reactive, toRefs } from 'vue';
export default defineComponent({
props:['forms'],
components: {
    SearchOutlined,
  },
setup(props,context){
  const state = reactive({
      searchText: '',
      searchedColumn: '',
    });
  const searchInput = ref();
  const columns = [
  {title: '编号',dataIndex: 'num',},
  {
    title: '姓名',
    dataIndex: 'name',
    slots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
    },
    onFilter: (value, record) =>
          record.name.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              console.log(searchInput.value);
              searchInput.value.focus();
            }, 100);
          }
        },
  },  
  {title: '岗位',dataIndex: 'post',},{title: '监-基',dataIndex: 'score1',},
  {title: '监-加',dataIndex: 'add1',},{title: '监-扣',dataIndex: 'del1',},
  {title: '教-基',dataIndex: 'score2',},{title: '教-加',dataIndex: 'add2',},
  {title: '教-扣',dataIndex: 'del2',},{title: '劳-基',dataIndex: 'score3',},
  {title: '劳-加',dataIndex: 'add3',},{title: '劳-扣',dataIndex: 'del3',},
  {title: '超欠产',dataIndex: 'work',},{title: '月奖',dataIndex: 'yj',},
  {title: '互监组',dataIndex: 'hjz',},{title: '专项',dataIndex: 'zx',},
  {title: '合计',dataIndex: 'total',}];
    const iforms = props.forms;
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      state.searchText = selectedKeys[0];
      state.searchedColumn = dataIndex;
    };

    const handleReset = clearFilters => {
      clearFilters();
      state.searchText = '';
    };
return{
    columns,
    iforms,
    handleSearch,
    handleReset,
    searchInput,
    ...toRefs(state),
};
},
})
</script>