function check_formText(obj){	
	var tval=$(obj).val();		
	if(tval==""){
		$(obj).parents(".bl-form-item").addClass("bl-form-item-with-help");
		$(obj).parents(".bl-form-item-control").removeClass("has-feedback").removeClass("has-success").removeClass("has-error");
		$(obj).parents(".bl-form-item-control").addClass("has-feedback").addClass("has-error");
		$(obj).parent().find(".bl-form-explain").remove();
		$(obj).after("<div class='bl-form-explain'>不能为空！</div>");
	}else{
		$(obj).parents(".bl-form-item").removeClass("bl-form-item-with-help");
		$(obj).parents(".bl-form-item-control").removeClass("has-feedback").removeClass("has-success").removeClass("has-error");
		$(obj).parents(".bl-form-item-control").addClass("has-feedback").addClass("has-success");
		$(obj).parent().find(".bl-form-explain").remove();
	}
}

function check_formPassword(obj){	
	var tval=$(obj).val();		
	if(tval==""){
		$(obj).parents(".bl-form-item").addClass("bl-form-item-with-help");
		$(obj).parents(".bl-form-item-control").removeClass("has-feedback").removeClass("has-success").removeClass("has-error");
		$(obj).parents(".bl-form-item-control").addClass("has-feedback").addClass("has-error");
		$(obj).parent().find(".bl-form-explain").remove();
		$(obj).after("<div class='bl-form-explain'>不能为空！</div>");
	}else if(tval.length<6){
		$(obj).parents(".bl-form-item").addClass("bl-form-item-with-help");
		$(obj).parents(".bl-form-item-control").removeClass("has-feedback").removeClass("has-success").removeClass("has-error");
		$(obj).parents(".bl-form-item-control").addClass("has-feedback").addClass("has-error");
		$(obj).parent().find(".bl-form-explain").remove();
		$(obj).after("<div class='bl-form-explain'>不能少于6位！</div>");
	}else{
		$(obj).parents(".bl-form-item").removeClass("bl-form-item-with-help");
		$(obj).parents(".bl-form-item-control").removeClass("has-feedback").removeClass("has-success").removeClass("has-error");
		$(obj).parents(".bl-form-item-control").addClass("has-feedback").addClass("has-success");
		$(obj).parent().find(".bl-form-explain").remove();
	}
}

function check_formYzm(obj){	
	var tval=$(this).val();		
	if(tval==""){
		$(obj).parents(".bl-form-item").addClass("bl-form-item-with-help");
		$(obj).parents(".bl-form-item-control").removeClass("has-feedback").removeClass("has-success").removeClass("has-error");
		$(obj).parents(".bl-form-item-control").addClass("has-feedback").addClass("has-error");
		$(obj).parent().find(".bl-form-explain").remove();
		$(obj).after("<div class='bl-form-explain'>不能为空！</div>");
	}else if(tval.length!=4){
		$(obj).parents(".bl-form-item").addClass("bl-form-item-with-help");
		$(obj).parents(".bl-form-item-control").removeClass("has-feedback").removeClass("has-success").removeClass("has-error");
		$(obj).parents(".bl-form-item-control").addClass("has-feedback").addClass("has-error");
		$(obj).parent().find(".bl-form-explain").remove();
		$(obj).after("<div class='bl-form-explain'>验证码输入有误！</div>");
	}else{
		$(obj).parents(".bl-form-item").removeClass("bl-form-item-with-help");
		$(obj).parents(".bl-form-item-control").removeClass("has-feedback").removeClass("has-success").removeClass("has-error");
		$(obj).parents(".bl-form-item-control").addClass("has-feedback").addClass("has-success");
		$(obj).parent().find(".bl-form-explain").remove();
	}
}

$("input[name='form-txt']").on("blur",function(){
	check_formText(this);
});
	
$("input[name='form-password']").on("blur",function(){
	check_formPassword(this);
});

$("input[name='form-yzm']").on("blur",function(){
	check_formYzm(this);
});

$(".bl-input").keyup(function(){
	$(this).siblings(".bl-select-dropdown").show();
});

$(".bl-input-affix-wrapper").hover(function(){},function(){
	$(this).find(".bl-select-dropdown").hide();
});

$(".bl-select-dropdown").find("li").click(function(){
	$(this).parents(".bl-input-affix-wrapper").find(".bl-input").val($(this).text());
});
	