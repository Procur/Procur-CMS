
$('.hoverPR').removeAttr("href");


$('.hoverPR').hover(
	function(){
		prevHtml = $(this).html();
		$(this).html('Coming Soon');
	},
	function(){
		$(this).html(prevHtml);
	}
	);
