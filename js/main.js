/*
Plugin: jQuery Parallax
Version 1.1
Author: Ian Lunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

//function that places the navigation in the center of the window
function RepositionNav(){
	var windowHeight = $(window).height(); //get the height of the window
	var navHeight = $('nav.floating').height() / 2;
	var windowCenter = (windowHeight / 2); 
	var newtop = windowCenter - navHeight;
	newtop = newtop < $("nav.top").height()+5 ? $("nav.top").height()+5 : newtop;
	$('nav.floating').css({"top": newtop, "left": $("#intro .content").offset().left + $("#intro .content").width() + 10 }); //set the new top position of the navigation list
}


(function( $ ){
	$.fn.parallax = function(xpos, adjuster, inertia, outerHeight) {
			
function inView(pos, element){
	
	element.each(function(){ //for each selector, determine whether it's inview and run the move() function
		
		var element = $(this);
		var top = element.offset().top;
		
		if(outerHeight == true){
			var height = element.outerHeight(true);
		}else{
			var height = element.height();
		}
		var whereAmI = "";
		var posPct;
		//above & in view
		if(top + height >= pos && top + height - windowHeight < pos){
			whereAmI = "above";
			posPct = Math.round((pos-top)/height*100); //how much is hidden?
			// posPct = Math.round(pos/(top+height)*100);
			move(pos, height);
			$this.trigger("partial_view_above");
			$this.trigger("in_view");
		}
				
		//full view
		if(top <= pos && (top + height) >= pos && (top - windowHeight) <= pos && top + height - windowHeight >= pos){
			whereAmI = "full";
			console.log($this.attr("id"), whereAmI);
			move(pos, height);
			$this.trigger("play_rb");
			$("nav.floating").trigger("page_change", $this.attr("id"));
			$this.trigger("in_view")
			$this.trigger("full_view");
		}
		
		//below & in view
		if(top + height > pos && top - windowHeight < pos && top > pos){
			whereAmI = "below";
			// posPct = 100-Math.round(pos/top*100);
			posPct = Math.round(-(pos-top)/height*100); //how much is hidden?
			move(pos, height);
			posPct < 50 ? $this.trigger("play_rb") : $this.trigger("rev_rb");
			if (posPct < 25) $("nav.floating").trigger("page_change", $this.attr("id"));
			$this.trigger("in_view")
			$this.trigger("partial_view");
		}
		console.log("top", top, "pos", pos, "height", height, "windowHeight", windowHeight);
		console.log($this.attr("id"), whereAmI, posPct + "%");
		console.log("________________________");
	});
}		
		
		var $window = $(window);
		var windowHeight = $(window).height();
		var pos = $window.scrollTop(); //position of the scrollbar
		var $this = $(this);
		
		//setup defaults if arguments aren't specified
		if(xpos == null){xpos = "50%"}
		if(adjuster == null){adjuster = 0}
		if(inertia == null){inertia = 0.1}
		if(outerHeight == null){outerHeight = true}
		
		height = $this.height();
		$this.css({'backgroundPosition': newPos(xpos, outerHeight, adjuster, inertia)}); 
		
		function newPos(xpos, windowHeight, pos, adjuster, inertia){
			return xpos + " " + Math.round((-((windowHeight + pos) - adjuster) * inertia)) + "px";
		}
		
		//function to be called whenever the window is scrolled or resized
		function move(pos, height){ 
				$this.css({'backgroundPosition': newPos(xpos, height, pos, adjuster, inertia)}); 
		}
		
		$window.bind('scroll', function(){ //when the user is scrolling...
			console.log($this.attr("id"), $window.scrollTop(), $this.offset().top);
			var pos = $window.scrollTop(); //position of the scrollbar
			inView(pos, $this);
			
			$('#pixels').html(pos);
		})
	}
})( jQuery );


$(document).ready(function(){
	//Modernizr tweaks
	if(!Modernizr.backgroundsize) {
		$("#intro .copy .bg, #fifth .copy .bg").each(function(i,n){
			el = $(n)
			var imgsrc = el.css("backgroundImage");
			var imgNode = $("<img>");
			imgNode.attr( "src", imgsrc.replace(/^url\(["']?(.*?)["']?\)$/, "$1") );
			el.addClass("modernized");
			el.append(imgNode);
		});
	}

	if(!Modernizr.multiplebgs) {
		$(".carousel.apps .app_links a").each(function(i,n){
			el = $(n)
			var shapeNode = $("<div>").addClass("shape");
			var logoNode = $("<div>").addClass("logo");
			var gleenNode = $("<div>").addClass("gleen");
			el.append(shapeNode, logoNode, gleenNode);
		});
	}

	var positionContent = function() {
		var winH = $(window).height();
		var winMin = 600;
		var pageH = (function(){
			if(winH < winMin) { 
				$("body").addClass("min_page");
				return winMin;
			} else {
				$("body").removeClass("min_page");
				return winH;
			}
		})();
		console.log(winH);
		winH < 500 ? $("body").addClass("min_nav") : $("body").removeClass("min_nav");

		$(".page").css({ height : pageH });
		$(".page .content").each(function(i,n){
			$(this).css({ 
				//marginLeft : (function(me){ console.log(me, me.width()); return -me.width()/2 + "px"; })($(n)),
				paddingTop : (function(me){ 
					var padding = (pageH - me.height())/2;
					return "+" + padding + "px"; })($(n))
			});
		});
	}


	$('nav.floating').localScroll(800).bind("page_change", function(e, pId){
		$("a", this).removeClass("active").filter("[href='#"+pId+"']").addClass("active");
		console.log(e, pId);
	});
	
	var hd_carousel = new TimelineMax({ repeat: -1 }); //2112px is the width of the background image
	hd_carousel.append( TweenMax.to( $('#first .channelLineup .carousel_area'), 40, { css: { left: "-2112px" }, ease: Linear.easeNone }));
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
			distance = "-=90px";
		} else {
			if( parseFloat(carouselPos()) >= 0 ) {
				carousel.append( linksHtml );
				carousel.css("left", "-="+(carousel.width()/2)+"px");
			};
			distance = "+=90px";
		}
		TweenMax.to( carousel, .5, { css: { left: distance }, overwrite: false });
	});
	
	positionContent();
	RepositionNav();
	
	$(window).resize(function(){
		console.log($(window).height());
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
