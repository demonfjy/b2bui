$(".bl-radio-wrapper").click(function(){
	if(!$(this).hasClass("bl-radio-disabled")){
		$(this).addClass("bl-radio-checked").siblings(".bl-radio-wrapper").removeClass("bl-radio-checked");
	}
});