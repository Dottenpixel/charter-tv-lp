/* Author:

*/
var yPositions = [];
var pages = document.getElementsByClassName('page');
$(document).ready(function(e)
{
	alert($('html,body'));
	var height = $(window).height();
	var topMenuHeight = $(document.getElementById('top')).height();
	for (var i = 0; i < pages.length; i++)
	{
		var page = $(pages[i]);
		page.css('height', height - topMenuHeight);
	}
	
	storePositions();
});

function storePositions()
{
	for (var i = 0; i < pages.length; i++)
	{
		var page = $(pages[i]);
		var position = page.position();
		yPositions.push(position.top)
	}
}

function moveToPosition(index)
{
	var pageContainer = $(document.getElementById('pageContainer'));
	var centerContainers = $(document.getElementsByClassName('centerContainer'));
	var centerContainer = $(centerContainers[2]);
	yPosition = yPositions[index];
	$('html,body').scrollTo(-yPosition);
}