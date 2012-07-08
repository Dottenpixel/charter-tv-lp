$(document).ready(function(){

	var durMin = .75;
	var durMax = 1.5;

	var tl = new TimelineMax();
	var t1 = new TimelineMax();
	var t2 = new TimelineMax();
	var t3 = new TimelineMax();

	//tl.staggerTo( $(".beams"), function(){ return durMin + Math.random()*(durMax-durMin) }, { css: { height: "100%" }, ease: Linear.easeNone }, 0 )
	    
	$("#intro .rainbow-layer .rainbow1.vert .beam").each(function(i,n){
	    var dur = durMin + Math.random()*(durMax-durMin);
	    t1.insert(TweenMax.to( n, (function(){ return durMin + Math.random()*(durMax-durMin) })(), { css: { height: "100%" }, delay: (function(){ return durMin + Math.random()*(durMax-durMin) })(), ease: Linear.easeNone }));
	});
	$("#intro .rainbow-layer .horz .beam").each(function(i,n){
	    var dur = durMin + Math.random()*(durMax-durMin);
	    t2.insert(TweenMax.to( n, (function(){ return durMin + Math.random()*(durMax-durMin) })(), { css: { width: "100%" }, ease: Linear.easeNone }));
	});
	$("#intro .rainbow-layer .rainbow3.vert .beam").each(function(i,n){
	    var dur = durMin + Math.random()*(durMax-durMin);
	    t3.insert(TweenMax.to( n, (function(){ return durMin + Math.random()*(durMax-durMin) })(), { css: { height: "100%" }, delay: (function(){ return durMin + Math.random()*(durMax-durMin) })(), ease: Linear.easeNone }));
	});

	// $("#intro .rainbow-layer .vert .beam").each(function(i,n){
	//     var dur = durMin + Math.random()*(durMax-durMin)
	//         t1.insert(TweenMax.to( n, (function(){ return durMin + Math.random()*(durMax-durMin) })(), { css: { height: "100%" }, delay: (function(){ return durMin + Math.random()*(durMax-durMin) })(), ease: Linear.easeNone }));
	// });
	// $("#intro .rainbow-layer .horz .beam").each(function(i,n){
	//     var dur = durMin + Math.random()*(durMax-durMin)
	//         t2.insert(TweenMax.to( n, (function(){ return durMin + Math.random()*(durMax-durMin) })(), { css: { width: "100%" }, ease: Linear.easeNone }));
	// });
	tl.append(t1);
	tl.append(t2);
	tl.append(t3);
	tl.play();
	$("#intro .rainbow-layer button[name='play']").click(function(){ tl.play(); });
	$("#intro .rainbow-layer button[name='reverse']").click(function(){ tl.reverse(); });

	var makePageVertRainbow = function( page ) {
		var tl = new TimelineMax();
		var tll = new TimelineMax();
		$(".rainbow-layer .rainbow3.vert .beam", page).each(function(i,n){
		    var dur = durMin + Math.random()*(durMax-durMin)
		    tll.insert(TweenMax.to( n, (function(){ return durMin + Math.random()*(durMax-durMin) })(), { css: { height: "100%" }, delay: (function(){ return durMin + Math.random()*(durMax-durMin) })(), ease: Linear.easeNone }));
		});
		tl.append(tll);
		tl.stop();
		page.bind("play_rb", function(e){ tl.play() });
		page.bind("rev_rb", function(e){ tl.reverse() });
		return tl;
	}

	var makeFinalRainbow = function( page ) {
		var ctaH = $(".cta").offset().top + $(".cta").height();
		$("#fifth .rainbow-layer .rainbow3.vert").css({ "height": ctaH });
		console.log("faaaak", ctaH);
		var tl = makePageVertRainbow( page );
		var t1 = new TimelineMax();
		var t2 = new TimelineMax();
		$(".rainbow-layer .rainbow2.horz .beam", page).each(function(i,n){
			var dur = durMin + Math.random()*(durMax-durMin);
	    	t2.insert(TweenMax.to( n, (function(){ return durMin + Math.random()*(durMax-durMin) })(), { css: { width: "100%" }, ease: Linear.easeNone }));
		});
		tl.append(t2);
		tl.stop();
		page.bind("full_view", function(e){ tl.play() });
		page.bind("partial_view", function(e){ tl.reverse() });
	}

	makePageVertRainbow( $("#first") );
	makePageVertRainbow( $("#second") );
	makePageVertRainbow( $("#third") );
	makePageVertRainbow( $("#fourth") );
	makeFinalRainbow( $("#fifth") );
$(".cta").offset().top
$("#fifth").offset().top
});