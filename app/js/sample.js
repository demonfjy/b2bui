//框架高度处理
function height() {
	document.getElementById("iframeleft").height = window.innerHeight - document.getElementById("header").clientHeight;
	document.getElementById("iframeright").height = window.innerHeight - document.getElementById("header").clientHeight - document.getElementById("footer").clientHeight;
};

window.onresize = window.onload = function () {
	//获取浏览器地址栏
	var d=document.location.hash;
	//判断是否获取到地址栏信息,非空执行打开指定页面，负责打开最开始的默认页面
	if(d!=""){
		document.getElementById('iframeright').src="assembly/sample/"+d.substring(1,10)+".html";
	}
	height();
	//获取右边框架中，a元素
	var a = document.getElementById('iframeleft').contentWindow.document.getElementsByTagName("a");
	for (var i = 0; i < a.length; i++){
		//给a元素，添加点击方法
		a[i].onclick = function () {
			//点击后修改地址栏地址，以右边栏a标签id为准
			document.location.hash=this.id;
			location.reload();
		}
	}
	
};