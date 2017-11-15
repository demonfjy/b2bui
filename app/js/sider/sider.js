$(".bl-menu-submenu-title").click(function (){
	if($(this).parent().hasClass("bl-menu-submenu-open")){
		$(this).parent().removeClass("bl-menu-submenu-open");
	  $(this).parent().children(".bl-menu").addClass("bl-menu-hidden");
	}else{
	$(this).parent().addClass("bl-menu-submenu-open");
	$(this).parent().children(".bl-menu").removeClass("bl-menu-hidden");
  }
});