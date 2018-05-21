//触发点击事件
mui(".tab-wrapper").on("tap", "li", tabStyle);
mui('.taxi-ride').on('tap', '.taxi-ride-num', personNum);
mui('.taxi-ride').on('tap', '.taxi-ride-person', phoneDialog);
mui('.cancelBox').on('tap', '.cancel', hideMap);
mui('.navigator').on('tap', '.avatar', loginDialog);
mui('.login-popup').on('tap', '.close', hideLogin);
//点击显示地图起始点
$('body').delegate('#startLocation','touchend',function(){
	showMap('startLocation');
});
//点击显示地图终点
$('body').delegate('#endLocation','touchend',function(){
	showMap('endLocation');
});
//登录弹框
function loginDialog(){
	var btnArray = ['取消','确定'];
	mui.prompt('登录', '请输入手机号', ' ', btnArray, function(e) {
		if(e.index == 1) {
			$('.login-popup').show();
			$('.login-popup-mask').show();
			$('.login-popup input').focus();
		}
	});
	document.querySelector('.mui-popup-input input').type = 'number';
}
//隐藏验证码弹框
function hideLogin(){
	$('.login-popup').hide();
	$('.login-popup-mask').hide();
	$('.login-popup input').val('');
}

//tab样式
function tabStyle() {
	$(this).addClass('link-active').siblings().removeClass('link-active');
	var type = $(this).attr('data-type');
}
//换乘车人联系方式
function phoneDialog(){
	var btnArray = ['确定'];
	mui.prompt('请输入换乘车主联系方式', '请输入手机号', ' ', btnArray, function(e) {
		if(e.index == 0) {
			if(e.value != ''){
				var str = e.value;
				document.getElementById("phone").innerText ="尾数"+str.substr(str.length-4);
			}
		}
	});
	document.querySelector('.mui-popup-input input').type = 'number';
}
//乘车人数
function personNum() {
	var picker = new mui.PopPicker();
	var data=[{value:'1',text:'1位'},{value:'2',text:'2位'},{value:'3',text:'3位'},{value:'4',text:'4位'}];
	var personNum = document.getElementById('ccrs');
	picker.setData(data);
	picker.show(function(selectItems) {
		personNum.innerHTML = selectItems[0].text;
	});
}

//显示地图
function showMap(el){
	$('.mapBox').css({'left':0,'display':'block'})
	setTimeout(function() {
		windowMapBusiness.autoComplete('inputAddress',el);
		windowMapBusiness.initMap('allmap', '深圳');
	}, 300);
}

function hideMap(){
	$('.mapBox').css({'left':'100%','display':'none'});
}

$('.selectBox').on('change',function(){
	var address = $('.selectBox option:selected').text();
	windowMapBusiness.autoComplete('inputAddress');
})
