require(['../../show/show'], function() {
    var date_full=BL_Util.Date_full;
    var d=new date_full();
    var s_date=[];
    var e_date=[];
    $('#ticket-date').click(function(){
        d.open({
            el:this,
            start:"",
        },function(v){
            e_date = v;
            var date=e_date[0]+"-"+e_date[1]+"-"+e_date[2];//年月日
            $('#ticket-date').val(date);//赋值
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
	
	
});