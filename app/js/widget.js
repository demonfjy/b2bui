require(['input','sider/sider','show/show','file/file','select/select','radio/radio','checkbox/checkbox'], function() {
	var date_full=BL_Util.Date_full;
	var d=new date_full();
	console.log(d)
	var s_date=[];
	var e_date=[];
	
	$('#ticket-date').click(function(){
		d.open({
			el:this,
			start:"",
		},function(v){
			e_date = v;
			var date=e_date[0]+"-"+e_date[1]+"-"+e_date[2];
			$('#ticket-date').val(date);
		});
	});
	
	$('#ticket-startdate').click(function(){
		d.open({
			el:this,
			end:e_date,
			init:[2017,6],
		},function(v){
			s_date = v;
			var date=s_date[0]+"-"+s_date[1]+"-"+s_date[2];
			$('#ticket-startdate').val(date);
		});
	
	});
	$('#ticket-enddate').click(function(){
		d.open({
			el:this,
			start:s_date,
			init:[2017,6],
		},function(v){
			e_date = v;
			var date=e_date[0]+"-"+e_date[1]+"-"+e_date[2];
			$('#ticket-enddate').val(date);
		});
	});
	
	$(".yzm-button").click(function(){
		var count = 60;
		function CountDown() {
			$(".yzm-button").attr("disabled", true);
			$(".yzm-button").text(count + "s后重新获取");
			if (count == 0) {
				$(".yzm-button").text("获取验证码").removeAttr("disabled");
				clearInterval(countdown);
			}
			count--;
		}
		CountDown();
		var countdown = setInterval(CountDown, 1000);
	});
});