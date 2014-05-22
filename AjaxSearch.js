
/* ajaxSearch - progressive enhanced processwire search */

$(function(){

	// config
	var minlength = as_config.as_minLength;
	var txt_close = as_config.as_close_text;
	var search_form = as_config.as_search_form;
	var search_input = as_config.as_search_input;
	var param_name = as_config.as_query_name;
	var search_url = as_config.as_query_url;

	var req = null;

	// build dom for ajax search results
	// event listener on "keydown" to be able to prevent the default scrolling in browsers
	$res = $("<div id='ajaxSearch'><div class='ajaxSearch_body'></div></div>").bind("keydown",function(e){
			// escape key close results
			if(e.which == 27) {
				e.preventDefault();
				$(this).fadeOut();
			}
			// arrow down key
			if(e.which == 40) {
				e.preventDefault();
				var $links = $('#ajaxSearch a');
				var $focused = $('#ajaxSearch a:focus');
				var $next = $links.get($links.index($focused)+1);
				if($next) $next.focus();
			}
			// arrow up key
			if(e.which == 38) {
				e.preventDefault();
				var $links = $('#ajaxSearch a');
				var $focused = $('#ajaxSearch a:focus');
				var $prev = $links.get($links.index($focused)-1);
				if($prev) $prev.focus();
			}
		});
	$closebtn = $("<a class='ajaxSearch_close' href='#'>"+txt_close+"</a>");
	$res.prepend($closebtn);
	$res.css({'display':'none'});

	$res.appendTo($(search_form));

	if($(search_input).length != null){

		$(search_input).bind("keyup", function(e) {

			// escape key close results
			if(e.which == 27) {
				$('#ajaxSearch').fadeOut();
				return;
			}
			// arrow down key go to first link
			if(e.which == 40) {
				$('#ajaxSearch a:first').focus();
				return;
			}

			var $this = this;
			var value = $(this).val();

			// if a request running we abort it
			if (req != null) req.abort();

			if (value.length >= minlength ) {

				// add class to searchfield for loader animation
				$(search_input).addClass("ajaxSearch_loader");

				req = $.ajax({
					type: "GET",
					url: search_url.length > 0 ? search_url : $(this).closest("form").attr("action"),
					data: param_name+"="+value,
					dataType: "html",
					success: function(data){
						//we need to check if the value is the same
						if (value==$($this).val()) {
							// insert search result to body
							$res.find('.ajaxSearch_body').html(data);
							if($res.is(':hidden')) $res.slideDown();

							// remove class for loader animation
							$(search_input).removeClass("ajaxSearch_loader");
						}
					}
				});
			}
		})
		.attr({'autocomplete':'off'}); // disables autocomplete in certain browsers

		$('.ajaxSearch_close')
			.on('click',function(){
				$(this).closest('#ajaxSearch').fadeOut();
			});
	}

	// close popup on click outside
	$(document).click(function(e){
		if($(e.target).closest('#ajaxSearch').length == 0) $("#ajaxSearch").fadeOut();
	});
});