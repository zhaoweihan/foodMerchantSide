var phoneRex = /^1[3|4|5|7|8]{1}[\d]{9}$/;
var pwdRex = /^[a-zA-Z0-9~!@#$%^&*()_+\-={}:;<>?,.\/]*$/;
/*
 * 发送登录请求
 */
function loginAjax(userName, password) {
	cpj.ajax({
		url: "/foodMerchant/login.json",
		data: {
			userName: userName,
			password: password
		},
		success: function(data) {
			localStorage.setItem("cusUserId",data.id);
			localStorage.setItem("phone",userName);
			mui.openWindow({
				url: "tab-webview.html",
				id:"tab-webview",
//				createNew:true,
			});
		},
		error: function(code, msg) {
			mui.toast(msg);
		}
	});
}
/*
 * 登录校验
 */
function goLogin() {
	if($("#phone").val() == "") {
		mui.toast("请输入手机号");
	} else if(!phoneRex.test($("#phone").val())) {
		mui.toast("手机号格式不正确");
	} else if($("#password").val() == "") {
		mui.toast("请输入密码");
	} else if(!pwdRex.test($("#password").val())) {
		mui.toast("密码格式不正确");
	} else {
		loginAjax($("#phone").val(), $("#password").val());
	}
}
/*
 * 校验找回密码表单
 */
function checkFindPw() {
	if($("#phone").val() == "") {
		mui.toast("请输入手机号");
	} else if(!phoneRex.test($("#phone").val())) {
		mui.toast("手机号格式不正确");
	} else if($("#vCode").val() == "") {
		mui.toast("请输入手机验证码");
	} else if($("#password").val() == "") {
		mui.toast("请输入密码");
	} else if(!pwdRex.test($("#password").val())) {
		mui.toast("密码格式不正确");
	} else if($("#retPw").val() == "") {
		mui.toast("请输入确认密码");
	} else if($("#retPw").val() != $("#password").val()) {
		mui.toast("确认密码与新密码不一致");
	} else {
		cpj.ajax({
			url: "/foodMerchant/findPassword.json",
			data: {
				phone: $("#phone").val(),
				password: $("#password").val(),
				vcode:$("#vCode").val()
			},
			success: function(data) {
				loginAjax($("#phone").val(),$("#password").val());
			},
			error: function(code, msg) {
				mui.toast(msg);
			}
		});
	}
}