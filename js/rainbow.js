$(document).ready(function(){

	var durMin = .75;
	var durMax = 1.5;

	var tl = new TimelineMax();
	var t1 = new TimelineMax();
	var t2 = new TimelineMax();
	var t3 = new TimelineMax();

	//tl.staggerTo( $(".beams"), function(){ return durMin + Math.random()*(durMax-durMin) }, { css: { height: "100%" }, ease: Linear.easeNone }, 0 )
	    
	$("#intro .rainbow-layer .rainbow1.vert .beam").each(function(i,n){
	    var dur = durMin + Math.random()*(durMax-durMin)
	        t1.insert(TweenMax.to( n, (function(){ return durMin + Math.random()*(durMax-durMin) })(), { css: { height: "100%" }, delay: (function(){ return durMin + Math.random()*(durMax-durMin) })(), ease: Linear.easeNone }));
	});
	$("#intro .rainbow-layer .horz .beam").each(function(i,n){
	    var dur = durMin + Math.random()*(durMax-durMin)
	        t2.insert(TweenMax.to( n, (function(){ return durMin + Math.random()*(durMax-durMin) })(), { css: { width: "100%" }, ease: Linear.easeNone }));
	});
	$("#intro .rainbow-layer .rainbow3.vert .beam").each(function(i,n){
	    var dur = durMin + Math.random()*(durMax-durMin)
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

	var tl2 = new TimelineMax();
	var t2_1 = new TimelineMax();
	$("#first .rainbow-layer .rainbow3.vert .beam").each(function(i,n){
	    var dur = durMin + Math.random()*(durMax-durMin)
	        t2_1.insert(TweenMax.to( n, (function(){ return durMin + Math.random()*(durMax-durMin) })(), { css: { height: "100%" }, delay: (function(){ return durMin + Math.random()*(durMax-durMin) })(), ease: Linear.easeNone }));
	});
	tl2.append(t2_1);
	tl2.stop();

	$("#first").bind("play_rb", function(e){ tl2.play() });
	$("#first").bind("rev_rb", function(e){ tl2.reverse() });

	var tl3 = new TimelineMax();
	var t3_1 = new TimelineMax();
	$("#second .rainbow-layer .rainbow3.vert .beam").each(function(i,n){
	    var dur = durMin + Math.random()*(durMax-durMin)
	        t3_1.insert(TweenMax.to( n, (function(){ return durMin + Math.random()*(durMax-durMin) })(), { css: { height: "100%" }, delay: (function(){ return durMin + Math.random()*(durMax-durMin) })(), ease: Linear.easeNone }));
	});
	tl3.append(t3_1);
	tl3.stop();

	$("#second").bind("play_rb", function(e){ tl3.play() });
	$("#second").bind("rev_rb", function(e){ tl3.reverse() });
});