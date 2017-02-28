mui.init({
	keyEventBind: {
		backbutton: false //关闭back按键监听
	},
});
window.addEventListener('refreshProfit', function(event) {
	var scanDate = new Date();
	var scanDateStr = scanDate.getFullYear() + "-" + (scanDate.getMonth() + 1) + "-" + scanDate.getDate();
	getDateProfit(scanDateStr, "peopleNum", "profit");
});
mui.plusReady(function() {
	/*
	 * 获取营业额 和人数
	 */
	var todayDate = new Date();
	var todayDateStr = todayDate.getFullYear() + "-" + (todayDate.getMonth() + 1) + "-" + todayDate.getDate();
	getDateProfit(todayDateStr, "peopleNum", "profit");
	mui(".mui-bar-nav").on("tap", "#gotoCCode", function(e) {
		mui.openWindow({
			url: "couponCode.html"
		});
	});
	/*
	 * 摄像头
	 */
	startRecognize();

});

var scan = null;

function startRecognize() {
	var filter = [plus.barcode.QR];
	scan = new plus.barcode.Barcode('barcodeBox', filter, {
		frameColor: "#E88164",
		scanbarColor: "#E88164",
	});
	scan.onmarked = onmarked;
	scan.onerror = onerror;
	scan.start({
		vibrate: false,
		sound: "none"
	});
}

function onmarked(type, code, file) {
	coupCode(code); //扫码请求
	var scanDate = new Date();
	var scanDateStr = scanDate.getFullYear() + "-" + (scanDate.getMonth() + 1) + "-" + scanDate.getDate();
	getDateProfit(scanDateStr, "peopleNum", "profit");
	setTimeout(function() {
		scan.start({
			vibrate: false,
			sound: "none"
		});
	}, 2000);

}

function onerror(error) {
	mui.alert(error);
}

function startScan() { //开始
	scan.start({
		vibrate: false,
		sound: "none"
	});
}

function cancelScan() { //取消
	scan.cancel();
}

function close() { //结束
	scan.close();
}