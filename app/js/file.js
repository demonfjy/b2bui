//框架高度处理
function setIframeHeight(iframe) {
	if (iframe) {
		//获取框架下面的内容
		var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
		if (iframeWin.document.body) {
			//给框架高度，以框架下面内容高度为准
			iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
		}
	}
};

window.onresize = window.onload = function () {
	//获取浏览器地址栏
	var d=document.location.hash;
	//判断是否获取到地址栏信息,非空执行打开指定页面，负责打开最开始的默认页面
	if(d!=""){
		document.getElementById('frame-main').src="assembly/file/"+d.substring(1,10)+".html";
	}
	//执行给高的方法
	setTimeout(function(){
		setIframeHeight(document.getElementById('frame-list'));
		setIframeHeight(document.getElementById('frame-main'));
	},100);
	//获取右边框架中，a元素
	var a = document.getElementById('frame-list').contentWindow.document.getElementsByTagName("a");
	for (var i = 0; i < a.length; i++){
		//给a元素，添加点击方法
		a[i].onclick = function () {
			//点击后修改地址栏地址，以右边栏a标签id为准
			document.location.hash=this.id;
			//定时器为给框架高度，延迟执行
			setTimeout(function(){
				var iframeWin = document.getElementById('frame-main').contentWindow || document.getElementById('frame-main').contentDocument.parentWindow;
				document.getElementById('frame-main').height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
			},100);
			location.reload();
		}
	}
};
