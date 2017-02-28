function coupCode(code, inputId) {
	cpj.ajax({
		url: "/foodMerchant/checkCode.json",
		async: false,
		data: {
			userId: localStorage.getItem("cusUserId"),
			code: code
		},
		success: function(data) {
			mui.alert("¥" + data.price + " " + data.name, "验证成功", "确定", function() {
				if(inputId) {
					$("#" + inputId).val("");
				}

			});
		},
		error: function(code, msg) {
			mui.toast(msg);
		}
	});
}