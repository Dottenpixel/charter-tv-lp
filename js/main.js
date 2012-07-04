$(document).ready(function(){
	$(".page, .bg").css({ height : $(window).height() });
	$(".page .content").each(function(i,n){
		$(this).css({ 
			marginLeft : (function(me){ console.log(me, me.width()); return -me.width()/2 + "px"; })($(n)),
			paddingTop : (function(me){ console.log(me.height()); return "+" + ($(window).height() - me.height())/2 + "px"; })($(n))
		});
	});


	$('#nav').localScroll(800).bind("page_change", function(e, pId){
		$("a", this).removeClass("active").filter("[href='#"+pId+"']").addClass("active");
		console.log(e, pId);
	});
	
	var hd_carousel = new TimelineMax({ repeat: -1 }); //2019px is the width of the background image
	hd_carousel.append( TweenMax.to( $('#first .channelLineup'), 40, { css: { backgroundPositionX: "-2091px" }, ease: Linear.easeNone }));
	hd_carousel.play();

	RepositionNav();
	
	$(window).resize(function(){
		RepositionNav();
	});	
	
	//.parallax(xPosition, adjuster, inertia, outerHeight) options:
	//xPosition - Horizontal position of the element
	//adjuster - y position to start from
	//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
	//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
	//#intro, #first, #second, #third, #fourth
	$('#intro').parallax("50%", 0, 0.1, true);
	$('#first').parallax("50%", 0, 0.1, true);
	$('#second').parallax("50%", 0, 0.1, true);
	$('#third').parallax("50%", 0, 0.1, true);
	$('#fourth').parallax("50%", 0, 0.1, true);
	$('#fifth').parallax("50%", 0, 0.1, true);
	// $('#first .bg').parallax("25%", 2500, 0.5, true);
	// $('#fourth .bg').parallax("25%", 2500, 0.5, true);

})
