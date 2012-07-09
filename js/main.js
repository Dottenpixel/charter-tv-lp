$(document).ready(function(){
	var positionContent = function() {
		$(".page").css({ height : $(window).height() });
		$(".page .content").each(function(i,n){
			$(this).css({ 
				//marginLeft : (function(me){ console.log(me, me.width()); return -me.width()/2 + "px"; })($(n)),
				paddingTop : (function(me){ 
					var padding = ($(window).height() - me.height())/2;
					return "+" + padding + "px"; })($(n))
			});
		});
	}


	$('nav.floating').localScroll(800).bind("page_change", function(e, pId){
		$("a", this).removeClass("active").filter("[href='#"+pId+"']").addClass("active");
		console.log(e, pId);
	});
	
	var hd_carousel = new TimelineMax({ repeat: -1 }); //2019px is the width of the background image
	hd_carousel.append( TweenMax.to( $('#first .channelLineup .carousel_area'), 40, { css: { left: "-2091px" }, ease: Linear.easeNone }));
	hd_carousel.play();

	$(".carousel_advance").bind("click", function(e){
		e.preventDefault();
		var carousel = $('#second .channelLineup .app_links');
		
		//cancel click if tweening is in progress
		if (TweenMax.isTweening(carousel)) { return false; }
		
		var linksHtml = carousel.html();
		var carouselPos = function() { return $("#second .channelLineup .app_links").css("left"); }
		var distance;
		//console.log( carouselPos(), carousel.width() );
		if( $(this).hasClass("left") ) {
			//console.log( carouselPos(), carousel.children().length );
			if( parseFloat(carouselPos()) <= -($(".carousel.apps .app_links").width()-$(".carousel.apps .carousel_area").width()-120) ) {
				carousel.append( linksHtml );
			};
			distance = "-=120px";
		} else {
			if( parseFloat(carouselPos()) >= 0 ) {
				carousel.append( linksHtml );
				carousel.css("left", "-=1200px");
			};
			distance = "+=120px";
		}
		TweenMax.to( carousel, .5, { css: { left: distance }, overwrite: false });
	});
	
	positionContent();
	RepositionNav();
	
	$(window).resize(function(){
		positionContent();
		RepositionNav();
	});	
	
	//.parallax(xPosition, adjuster, inertia, outerHeight) options:
	//xPosition - Horizontal position of the element
	//adjuster - y position to start from
	//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
	//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
	//#intro, #first, #second, #third, #fourth
	$('#intro').parallax("50%", 0, 0.3, true);
	$('#first').parallax("50%", $(window).height()*2, 0.3, true);
	$('#second').parallax("50%", $(window).height()*3, 0.3, true);
	$('#third').parallax("50%", $(window).height()*4, 0.3, true);
	$('#fourth').parallax("50%", $(window).height()*5, 0.3, true);
	$('#fifth').parallax("50%", $(window).height()*6, 0.3, true);
	// $('#first .bg').parallax("25%", 2500, 0.5, true);
	// $('#fourth .bg').parallax("25%", 2500, 0.5, true);

})
