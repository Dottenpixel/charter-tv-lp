$(document).ready(function(){

	var durMin = .75;
	var durMax = 1.5;
	var dur = function( min, max ) {
		return min + Math.random()*(max-min)
	}

	var makeIntroRainbow = function( page ){

		var tl = new TimelineMax();
		var t1 = new TimelineMax();
		var t2 = new TimelineMax();
		var t3 = new TimelineMax();
    
		$(".rainbow-layer .rainbow1.vert .beam", page).each(function(i,n){
		    t1.insert(TweenMax.to( n, dur(durMin,durMax)/2, { css: { height: "100%" }, delay: dur(durMin,durMax)/4, ease: Linear.easeNone }));
		});
		$(".rainbow-layer .horz .beam", page).each(function(i,n){
		    t2.insert(TweenMax.to( n, dur(durMin,durMax), { css: { width: "100%" }, ease: Linear.easeNone }));
		});
		$(".rainbow-layer .rainbow3.vert .beam", page).each(function(i,n){
		    t3.insert(TweenMax.to( n, dur(durMin,durMax)*1.5, { css: { height: "100%" }, delay: dur(durMin,durMax)/4, ease: Linear.easeNone }));
		});

		tl.append(t1);
		tl.append(t2);
		tl.append(t3);
		tl.play();
		$(".rainbow-layer button[name='play']", page).click(function(){ tl.play(); });
		$(".rainbow-layer button[name='reverse']", page).click(function(){ tl.reverse(); });
	}

	var makePageVertRainbow = function( page ) {
		var tl = new TimelineMax();
		var tll = new TimelineMax();
		$(".rainbow-layer .rainbow3.vert .beam", page).each(function(i,n){
		    tll.insert(TweenMax.to( n, dur(durMin,durMax)*2, { css: { height: "100%" }, delay: dur(durMin,durMax)/4, ease: Linear.easeNone }));
		});
		tl.append(tll);
		tl.stop();
		page.bind("play_rb", function(e){ tl.play() });
		page.bind("rev_rb", function(e){ tl.reverse() });
		return tl;
	}

	var makeFinalRainbow = function( page ) {
		var positionElements = function( init ){
			var ctaPos = $(".cta").offset().top - $("#fifth").offset().top;
			var ctaH =  ctaPos > 0 ? ctaPos + $(".cta").height() : "inherit";

			if (init) {
				ctaPos = $(".cta").offset().top;
				ctaH = ctaPos + $(".cta").height();
			}
			$(".rainbow-layer .rainbow3.vert", page).css({ "height": ctaH });
			$(".rainbow-layer .rainbow2.horz", page).css({ "top": ctaPos })
		}


		$(window).resize(function(){
			positionElements();
		});
		page.bind("partial_view_above full_view", function(){
			positionElements();
		});

		positionElements( true );
		var tl = new TimelineMax();
		var t1 = new TimelineMax();
		var t2 = new TimelineMax();
		$(".rainbow-layer .rainbow3.vert .beam", page).each(function(i,n){
		    t1.insert(TweenMax.to( n, dur(durMin,durMax), { css: { height: "100%" }, delay: dur(durMin,durMax)/4, ease: Linear.easeNone }));
		});
		$(".rainbow-layer .rainbow2.horz .beam", page).each(function(i,n){
	    	t2.insert(TweenMax.to( n, dur(durMin,durMax), { css: { width: "100%" }, ease: Linear.easeNone }));
		});
		tl.append(t1);
		tl.append(t2);
		tl.stop();
		page.bind("partial_view_above full_view", function(e){ tl.play() });
		page.bind("partial_view", function(e){ tl.reverse() });
	}
	makeIntroRainbow( $("#intro") );
	makePageVertRainbow( $("#first") );
	makePageVertRainbow( $("#second") );
	makePageVertRainbow( $("#third") );
	makePageVertRainbow( $("#fourth") );
	makeFinalRainbow( $("#fifth") );

});