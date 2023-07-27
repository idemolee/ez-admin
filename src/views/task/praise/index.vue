<template>
  <div>
    <div class="desc-bg">
      <a-row>
        <a-col :span="18"><p style="font-size: small;margin: auto;padding: auto;">月度会议记录</p></a-col>
        <a-col :span="3"><a-date-picker v-model:value="value" picker="month" /></a-col>
        <a-col :span="3">
          <a-button>查询</a-button>
        </a-col>
      </a-row>
    </div>
    <div style="background:white;padding: 2px;margin:0 12px;">
      <div class="title-bgs">一、通报2022年10月罪犯基础分情况</div>
      <div class="desc-bg">
         <a-list size="small" :data-source="data">
            <template #renderItem="{ item }">
              <a-list-item>{{ item }}</a-list-item>
            </template>
          </a-list>
      </div>
      <div class="title-bgs">二、通报2022年10月罪犯加扣分情况</div>
      <div>本月罪犯违规扣分45人/次，详细情况附后。</div>
      <div class="title-bgs">三、讨论研究2022年10月劳动岗位核定情况</div>
      <div class="desc-bg">
        <div>
          <a-card title="">
            <a-card-grid style="width: 33.33%; text-align: center">Content</a-card-grid>
            <a-card-grid style="width: 33.33%; text-align: center">Content</a-card-grid>
            <a-card-grid style="width: 33.33%; text-align: center">Content</a-card-grid>
          </a-card>
        </div>
      </div>
      <div class="title-bgs">四、讨论研究2022年10月超产分情况</div>
        <div>根据《罪犯改造行为计分细则》第三章第一节第十八条规定，经监区集体评议，决定给予李有良等409名超产的罪犯加共计2870.7分，详细情况附后。</div>
      <div class="title-bgs">五、讨论研究2022年10月专项加分情况</div>
        <div>根据《罪犯改造行为计分细则》第四章第二十六条第一款规定，经监区集体评议，决定给予无违规（一般）互监组的243名罪犯加共计888分；给予无违规（重点）互监组的16名罪犯加共计80分，详细情况附后。</div>
        <div>根据《罪犯改造行为计分细则》第四章第二十六条第十款规定，经监区集体评议，决定给予月奖中评为优、良、中的368名罪犯加共计1886分，其中优42人（占比9.3%），良81人（占比18%），中245人，详情附后。</div>
      <div class="title-bgs">六、讨论研究2022年10月等级评定和考核结果适用的情况</div>
        <div>本月对罗云等72人开展了等级评定，其中罪犯罗云等共计72人，经审批、公示无异议，被评为合格。
本月考核结果适用情况的情况：本月对罗云等72人运用了考核结果，按《崇州监狱罪犯物质奖励暂行规定》，对等级评定为为合格的罪犯罗云等69给予表扬；对等级评定为合格的罪犯杨术全（2022.7考核分低于基础分）、朱波（2022.10考核分低于基础分）、汪子东（2022.10考核分低于基础分），给予物质奖励。</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Dayjs } from 'dayjs';
const data = [1,2,3];
export default defineComponent({
  setup() {
    return {
      value: ref<Dayjs>(),
      data,
    };
  },
});
</script>
<style>
.title-bgs{
  margin: 1em;
  font-size: small;
}
.desc-bg{
  margin: 1em;
  font-size: 16px;
}
</style>

