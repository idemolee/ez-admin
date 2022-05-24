<template>
  <Card title="分数范围" :loading="loading">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { Ref, ref, watch } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';

  const props = defineProps({
    loading: Boolean,
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '300px',
    },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  watch(
    () => props.loading,
    () => {
      if (props.loading) {
        return;
      }
      setOptions({
        legend: {
          bottom: 0,
          data: ['访问', '处理'],
        },
        tooltip: {},
        radar: {
          radius: '60%',
          splitNumber: 8,
          indicator: [
            {
              text: '<100',
              max: 100,
            },
            {
              text: '>140',
              max: 100,
            },
            {
              text: '130-140',
              max: 100,
            },
            {
              text: '120-130',
              max: 100,
            },
            {
              text: '110-120',
              max: 100,
            },
            {
              text: '100-110',
              max: 100,
            },
          ],
        },
        series: [
          {
            type: 'radar',
            symbolSize: 0,
            areaStyle: {
              shadowBlur: 0,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1,
            },
            data: [
              // {
              //   value: [90, 50, 86, 40, 50, 20],
              //   name: '访问',
              //   itemStyle: {
              //     color: '#b6a2de',
              //   },
              // },
              {
                value: [40, 25, 60, 76, 90, 75],
                name: '处理',
                itemStyle: {
                  color: '#5ab1ef',
                },
              },
            ],
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
