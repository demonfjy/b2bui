$(".bl-switch").click(function (){
	if($(this).hasClass("bl-switch-checked")){
		$(this).removeClass("bl-switch-checked");
	  $(this).children(".bl-switch-inner").text("关");
	}else{
	  $(this).addClass("bl-switch-checked");
	  $(this).children(".bl-switch-inner").text("开");
  }
});