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
	var navHeight = $('#nav').height() / 2;
	var windowCenter = (windowHeight / 2); 
	var newtop = windowCenter - navHeight;
	$('#nav').css({"top": newtop}); //set the new top position of the navigation list
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
		}
				
		//full view
		if(top <= pos && (top + height) >= pos && (top - windowHeight) <= pos && top + height - windowHeight >= pos){
			whereAmI = "full";
			console.log($this.attr("id"), whereAmI);
			move(pos, height);
			$this.trigger("play_rb")
			$("#nav").trigger("page_change", $this.attr("id"));
		}
		
		//below & in view
		if(top + height > pos && top - windowHeight < pos && top > pos){
			whereAmI = "below";
			// posPct = 100-Math.round(pos/top*100);
			posPct = Math.round(-(pos-top)/height*100); //how much is hidden?
			move(pos, height);
			posPct < 50 ? $this.trigger("play_rb") : $this.trigger("rev_rb");
			if (posPct < 25) $("#nav").trigger("page_change", $this.attr("id"));
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