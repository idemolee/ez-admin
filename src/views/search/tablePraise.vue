<template>
<div>
  <div id="printMe">
    <table cellspacing="0" border="0">
	<colgroup span="2" width="60"></colgroup>
	<colgroup width="60"></colgroup>
	<colgroup span="12" width="50"></colgroup>
	<colgroup width="50"></colgroup>
	<tr>
		<td colspan=16 height="29" align="center"><p style="font-size:30px">崇州监狱罪犯考核奖惩统计台账</p></td>
	</tr>
	<tr>
		<td class="td-style" colspan=4>罪犯姓名</td>
		<td class="td-style" colspan=4></td>
		<td class="td-style" colspan=4>编号</td>
		<td class="td-style" colspan=4></td>
	</tr>
	<tr>
		<td class="td-style" colspan=4>服刑监区</td>
		<td class="td-style" colspan=4></td>
		<td class="td-style" colspan=4>岗位类别</td>
		<td class="td-style" colspan=4></td>
		</tr>
	<tr>
		<td class="td-style" colspan=4>从严类型</td>
		<td class="td-style" colspan=12></td>
	</tr>
	<tr>
		<td class="td-style" colspan=4>入监时间</td>
		<td class="td-style" colspan=4></td>
		<td class="td-style" colspan=4>上次减刑时间</td>
		<td class="td-style" colspan=4></td></tr>
	<tr>
		<td class="td-style" colspan=16>罪犯考核分逐月统计表</td>
	</tr>
	<tr>
		<td class="td-style" colspan=16></td>
	</tr>
	<tr>
		<td class="td-head-m" colspan=3>月份</td>
		<td class="td-head-m" v-for="i in [...Array(printdata.length).keys()]">
			<span v-if="printdata[i]['date']">{{ printdata[i]['date'] }}</span>
		</td>
		<td class="td-head-m" v-for="i in [...Array(12-printdata.length).keys()]"></td>
		<td class="td-head-m">累计</td>
	</tr>
	<tr>
		<td class="td-head-s" rowspan=4 colspan=1><div style="writing-mode:tb-rl;text-align:center;margin:auto">监管改造</div></td>
		<td class="td-head-m" colspan=2>基础分</td>
		<td class="td-head-m" v-for="i in [...Array(printdata.length).keys()]">
			<span v-if="printdata[i]['score1']">{{ printdata[i]['score1'] }}</span>
		</td>
		<td class="td-head-m" v-for="i in [...Array(13-printdata.length).keys()]"></td>
	</tr>
	<tr>
		<td class="td-head-m" colspan=2>加分</td>
		<td class="td-head-m" v-for="i in [...Array(printdata.length).keys()]">
			<span v-if="printdata[i]['add1']">{{ printdata[i]['add1'] }}</span>
		</td>
		<td class="td-head-m" v-for="i in [...Array(13-printdata.length).keys()]"></td>
	</tr>
	<tr>
		<td class="td-head-m" colspan=2>扣分</td>
		<td class="td-head-m" v-for="i in [...Array(printdata.length).keys()]">
			<span v-if="printdata[i]['del1']">{{ printdata[i]['del1'] }}</span>
		</td>
		<td class="td-head-m" v-for="i in [...Array(13-printdata.length).keys()]"></td>
	</tr>
	<tr>
		<td class="td-head-d" colspan=2>板块考核分</td>
		<td class="td-head-m" v-for="i in [...Array(printdata.length).keys()]">
			<span v-if="printdata[i]['sum1']">{{ printdata[i]['sum1'] }}</span>
		</td>
		<td class="td-head-m" v-for="i in [...Array(13-printdata.length).keys()]"></td>
	</tr>
	<tr>
		<td class="td-head-s" rowspan=4><div style="writing-mode:tb-rl;text-align:center;margin:auto">教育和文化改造</div></td>
		<td class="td-head-m" colspan=2>基础分</td>
		<td class="td-head-m" v-for="i in [...Array(printdata.length).keys()]">
			<span v-if="printdata[i]['score2']">{{ printdata[i]['score2'] }}</span>
		</td>
		<td class="td-head-m" v-for="i in [...Array(13-printdata.length).keys()]"></td>
	</tr>
	<tr>
		<td class="td-head-m" colspan=2>加分</td>
		<td class="td-head-m" v-for="i in [...Array(printdata.length).keys()]">
			<span v-if="printdata[i]['add2']">{{ printdata[i]['add2'] }}</span>
		</td>
		<td class="td-head-m" v-for="i in [...Array(13-printdata.length).keys()]"></td>
	</tr>
	<tr>
		<td class="td-head-m" colspan=2>扣分</td>
		<td class="td-head-m" v-for="i in [...Array(printdata.length).keys()]">
			<span v-if="printdata[i]['del2']">{{ printdata[i]['del2'] }}</span>
		</td>
		<td class="td-head-m" v-for="i in [...Array(13-printdata.length).keys()]"></td>
	</tr>
	<tr>
		<td class="td-head-d" colspan=2>板块考核分</td>
		<td class="td-head-m" v-for="i in [...Array(printdata.length).keys()]">
			<span v-if="printdata[i]['sum2']">{{ printdata[i]['sum2'] }}</span>
		</td>
		<td class="td-head-m" v-for="i in [...Array(13-printdata.length).keys()]"></td>
	</tr>
	<tr>
		<td class="td-head-s" rowspan=5><div style="writing-mode:tb-rl;text-align:center;margin:auto">劳动改造</div></td>
		<td class="td-head-m" colspan=2>基础分</td>
		<td class="td-head-m" v-for="i in [...Array(printdata.length).keys()]">
			<span v-if="printdata[i]['score3']">{{ printdata[i]['score3'] }}</span>
		</td>
		<td class="td-head-m" v-for="i in [...Array(13-printdata.length).keys()]"></td>
	</tr>
	<tr>
		<td class="td-head-d" colspan=2>定额加扣分</td>
		<td class="td-head-m" v-for="i in [...Array(printdata.length).keys()]">
			<span v-if="printdata[i]['work']">{{ printdata[i]['work'] }}</span>
		</td>
		<td class="td-head-m" v-for="i in [...Array(13-printdata.length).keys()]"></td>
	</tr>
	<tr>
		<td class="td-head-m" colspan=2>加分</td>
		<td class="td-head-m" v-for="i in [...Array(printdata.length).keys()]">
			<span v-if="printdata[i]['add3']">{{ printdata[i]['add3'] }}</span>
		</td>
		<td class="td-head-m" v-for="i in [...Array(13-printdata.length).keys()]"></td>
	</tr>
	<tr>
		<td class="td-head-m" colspan=2>扣分</td>
		<td class="td-head-m" v-for="i in [...Array(printdata.length).keys()]">
			<span v-if="printdata[i]['del3']">{{ printdata[i]['del3'] }}</span>
		</td>
		<td class="td-head-m" v-for="i in [...Array(13-printdata.length).keys()]"></td>
	</tr>
	<tr>
		<td class="td-head-d" colspan=2>板块考核分</td>
		<td class="td-head-m" v-for="i in [...Array(printdata.length).keys()]">
			<span v-if="printdata[i]['sum3']">{{ printdata[i]['sum3'] }}</span>
		</td>
		<td class="td-head-m" v-for="i in [...Array(13-printdata.length).keys()]"></td>
	</tr>

	<tr>
		<td rowspan=2 style="border: 1px solid;"><div style="writing-mode:tb-rl;text-align:center;margin:auto">奖惩</div></td>
		<td class="td-head-d" colspan=2>专项加分</td>
		<td class="td-head-m" v-for="i in [...Array(printdata.length).keys()]">
			<span v-if="printdata[i]['zx']">{{ printdata[i]['zx'] }}</span>
		</td>
		<td class="td-head-m" v-for="i in [...Array(13-printdata.length).keys()]"></td>
	</tr>
	<tr>
		<td class="td-head-d" colspan=2>处罚扣分</td>
		<td class="td-head-m" v-for="i in [...Array(printdata.length).keys()]">
			<span v-if="printdata[i]['cf']">{{ printdata[i]['cf'] }}</span>
		</td>
		<td class="td-head-m" v-for="i in [...Array(13-printdata.length).keys()]"></td>
	</tr>
	<tr>
		<td rowspan=2 style="border: 1px solid;"><div style="writing-mode:tb-rl;text-align:center;margin:auto">考核</div></td>
		<td class="td-head-m" colspan=2>当月</td>
		<td class="td-head-m" v-for="i in [...Array(printdata.length).keys()]">
			<span v-if="printdata[i]['total']">{{ printdata[i]['total'] }}</span>
		</td>
		<td class="td-head-m" v-for="i in [...Array(13-printdata.length).keys()]"></td>
	</tr>
	<tr>
		<td class="td-head-m" colspan=2>累计</td>
		<td class="td-head-m" v-for="i in [...Array(printdata.length).keys()]">
			<span v-if="printdata[i]['sum']">{{ printdata[i]['sum'] }}</span>
		</td>
		<td class="td-head-m" v-for="i in [...Array(13-printdata.length).keys()]"></td>
	</tr> 
	<tr>
		<td class="td-head-d" colspan=3>等级评定情况</td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
	</tr>
	<tr>
		<td class="td-head-d" colspan=3>考核结果适用情况</td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
		<td class="td-head-m"></td>
	</tr>
	<tr>
		<td class="td-head-d" colspan=3>行政奖励情况</td>
		<td class="td-head-m" colspan=13></td>
	</tr>
	<tr>
		<td style="border: 1px solid; text-align: center; height: 80px;" colspan=3>备注</td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=13 align="left" valign=middle>共计累计计分0分。按照监管改造35%、教育和文化改造35%、劳动改造30%的比例进行计算，监管改造0分,教育和文化改造0分,劳动改造0分。</td>
		</tr>
	<tr>
		<td height="27" align="left" colspan=8>监区复核人：</td>
		<td height="27" align="left" colspan=8>监狱复核人：</td>
	</tr>
    </table>
  </div>
</div>
</template>
<script>
import {defineComponent} from 'vue';
export default defineComponent({
	props:['postdata'],
  setup(props,context){
		const printdata = props.postdata;
    return {
			printdata,
    };
  },
})
</script>
<style type="text/css">
		body,div,table,thead,tbody,tfoot,tr,th,td,p { font-family:"Noto Sans CJK SC"; font-size:x-small }
		.td-style{
			border: 1px solid; 
			height:32px;
			text-align:center;
			font:22px bold;
		}
		.td-head-s{
			border: 1px solid; 
			height:130px;
			font-size:20px;
		}
		.td-head-m{
			border: 1px solid; 
			height:28px;
			text-align:center;
			font-size:15px;
		}
		.td-head-d{
			border: 1px solid; 
			height:28px;
			text-align:center;
			font-size:11px;
		}
	</style>
