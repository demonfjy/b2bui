var BL_Util={};
(function(){
	var returnObj=function(str){
		 var v,c;
		   v=document.createElement('div');
		   v.innerHTML=str.trim();
		   c=v.childNodes;
		   return c[0];
	};
	var position=function(obj){
		   var t,l,h,p,w,wh,ww,sh,sl,bd=$('body');
		       p=obj.offset();
		       t=p.top,l=p.left,h=obj.outerHeight(),w=obj.outerWidth(),wh=window.innerHeight,ww=window.innerWidth,sh=bd.scrollTop(),sl=bd.scrollLeft();
		     return [t,l,h,w,wh,ww,sh,sl];   
	};
// 已上为公共部分	
var template={};
var popupNowOpen;
var Popup=function(config){
		     var obj=template[config.type];
		         if(!obj)return;
		         if(!obj.obj[0])return;
		         this.flag=true;
		         this.allFLag=true;
		         this.type=config.type;
		         this.eJson={};
		         this.clone=obj.clone;
						     this.obj=obj.obj;
						     this.back=obj.back;
						     this.open1=config.open;
						     this.showType=config.showType;
						     this.writeList=config.writeList;
						     this.eventList=config.eventList;
						     this.left=config.left;
						     this.top=config.top;	
						     this.callBack=config.closeCallBack
						     this.close1=config.close;
           this.showTypeInitialize();
						     this.Event();
						     this.theEnd();	     	
						     return {open:this.open,close:this.close};
						  
	   };
	    Popup.prototype.theEnd=function(){
	    	 var th=this;
	    	     th.open=function(){
	    	     	  popupNowOpen?popupNowOpen.allClose():null;
	    	     	  th.allOpen();
	    	     };
	    	     th.close=function(){
	    	     	   th.allFLag=0;
	    	     	   th.allClose();
	    	     };
	    }
     Popup.prototype.showTypeInitialize=function(){
     	 this.showType?null:this.showType='zoom';
     };
	    Popup.prototype.initialize=function(){
	    	  var k,v,f=0,th=this,flag,close=th.close1,L,i,arr=th.writeList;
	    	      if(arr){
					    	  	  L=arr.length,i=0;
					    	  	  while(i<L){
					    	  	  	 v=arr[i];
					    	  	  	 if(!v[1])continue;
				             th.obj.find(v[0])[v[1]](v[2]);
				             i++;
					    	  	  };
					    	  };
	    	      arr=this.eventList;
	    	  if(arr){
					    	  	  L=arr.length,i=0;
					    	  	  while(i<L){
					    	  	  	 v=arr[i];
					    	  	  	 if(!v[0])continue;
				             th.obj.on(v[1],v[0],v[2]);
				             i++;
					    	  	  };
					    	  }; 
	    	    flag=close instanceof Array;
	    	    flag?L=close.length:L=1;
	    	    while(L--){
 	      	  	 flag?s=close[L]:s=close;
 	      	  	 if(!s)continue;
 	      	  	 th.obj.on('click',s,function(){
                 th.allClose();
 	      	  	 });
 	      	 };
	    };
	    Popup.prototype.allClose=function(){
	    	var clone,th=this;
				    	 th.obj.hide();
			 	 	   th.back.hide();
			 	 	   th.back.css('z-index',-1000);
			 	 	   th.obj.off();
			 	 	   clone=th.clone.clone(true);
				  	 	 th.obj.replaceWith(clone);     
				  	 	 template[th.type].obj=clone;
				  	 	 clone=null;
				  	 	 popupNowOpen=null;
				  	 	 if(th.allFLag&&th.callBack)th.callBack();
				  	 	 th.allFLag=1;
	    };
	    Popup.prototype.allOpen=function(){
	    	var th=this;
	    	    popupNowOpen=th;
		    	   th.obj=template[th.type].obj;
   	    	 th.obj.addClass('util_popup_'+this.showType+'_before');
          th.initialize();
   	    	 th.obj.show();
   	    	 th.pos();
   	    	 th.obj.css({'visibility':'visible',top:th.top,left:th.left,'z-index':1001});
   	    	 th.back.css('z-index',1000);
   	    	 th.back.show();
   	    	 th.obj.addClass('util_popup_'+th.showType+'_after').removeClass('util_popup_'+th.showType+'_before');
	    };
	    Popup.prototype.pos=function(){
	    	var arr=position(this.obj),th=this;
          th.top==undefined?th.top=((arr[4]-arr[2])/2)/arr[4]*100+'%':null;
          th.left==undefined?th.left=((arr[5]-arr[3])/2)/arr[5]*100+'%':null;
	    };
	    Popup.prototype.Event=function(){
	    	 var th=this;
	    	   if(th.open1){
				    	    $(th.open1).click(function(){
							    	    	 th.allOpen();
				    	    });
	    	   };
	    };
 Popup.template=function(c){
 	  var obj=$(returnObj(c.domStr)),back=$(c.back),L,flag,s;
 	      obj.css({position:'fixed',visibility:'hidden','z-index':-999,display:'none'});
 	      back.css('z-index',-1000);
 	      $('body').append(obj);
 	      	template[c.type]={obj:obj,back:back,clone:obj.clone(true)};
 	      	arguments[0]=null;
 	      	obj=null,back=null;
 };
 	
	var date_full_str="<div class='bl-calendar'><div class='bl-calendar-header'><div class='bl-calendar-header-arrows bl-calendar-header-arrows-left j-calendar-arrows'><span>«</span><span>‹</span></div><span class='bl-calendar-header-date j-calendar-date'><span></span>年<span></span>月</span><div class='bl-calendar-header-arrows bl-calendar-header-arrows-right j-calendar-arrows'><span>›</span><span>»</span></div></div><div class='bl-calendar-body j-calendar-body'><div class='bl-calendar-line j-calendar-line'><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div></div><div class='bl-calendar-footer'><a href='javascript:void(0);' class='bl-calendar-link j-calendar-link'>今天</a></div></div>";
	var date_full_str2="<div class='bl-calendar-line j-calendar-line'><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div>";
	var Date_full=function(config){
		    
		    this.date=[];
		    this.start?this.date[2]=this.start[2]:null;
		    this.obj={};
		    this.initialize();
		    this.inintD();
//		    this.getNow();
//		    this.addPretreatment();
//		    this.addDate();
		    this.Event();
		    this.End();
		    return {open:this.open,close:this.close,date:this.date,start:this.start,end:this.end};
	   };
	   
	   Date_full.prototype.inintD=function(){
	   	 var th=this,n=new Date();
	   	     th.toDate=[n.getFullYear(),n.getMonth()]
	   };
	   Date_full.prototype.End=function(){
	   	var th=this,obj=th.obj.obj;
	   	  th.open=function(config,fun){
	   	  	  th.target=config.el instanceof jQuery?config.el.eq(0):$(config.el).eq(0);
	   	  	   th.Position();
		   	  	  th.start=config.start;
			        th.end=config.end;
		   	  	  config.init?(th.getNow(config.init[0],config.init[1]-1),this.date[2]=config.init[2]):th.getNow(th.toDate[0],th.toDate[1]);
		   	  	  th.addPretreatment(),th.addDate();
		   	  	  th.callBack=fun;
	   	  	  obj.show();
	   	  };
	   	  th.close=function(){
	   	  	 obj.hide();
	   	  	 if(th.callBack)th.callBack(th.date);
	   	  };
	   };
	   Date_full.prototype.Position=function(){
	   	 var th=this,p=position(th.target),obj=th.obj,w=obj.width,h=obj.height,t,l;
          (p[0]-p[6]+p[2]/2)<p[4]/2?t=p[0]+p[2]:t=p[0]-h;
          l+w>p[5]?l=p[5]-w:l=p[1];
	   	     obj.obj.css({'top':t,'left':l})
	   };
	   Date_full.prototype.initialize=function(){
	   	  var obj=this.obj,i=6,str='';
	   	  var o=$(returnObj(date_full_str));
	   	      obj.obj=o;
           obj.arrow=o.find('.j-calendar-arrows span');
           obj.year=o.find('.j-calendar-date span').eq(0);
	   	      obj.month=o.find('.j-calendar-date span').eq(1);
	   	      while(i--){str+=date_full_str2};
	   	      o.find('.j-calendar-body').append(str);
	   	      obj.span=o.find('.j-calendar-line:gt(0)').find('span');
	   	      obj.getNow=o.find('.j-calendar-link');
	   	      $('body').append(o);
	   	      obj.width=o.outerWidth();
	   	      obj.height=o.outerHeight();
	   };
	   Date_full.prototype.check=function(y,m){
	   	     var th=this,d=th.date1,start=th.start,end=th.end,flag;
	             start?(y<start[0]?y=start[0]:null):null;
	             end?(y>end[0]?y=end[0]:null):null;
	             start?(y==start[0]&&m<start[1]?m=start[1]-1:null):null;
	             end?(y==end[0]&&m>=end[1]?m=end[1]-1:null):null;
	             if(th.toDate)th.toDate[0]==y&&th.toDate[1]==m?flag=true:null;
	             return [y,m,flag];
	   };
	   Date_full.prototype.getNow=function(y,m){
	   	    var s= this.check(y,m);
	   	        y=s[0],m=s[1];
	    	   var th=this,f,n,d,d2,h,x,x2;
	    	       y?(n=new Date(y,m,1)):(n=new Date(),f=1);
	    	       y=n.getFullYear(); //年 0
	    	       m=n.getMonth()+1; //月   1
	    	       d=new Date(y,m,0).getDate();//月总天数  2
	    	       d2=new Date(y,m-1,0).getDate();//上个月总天数  3
//	    	       f?(h=n.getDate()):h=-1; //今天几号 非本月-1 ,   4
	    	       s[2]?h=new Date().getDate():h=-1;
	    	       x=n.getDay();     //周几  5
	    	       x2=new Date(y,m-1,1).getDay();//1号是周几  6
	            th.date1=[y,m,d,d2,h,x,x2];
	            th.date[0]=y,th.date[1]=m;
	            
	            th.obj.year.text(y);
	            th.obj.month.text(m);
	   };
	   Date_full.prototype.addPretreatment=function(){
	   	            
	   	      var th=this,d=th.date1,start=th.start,end=th.end;
	   	          th.addDD={d:[],c:[]};
	   	          th.addDD.t=d[4]==-1?-1:d[4]+d[6]-1;
	   	          th.addDD.d[0]=[0,d[6],d[3]-d[6]+1];
	   	          th.addDD.d[1]=[d[6],d[2]+d[6],1];
	   	          th.addDD.d[2]=[d[2]+d[6],42,1];
	   	          th.addDD.c[1]=[];
               if(start){
               	  start[0]==d[0]&&start[1]==d[1]?th.addDD.c[0]=[0,d[6]+start[2]-1]:th.addDD.c[0]=[0,d[6]];
               	  th.addDD.c[1][0]=th.addDD.c[0][1];
               }else{
               	  th.addDD.c[0]=[0,d[6]],th.addDD.c[1][0]=th.addDD.c[0][1];
               };
               if(end){
               	  end[0]==d[0]&&end[1]==d[1]?th.addDD.c[2]=[end[2]+d[6],42]:th.addDD.c[2]=[d[2]+d[6],42];
               	  th.addDD.c[1][1]=th.addDD.c[2][0];
               }else{
               	  th.addDD.c[2]=[d[2]+d[6],42],th.addDD.c[1][1]=th.addDD.c[2][0];
               }
	   	      
	   };
	   Date_full.prototype.addDate=function(){
	    	   var th=this,span=th.obj.span,L=42,i=0,s=th.addDD.d,d0=s[0][2],d1=s[1][2],d2=s[2][2];
	    	   var c=th.addDD.c,t=th.addDD.t;
	    	       while(i<L){
	    	       	   i<s[0][1]?(span.eq(i).text(d0),d0++):null;
	    	       	   i>=s[1][0]&&i<s[1][1]?(span.eq(i).text(d1),d1++):null;
	    	       	   i>=s[2][0]&&i<s[2][1]?(span.eq(i).text(d2),d2++):null;
	    	       	   i<c[0][1]?span.eq(i).removeClass('j-allow j-select'):null;
	    	       	   i>=c[1][0]&&i<c[1][1]?span.eq(i).removeClass('j-allow j-select j-today').addClass('j-allow'):null;
	    	       	   i>=c[2][0]&&i<c[2][1]?span.eq(i).removeClass('j-allow j-select j-today'):null;
	    	       	   i++;
	    	       };
	    	       t!=-1?span.eq(t).removeClass('j-allow j-select').addClass('j-today'):null;
	   };
	   Date_full.prototype.Event=function(){
	   	var th=this,arrow=th.obj.arrow,span=th.obj.span;
	   	       arrow.click(function(){
	   	       	  var i=arrow.index($(this));
	   	       	      span.removeClass('j-select');
	   	       	      i==0?th.getNow(th.date1[0]-1,th.date1[1]-1):null;
	   	       	      i==3?th.getNow(th.date1[0]+1,th.date1[1]-1):null;
	   	       	      i==1?th.getNow(th.date1[0],th.date1[1]-2):null;
	   	       	      i==2?th.getNow(th.date1[0],th.date1[1]):null;
	   	       	      th.addPretreatment();
	   	       	      th.addDate();
	   	       });
	   	     th.obj.obj.on('click','.j-today , .j-allow',function(){
	   	     	       span.removeClass('j-select');
	   	     	   var d=$(this).addClass('j-select').text();
	   	     	       th.date[2]=Number(d);
	   	     	       th.obj.obj.hide();
	   	     	       if(th.callBack)th.callBack(th.date.slice());
	   	     });
          th.obj.getNow.click(function(){
          	    span.removeClass('j-select');
          	    th.getNow(th.toDate[0],th.toDate[1]),th.addPretreatment(),th.addDate();
          });
	   };
	 BL_Util.Date_full=Date_full;
 $('body').append('<div class="bl-modal-mask"></div>');
Popup.template({
    	    domStr:'<div class="bl-modal-wrap"><div class="bl-modal"><div class="bl-modal-content"><button class="bl-modal-close"><span class="bl-modal-close-x"></span></button><div class="bl-modal-header"><div class="bl-modal-title">Basic Modal</div></div><div class="bl-modal-body"></div><div class="bl-modal-footer"><button type="button" class="bl-btn  bl-btn-lg"><span>Cancel</span></button><button type="button" class="bl-btn  bl-btn-primary  bl-btn-lg"><span>OK</span></button></div></div></div></div>',
    	    type:'prompt',
    	    back:'.bl-modal-mask',//bl-modal-mask,
   }); 
(function(){   
var str="<div class='bl-confirm-body-wrapper'><div class='bl-confirm-body'><i class='blicon blicon-alert-warning'></i><span class='bl-confirm-title'>礼品券已过期，无法使用。</span><div class='bl-confirm-content'>一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。</div></div><div class='bl-confirm-btns'><button class='bl-btn bl-btn-primary bl-btn-lg'>确认</button><button class='bl-btn bl-btn-lg'>取消</button></div></div>";
var arr=[
          ['.bl-modal-header','hide',0],
          ['.bl-modal-footer','hide',0],
 	        ['.bl-modal','css',{width:415}],
 	        ['.bl-modal-body','html',str],
          ['.bl-confirm-title','text',''],
          ['.bl-confirm-content','text',''],
          ['.blicon','removeClass',''],  
          ['.bl-modal','removeClass',''],
          ['.blicon','addClass','blicon-alert-warning'],
          ['.bl-modal','addClass','bl-confirm bl-confirm-info'],
          
        ];
var  arr2=[];        
var p = new Popup({
    	    type:'prompt',
    	    //close:'.bl-btn', 
    	    showType:'zoom',
    	    writeList:arr,
   	      eventList:arr2
    })
var c1='blicon-alert-warning',c2='bl-confirm ', c3=' bl-confirm-info'; 
 Popup.alert=function(m){
 	          m.classes&&m.classes[0]?(arr[6][2]=c1,arr[8][2]=m.classes[0]):(arr[6][2]=arr[8][2],arr[8][2]=c1);
 	          m.classes&&m.classes[1]?(arr[7][2]=c2+c3,arr[9][2]=c2+m.classes[1]):(arr[7][2]=arr[9][2],arr[9][2]=c2+c3);
 	          arr[4][2]=m.message[0];
 	          arr[5][2]=m.message[1];
   	        arr[10]=['.bl-btn-lg:gt(0)','remove',''];
   	        arr2[0]=['.bl-btn','click',function(){
   	        	    // p.close();
   	        	}];
   	       	delete arr2[1];
 	     	    p.open();
    };
 Popup.confirm=function(m,fun){
 	          m.classes&&m.classes[0]?(arr[6][2]=c1,arr[8][2]=m.classes[0]):(arr[6][2]=arr[8][2],arr[8][2]=c1);
 	          m.classes&&m.classes[1]?(arr[7][2]=c2+c3,arr[9][2]=c2+m.classes[1]):(arr[7][2]=arr[9][2],arr[9][2]=c2+c3);
 	          arr[4][2]=m.message[0];
 	          arr[5][2]=m.message[1];
 	          delete arr[10];
 	          arr2[0]=['.bl-btn:eq(0)','click',function(){
   	        	        if(fun)fun(p);    
   	        	}];
   	        arr2[1]=['.bl-btn:eq(1)','click',function(){
     	        	      p.close();      
   	        	}]	
 	          p.open();
   };
}()); 

	BL_Util.Popup=Popup;
}());

$("#cancel").click(function(){
	$(this).parents(".show-info").hide();
});