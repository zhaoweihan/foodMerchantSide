(function(win, doc, $) {
	function ChengPinJia() {
		/*
		 * ajax 基础路径
		 */
		//this.ajaxUrl = 'http://172.168.1.40:8185/custom';//测试地址
		this.ajaxUrl = 'http://api.custom.chengpinjia.com';//生产环境地址
		
		/*
		 * 是否为debug模式，debug模式会输出或打印出系统级错误，以便开发调试
		 */
		this.debug = false;
		/*
		 * 版本code 控制版本更新用
		 */
		this.versionCode=84;
		/*
		 * 初始化函数
		 */
		this._init();

	}
	ChengPinJia.prototype = {
		/*
		 * 初始化方法
		 */
		_init: function() {
			//this.isLogin();
		},
		/*
		 * 判断是否登录状态
		 */
		isLogin: function() {
			if(localStorage.getItem("cusUserId") == null || localStorage.getItem("phone") == null) {
				plus.webview.close("tab-webview");
				mui.openWindow({
					url: "login.html",
					id: "login"
				});
			}
		},
		/*
		 * 输出浏览器类型和设备类型
		 */
		agent: function() {
			if(navigator.platform == "Win32") {
				agent = "ZHUMENGYUNSHOPMALLWAP";
			} else if(navigator.platform == "iPhone") {
				agent = "ZHUMENGYUNSHOPMALLIOS";
			} else {
				agent = "ZHUMENGYUNSHOPMALLANDROID";
			}
			return agent;
		},

		/*
		 * jquery Ajax封装
		 */
		ajax: function(option) {
			var self = this;
			var defaults = {
				async: true,
				type: "post",
				url: "",
				success: function() {},
				error: function() {},
				timeout: function() {}
			}
			if(typeof(option) != "object") {
				throw "参数必须为对象";
				return false;
			}
			$.extend(true, defaults, option || {});

			$.ajax({
				type: defaults.type,
				url: self.ajaxUrl + defaults.url,
				async: defaults.async,
				beforeSend: function(xhr) {
					//xhr.setRequestHeader("Authorization", localStorage.getItem("Authorization"));
					xhr.setRequestHeader("user-agents", self.agent());
				},
				data: defaults.data,
				success: function(data) {
					data = JSON.parse(data);
					var code = Number(data.responseHead.code);
					if(code == 200) {
						defaults.success(data.responseBody);
					} else if(code < 60000 && code >= 50000) { //业务级别错误
						defaults.error(data.responseHead.code, data.responseHead.msg);
					} else if(code < 50000) { //系统级别错误
						self.debug ? console.log(data.responseHead.msg) : null;
						//						switch(code) {
						//							case 40001: //没有提交userId
						//								mui.openWindow({
						//									url: "login.html"
						//								});
						//								break;
						//							default:
						//								break;
						//						}
					}
				},
				timeout: 6000,
				error: function(xhr, error) {
					defaults.timeout();
					if(self.debug) {
						console.log(xhr);
						console.log("error：" + error);
					}
				}
			});
		},

		/*
		 * 获取地址栏参数，支持直接传中文参数
		 */
		getUrlParam: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg); // 匹配目标参数
			if(r != null)
				return decodeURIComponent(r[2]);
			return null; // 返回参数值
		},

		/*
		 * localStorage封装
		 */
		loStg: {
			setItem: function(key, value) {
				if(typeof(value) == "object") {
					localStorage.setItem(key, JSON.stringify(value));
				} else {
					localStorage.setItem(key, value);
				}
			},
			getItem: function(key) {
				var value = localStorage.getItem(key);
				if(value == null) {
					return null;
				} else {
					try {
						return JSON.parse(value);
					} catch(e) {
						return value;
					}
				}
			}
		},
		/*
		 * sessionStorage封装
		 */
		seStg: {
			setItem: function(key, value) {
				if(typeof(value) == "object") {
					sessionStorage.setItem(key, JSON.stringify(value));
				} else {
					sessionStorage.setItem(key, value);
				}
			},
			getItem: function(key) {
				var value = sessionStorage.getItem(key);
				if(value == null) {
					return null;
				} else {
					try {
						return JSON.parse(value);
					} catch(e) {
						return value;
					}
				}
			}
		},
		/*
		 * 自定义滚动条
		 */
		scrollbar: function(option) {
			var defauls = {
				scrollDir: "y", //滚动方向
				contSelector: '', //滚动内容区选择器
				barSelector: '', //滚动条选择器
				sliderSelector: '', //滚动滑块选择器
				wheelStep: 10, //滚轮步长
			}
			$.extend(true, defauls, option || {});

			//滚动内容对象
			var $cont = $(defauls.contSelector);
			//滚动条滑块对象
			var $slider = $(defauls.sliderSelector);
			//滚动条对象
			var $bar = $(defauls.barSelector);
			var $doc = $(document);
			var initSliderDragEvent = function() {
				var slider = $slider;
				if(slider[0]) {
					var doc = $doc;
					slider.on("mousedown", function(e) {
						e.preventDefault();
						dragStartPagePosition = e.pageY; //鼠标位置
						dragStartScrollPosition = $cont[0].scrollTop; //滚动内容超出容器的高度
						dragConBarRate = getMaxScrollPosition() / getMaxSliderPosition();

						doc.on("mousemove.scroll", function(e) {
							mousemoveHandler(e, dragStartScrollPosition, dragStartPagePosition, dragConBarRate);
						}).on("mouseup.scroll", function() {
							doc.off(".scroll");
						});
					});
					//内容可滚动高度
					function getMaxScrollPosition() {
						return Math.max($cont.height(), $cont[0].scrollHeight) - $cont.height();
					}
					//滑块可移动距离
					function getMaxSliderPosition() {
						return $bar.height() - $slider.height();
					}

					function scrollTo(positionVal) {
						$cont.scrollTop(positionVal);
					}

					function mousemoveHandler(e, ds, dp, dr) {
						e.preventDefault();
						if(dp == null) {
							return;
						}
						scrollTo(ds + (e.pageY - dp) * dr);
					}
					//监听内容滚动，同步滑块位置
					function bindContScroll($s) {
						$cont.on("scroll", function() {
							var sliderEl = $s && $s[0];
							if(sliderEl) {
								sliderEl.style.top = getSliderPosition() + "px";
							}
						});
					}
					//计算滑块当前的位置
					function getSliderPosition() {
						return Math.min(getMaxSliderPosition(), getMaxSliderPosition() * $cont[0].scrollTop / getMaxScrollPosition());
					}
					bindContScroll($slider);
					//监听鼠标滚轮事件
					function bindMousewheel() {
						$cont.on("mousewheel DOMMouseScroll", function(e) {
							e.preventDefault();
							var oEv = e.originalEvent,
								wheelRange = oEv.wheelDelta ? -oEv.wheelDelta / 120 : (oEv.detail || 0) / 3;
							scrollTo($cont[0].scrollTop + wheelRange * defauls.wheelStep);
						});
					}
					bindMousewheel();
				}
			}

			initSliderDragEvent();

		},
		/*
		 * 发送手机验证码按钮倒计时
		 */
		vCodeCountdown: function(btnId) {
			var key = 60;
			$("#" + btnId).attr("disabled", "disabled").css("opacity", ".7");
			var Countdown = setInterval(function() {
				if(key > 0) {
					key--;
					$("#" + btnId).html(key + "秒再发送");
				} else {
					$("#" + btnId).html("点击再次发送");
					clearInterval(Countdown);
					$("#" + btnId).removeAttr("disabled").css("opacity", "1");
				}
			}, 1000);
		}
	}
	win.ChengPinJia = ChengPinJia; //把对象挂载到window下
})(window, document, Zepto);
var cpj = new ChengPinJia(); //实例化对象