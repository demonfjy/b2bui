$(function(){
	$(".bl-select-enabled").hover(function(){
		$(this).find(".bl-select-dropdown").show();
	},function(){
		$(this).find(".bl-select-dropdown").delay(300).hide();
	});
	$(".bl-select-lg").hover(function(){
		$(this).find(".bl-select-dropdown").show();
	},function(){
		$(this).find(".bl-select-dropdown").delay(300).hide();
	});
	$(".bl-select-dropdown").find("li").click(function(){
		if($(this).hasClass("bl-select-dropdown-menu-item")){
			$(this).parents(".bl-select-dropdown").hide().siblings(".bl-select-selection").find(".bl-select-selection-selected-value").text($(this).text());
			$(this).parents(".bl-select-dropdown").hide().siblings(".bl-select-selection").find(".bl-select-selection__placeholder").hide();
		}
	});
	
	$(".bl-select-show-left").find(".bl-checkbox-wrapper").click(function(){
		$(this).parents("li").siblings().find(".bl-checkbox").removeClass("bl-checkbox-checked").find("input").attr("checked",false);
		var l=$(this).parents(".bl-select-dropdown").find(".bl-select-show-left").index($(this).parents(".bl-select-show-left"));
		$(this).parents(".bl-select-dropdown").find(".bl-select-show-left").eq(l+1).show();
		if($(this).find(".bl-checkbox").hasClass("bl-checkbox-checked")){
			for(var h=l+2;h<$(this).parents(".bl-select-dropdown").find(".bl-select-show-left").length;h++){
				$(this).parents(".bl-select-dropdown").find(".bl-select-show-left").eq(h).hide().find("input").attr("checked",false).parents(".bl-checkbox").removeClass("bl-checkbox-checked");
			}
		}else{
			for(var h=l+1;h<$(this).parents(".bl-select-dropdown").find(".bl-select-show-left").length;h++){
				$(this).parents(".bl-select-dropdown").find(".bl-select-show-left").eq(h).hide().find("input").attr("checked",false).parents(".bl-checkbox").removeClass("bl-checkbox-checked");
			}
		}
	});
	
	
	/**/
	
	$(".bl-select-show-left").find("input").click(function(){
		$(this).parents("li").siblings().find(".bl-checkbox").removeClass("bl-checkbox-checked").find("input").attr("checked",false);
		var l=$(this).parents(".bl-select-dropdown").find(".bl-select-show-left").index($(this).parents(".bl-select-show-left"));
		$(this).parents(".bl-select-dropdown").find(".bl-select-show-left").eq(l+1).show();
		if($(this).parents("li").find(".bl-checkbox").hasClass("bl-checkbox-checked")){
			for(var h=l+2;h<$(this).parents(".bl-select-dropdown").find(".bl-select-show-left").length;h++){
				$(this).parents(".bl-select-dropdown").find(".bl-select-show-left").eq(h).hide().find("input").attr("checked",false).parents(".bl-checkbox").removeClass("bl-checkbox-checked");
			}
		}else{
			for(var h=l+1;h<$(this).parents(".bl-select-dropdown").find(".bl-select-show-left").length;h++){
				$(this).parents(".bl-select-dropdown").find(".bl-select-show-left").eq(h).hide().find("input").attr("checked",false).parents(".bl-checkbox").removeClass("bl-checkbox-checked");
			}
		}
		var m="";
		var g=$(this).parents(".bl-select-show").find(".bl-select-show-left").length-1;
		if($(this).parents(".bl-select-show").find(".bl-select-show-left").index($(this).parents(".bl-select-show-left"))>=g){
			for(var k=0;k<=$(this).parents(".bl-select-lg").find(".bl-checkbox-checked").length;k++){
				m = m+$(this).parents(".bl-select-lg").find(".bl-checkbox-checked").eq(k).siblings("span").text();
			}
			$(this).parents(".bl-select-lg").find(".bl-select-selection__rendered").find(".bl-select-selection__placeholder").hide();
			$(this).parents(".bl-select-lg").find(".bl-select-selection__rendered").find("ul").append("<li unselectable='unselectable' class='bl-select-selection__choice' title='"+m+"'><div class='bl-select-selection__choice__content'>"+m+"</div><span class='bl-select-selection__choice__remove'></span></li>");
		}
	});
});

$(".bl-select-show-left-1").find(".bl-checkbox").click(function(){
	if($(this).hasClass("bl-checkbox-checked")){
		$(this).parents(".bl-select-show").siblings("div").find("ul").append("<li unselectable='unselectable' class='bl-select-selection__choice' title='"+$(this).siblings().text()+"' id='"+$(this).find("input").attr("id")+"'><div class='bl-select-selection__choice__content'>"+$(this).siblings().text()+"</div><span class='bl-select-selection__choice__remove'></span></li>").siblings(".bl-select-selection__placeholder").hide();
	}else{
		$(this).parents(".bl-select-show").siblings("div").find("ul").find("#"+$(this).find("input").attr("id")).remove();
	}
});

$(document).on("click",".bl-select-selection__choice__remove",function(){
    $(this).parents("li").remove();
	kid = $(this).parents("li").attr("id");
	$("#"+kid).parents(".bl-checkbox").removeClass("bl-checkbox-checked").removeAttr("checked");
})