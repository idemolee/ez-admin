function createList(){
	const ls = ['jgscore','jgadd','jgdel','jgsum','jyscore','jyadd','jydel','jysum','ldscore','ldadd','lddel','ldsum','work','zx','cf','total','sum'];
	const month = ['1','2','3','4','5','6','7','8','9','10','11','12'];
	let data = {};
	month.forEach(function(i){
		ls.forEach(function(j){
			data[j+i] = '';
		})
	});
	return data;
}
export function resPraise(reData){
	const array = [];	
	reData.forEach(function(r){
		const b = [...new Set(r.res.map(function(i){
			return i.date.slice(0,4);
		}))];
		const c = b.map(function(i){
				let d = r.res.filter(function(item){
					return (item.date.slice(0,4)==i);
				});
				return	d;
			});
		if(c[0][0].date.length>7 && c[0][0].date.slice(5,7)=='01'){
			c.unshift(Array(c[0].shift()));
		};
		let sum = 0;
		c.forEach(function(i){
			let list = createList();
			const li = ['score1','add1','del1','sum1','score2','add2','del2','sum2','score3','add3','del3','sum3','work','zx','cf','total'];
			const ls = ['jgscore','jgadd','jgdel','jgsum','jyscore','jyadd','jydel','jysum','ldscore','ldadd','lddel','ldsum','work','zx','cf','total','sum'];
			i.forEach(function(j){
				let days = j.date.slice(5,7);
				if(j.date.length>7 && days!='01' && i.indexOf(j)!=i.length-1){
					days = parseInt(days)-1;
                }else{
					days = parseInt(days);
				}
				ls.forEach(function(k){
					if(j[li[ls.indexOf(k)]]){
						list[k+String(days)] = j[li[ls.indexOf(k)]];
					};
				});
				sum += j.total;
				list['sum'+String(days)] = sum;
			});
            list = {...list,...r.detail}
			array.push(list);
		});
	});
	return {'res':array};
}
export const formColumns = [
    [
        {title: '监区',dataIndex: 'area',width:'auto',},
        {title: '日期',dataIndex: 'date',width:100,},
        {title: '编号',dataIndex: 'num',width:'auto',},
        {title: '姓名',dataIndex: 'name',width:'auto',},
        {title: '岗位',dataIndex: 'post',width:'auto',},
        {title: '类别',dataIndex: 'part',width:'auto',},
        {title: '操作',dataIndex: 'operate',width:'auto',},
        {title: '事由',dataIndex: 'reason',width:'auto',},
        {title: '条款',dataIndex: 'clause',width:'auto',},
        {title: '分值',dataIndex: 'score',width:'auto',},
        {title: '处理民警',dataIndex: 'police',width:'auto',},
        {title: '审批时间',dataIndex: 'marks',width:'auto',},
        {title: '操作',dataIndex: 'todo',width:'auto',},
    ],
    [
        {title: '监区',dataIndex: 'area',},
        {title: '日期',dataIndex: 'date',},
        {title: '编号',dataIndex: 'num',},
        {title: '姓名',dataIndex: 'name',},
        {title: '加分事由',dataIndex: 'tips',},
        {title: '超欠产分',dataIndex: 'score',}
    ],
    [
        {title: '监区',dataIndex: 'area',},
        {title: '日期',dataIndex: 'date',},
        {title: '编号',dataIndex: 'num',},
        {title: '姓名',dataIndex: 'name',},
        {title: '互监组编号',dataIndex: 'group',},
        {title: '加分事由',dataIndex: 'tips',},
        {title: '互监组专项加分',dataIndex: 'score',}
    ],
    [
        {title: '监区',dataIndex: 'area',},
        {title: '日期',dataIndex: 'date',},
        {title: '编号',dataIndex: 'num',},
        {title: '姓名',dataIndex: 'name',},
        {title: '月评',dataIndex: 'tips',},
        {title: '月奖专项加分',dataIndex: 'score',}
    ],
    [
        {title: '监区',dataIndex: 'area',width:'auto',},
        {title: '日期',dataIndex: 'date',width:'auto',},
        {title: '编号',dataIndex: 'num',width:100,},
        {title: '姓名',dataIndex: 'name',width:'auto',},
        {title: '岗位',dataIndex: 'post',width:'auto',},
        {title: '监-基',dataIndex: 'score1',width:'auto',},
        {title: '监-加',dataIndex: 'add1',width:'auto',},
        {title: '监-扣',dataIndex: 'del1',width:'auto',},
        {title: '教-基',dataIndex: 'score2',width:'auto',},
        {title: '教-加',dataIndex: 'add2',width:'auto',},
        {title: '教-扣',dataIndex: 'del2',width:'auto',},
        {title: '劳-基',dataIndex: 'score3',width:'auto',},
        {title: '劳-加',dataIndex: 'add3',width:'auto',},
        {title: '劳-扣',dataIndex: 'del3',width:'auto',},
        {title: '超欠产',dataIndex: 'work',width:'auto',},
        {title: '月奖',dataIndex: 'yj',width:'auto',},
        {title: '互监组',dataIndex: 'hjz',width:'auto',},
        {title: '专项',dataIndex: 'zx',width:'auto',},
        {title: '处罚',dataIndex: 'cf',width:'auto',},
        {title: '合计',dataIndex: 'total',width:'auto',}
    ],
    [
        {title: '监区',dataIndex: 'area',},
        {title: '编号',dataIndex: 'num',},
        {title: '姓名',dataIndex: 'name',},
        {title: '评定时间',dataIndex: 'times',},
        {
            title: '评定等级',
            dataIndex: 'rank',
            edit:true,
            editComponent: 'Select',
            editComponentProps: {
                options: [
                {
                    label: '不合格',
                    value: '1',
                },
                {
                    label: '合格',
                    value: '2',
                },
                {
                    label: '积极',
                    value: '3',
                },
                ],
            },
        },
        {
            title: '结果适用',
            dataIndex: 'result',
            edit:true,
            editComponent: 'Select',
            editComponentProps: {
                options: [
                {
                    label: '不予奖励',
                    value: '1',
                },
                {
                    label: '物质奖励',
                    value: '2',
                },
                {
                    label: '表扬',
                    value: '3',
                },
                {
                    label: '表扬+物质奖励',
                    value: '4',
                },
                ],
            },
        },
        {title: '余分',dataIndex: 'surplus',},
        {title: '操作',dataIndex: 'action',}
    ],
    [
        {title: '监区',dataIndex: 'area',},
        {title: '日期',dataIndex: 'date',},
        {title: '编号',dataIndex: 'num',},
        {title: '姓名',dataIndex: 'name',},
        {title: '日记载',dataIndex: 'details',},
    ],
    [
        {title: '监区',dataIndex: 'area',width:'auto',},
        {title: '日期',dataIndex: 'date',width:100,},
        {title: '编号',dataIndex: 'num',width:'auto',},
        {title: '姓名',dataIndex: 'name',width:'auto',},
        {title: '岗位',dataIndex: 'post',width:'auto',},
        {title: '类别',dataIndex: 'part',width:'auto',},
        {title: '操作',dataIndex: 'operate',width:'auto',},
        {title: '事由',dataIndex: 'reason',width:'auto',},
        {title: '条款',dataIndex: 'clause',width:'auto',},
        {title: '分值',dataIndex: 'score',width:'auto',},
        {title: '处理民警',dataIndex: 'police',width:'auto',},
        {title: '监区审核',dataIndex: 'police1',width:'auto',},
        {title: '监区审批',dataIndex: 'police2',width:'auto',},
        {title: '监狱审核',dataIndex: 'police3',width:'auto',},
        {title: '监狱审批',dataIndex: 'leader',width:'auto',},
        {title: '审批时间',dataIndex: 'marks',width:'auto',},
    ],
    [
        {title: '监区',dataIndex: 'area',width:'auto',},
        {title: '日期',dataIndex: 'date',width:100,},
        {title: '编号',dataIndex: 'num',width:'auto',},
        {title: '姓名',dataIndex: 'name',width:'auto',},
        {title: '类别',dataIndex: 'part',width:'auto',},
        {title: '操作',dataIndex: 'operate',width:'auto',},
        {title: '事由',dataIndex: 'reason',width:'auto',},
        {title: '条款',dataIndex: 'clause',width:'auto',},
        {title: '分值',dataIndex: 'score',width:'auto',},
        {title: '处理民警',dataIndex: 'police',width:'auto',},
    ],
    [
        {title: '日期',dataIndex: 'date',width:100,},
        {title: '监-基',dataIndex: 'score1',width:'auto',},
        {title: '监-加',dataIndex: 'add1',width:'auto',},
        {title: '监-扣',dataIndex: 'del1',width:'auto',},
        {title: '教-基',dataIndex: 'score2',width:'auto',},
        {title: '教-加',dataIndex: 'add2',width:'auto',},
        {title: '教-扣',dataIndex: 'del2',width:'auto',},
        {title: '劳-基',dataIndex: 'score3',width:'auto',},
        {title: '劳-加',dataIndex: 'add3',width:'auto',},
        {title: '劳-扣',dataIndex: 'del3',width:'auto',},
        {title: '超欠产',dataIndex: 'work',width:'auto',},
        {title: '专项',dataIndex: 'zx',width:'auto',},
        {title: '处罚',dataIndex: 'cf',width:'auto',},
        {title: '合计',dataIndex: 'total',width:'auto',}
    ],
]