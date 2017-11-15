$("input[name^='form-txt']").keyup(function(){
		var tval=$(this).val();		
		if(tval==""){
			$(this).parents(".bl-form-item").addClass("bl-form-item-with-help");
			$(this).parents(".bl-form-item-control").removeClass("has-feedback").removeClass("has-success").removeClass("has-error");
			$(this).parents(".bl-form-item-control").addClass("has-feedback").addClass("has-error");
			$(this).parent().find(".bl-form-explain").remove();
			$(this).after("<div class='bl-form-explain'>不能为空！</div>");
		}else{
			$(this).parents(".bl-form-item").removeClass("bl-form-item-with-help");
			$(this).parents(".bl-form-item-control").removeClass("has-feedback").removeClass("has-success").removeClass("has-error");
			$(this).parents(".bl-form-item-control").addClass("has-feedback").addClass("has-success");
			$(this).parent().find(".bl-form-explain").remove();
		}
	});
	$("input[name^='form-password']").keyup(function(){
		var tval=$(this).val();		
		if(tval==""){
			$(this).parents(".bl-form-item").addClass("bl-form-item-with-help");
			$(this).parents(".bl-form-item-control").removeClass("has-feedback").removeClass("has-success").removeClass("has-error");
			$(this).parents(".bl-form-item-control").addClass("has-feedback").addClass("has-error");
			$(this).parent().find(".bl-form-explain").remove();
			$(this).after("<div class='bl-form-explain'>不能为空！</div>");
		}else if(tval.length<6){
			$(this).parents(".bl-form-item").addClass("bl-form-item-with-help");
			$(this).parents(".bl-form-item-control").removeClass("has-feedback").removeClass("has-success").removeClass("has-error");
			$(this).parents(".bl-form-item-control").addClass("has-feedback").addClass("has-error");
			$(this).parent().find(".bl-form-explain").remove();
			$(this).after("<div class='bl-form-explain'>不能少于6位！</div>");
		}else{
			$(this).parents(".bl-form-item").removeClass("bl-form-item-with-help");
			$(this).parents(".bl-form-item-control").removeClass("has-feedback").removeClass("has-success").removeClass("has-error");
			$(this).parents(".bl-form-item-control").addClass("has-feedback").addClass("has-success");
			$(this).parent().find(".bl-form-explain").remove();
		}
	});
	$("input[name^='form-yzm']").keyup(function(){
		var tval=$(this).val();		
		if(tval==""){
			$(this).parents(".bl-form-item").addClass("bl-form-item-with-help");
			$(this).parents(".bl-form-item-control").removeClass("has-feedback").removeClass("has-success").removeClass("has-error");
			$(this).parents(".bl-form-item-control").addClass("has-feedback").addClass("has-error");
			$(this).parent().find(".bl-form-explain").remove();
			$(this).after("<div class='bl-form-explain'>不能为空！</div>");
		}else if(tval.length!=4){
			$(this).parents(".bl-form-item").addClass("bl-form-item-with-help");
			$(this).parents(".bl-form-item-control").removeClass("has-feedback").removeClass("has-success").removeClass("has-error");
			$(this).parents(".bl-form-item-control").addClass("has-feedback").addClass("has-error");
			$(this).parent().find(".bl-form-explain").remove();
			$(this).after("<div class='bl-form-explain'>验证码输入有误！</div>");
		}else{
			$(this).parents(".bl-form-item").removeClass("bl-form-item-with-help");
			$(this).parents(".bl-form-item-control").removeClass("has-feedback").removeClass("has-success").removeClass("has-error");
			$(this).parents(".bl-form-item-control").addClass("has-feedback").addClass("has-success");
			$(this).parent().find(".bl-form-explain").remove();
		}
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
