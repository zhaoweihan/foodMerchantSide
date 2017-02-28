	/*
	 * 获取记录列表
	 */
	function getRecordList(date, listId) {
		cpj.ajax({
			url: "/foodMerchant/orderList.json",
			data: {
				date: date,
				userId: localStorage.getItem("cusUserId")
			},
			success: function(data) {
				$("#" + listId).empty();
				$("#submitAgain").hide();
				if(data.list.length != 0) {
					$.each(data.list, function(index, item) {
						var list = '<li class="mui-table-view">';
						list += '<span>' + item.phone + '</span>';
						list += '<span class="flex2">' + item.name + '</span>';
						list += '<span>¥' + item.price + '元</span>';
						list += '<span class="flex2">成本' + item.cost + '元</span>';
						list += '</li>';
						$("#" + listId).append(list);
					});
				} else {
					$("#" + listId).html('<li>还没有订单呢，加油啊！</li>');
				}
				 //注意，加载完新数据后，必须执行如下代码，注意：若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
//				 if (plus.os.name=="iOS") {
				 	mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
//				 }
				
			},
			error: function(code, msg) {
				mui.toast(msg);
			},
			timeout:function(){
				mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
				$("#submitAgain").show();
			}
		})
	}

/*
 * 获取日营业额、成本、人数
 */
function getDateProfit(date,peopleNum,profit,cost){
	cpj.ajax({
		url:"/foodMerchant/baseProfit.json",
		async:false,
		data:{
			date:date,
			userId:localStorage.getItem("cusUserId")
		},
		success:function(data){
			$("#peopleNum").text(data.peopleNum);
			$("#profit").text(data.profit);
			$("#cost").text(data.cost);
		},
		error:function(code,msg){
			mui.toast(msg);
		}
	});
}
