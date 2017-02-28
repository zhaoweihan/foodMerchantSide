mui.init({
	keyEventBind: {
		backbutton: false //关闭back按键监听
	},
	statusBarBackground: '#f7f7f7', //设置状态栏颜色,仅iOS可用
});
var subpages = ['scanCode.html', 'record.html', 'account.html'];

//解决header位置不在最上边问题
var subpage_style = {
	top: '0px',
	bottom: '51px'
};

var aniShow = {};
var wgtVer = null; //存放当前版本号
//创建子页面，首个选项卡页面显示，其它均隐藏；
mui.plusReady(function() {
	checkVersion(); //版本检查更新
	plus.webview.close("login");
	//检测是否登录
	cpj.isLogin();
	var selfWebview = plus.webview.currentWebview();

	for(var i = 0; i < subpages.length; i++) {
		var temp = {};
		var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
		if(i > 0) {
			sub.hide();
		} else {
			temp[subpages[i]] = "true";
			mui.extend(aniShow, temp);
			sub.show();
		}

		//		selfWebview.append(sub);

	}

	//当前激活选项
	var activeTab = subpages[0];
	//选项卡点击事件
	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		var targetTab = this.getAttribute('href');
		if(targetTab == activeTab) {
			return;
		}
		//若为iOS平台或非首次显示，则直接显示
		if(mui.os.ios || aniShow[targetTab]) {
			plus.webview.show(targetTab);
		} else {
			//否则，使用fade-in动画，且保存变量
			var temp = {};
			temp[targetTab] = "true";
			mui.extend(aniShow, temp);
			plus.webview.show(targetTab, "fade-in", 300);
		}
		//隐藏当前;
		plus.webview.hide(activeTab);
		//更改当前活跃的选项卡
		activeTab = targetTab;
	});

	//---------------消息推送-------------------
	//仅支持竖屏显示
//	plus.screen.lockOrientation("portrait-primary");
//
//	document.addEventListener("newintent", function() {
//		openWebviewFromOthers();
//	});
//
//	plus.push.addEventListener("click", function(msg) {
//		mui.msg("push click");
//		pushGetRun(msg.payload);
//	}, false);
//	plus.push.addEventListener("receive", function(msg) {
//		//获取透传数据
//		var data = JSON.parse(msg.payload);
//		//创建本地消息
//		//plus.push.createMessage(data.content, data.payload, {
//		//    title: data.title,
//		//    cover: false
//		//});
//	}, false);
//	openWebviewFromOthers();
});
//检查是否有版本更新
function checkVersion() {
	cpj.ajax({
		url: "/foodMerchant/appVersion.json",
		data: {
			os: mui.os.android ? 1 : 2,
			versionCode: cpj.versionCode
		},
		success: function(data) {
			if(mui.os.android) {
				console.log("okkook");
				mui.alert("发现新版本，去更新", "版本更新", function() {
					window.location.href = data.url;
					mui.toast("正在下载...")
				});
			} else {
				console.log("ios");
			}
		},
		error: function(code, msg) {}
	})

}
//----------------消息推送--------------
function pushGetRun(payload) {
	mui.alert(payload);
}
//获取通知栏（app未启动）点击、第三方程序启动本app
function openWebviewFromOthers() {
	var args = plus.runtime.arguments;
	if(args) {
		pushGetRun(args);
	}
}
