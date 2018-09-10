jQuery(function($){
	$(document).ready(function(){
	    var x = $(location).attr('pathname');

	if(x.indexOf('/energizer-bunny/bunny-timeline') >=0)
	{

		// Slider border in
		$('.timeline-year').each(function() {
			new Waypoint({
				element: $(this),
				handler: function(down){
					this.element.removeClass('border-hide');
				},
				offset: 'bottom-in-view'
			})
		});

		// Slide Text and Image in
		$('.timeline-year__image-contain img').each(function() {
			new Waypoint({
				element: $(this),
				handler: function(down){
					this.element.removeClass('image-hide');
					this.element.parent().siblings('.timeline-year__text-contain').removeClass('text-hide');
				},
				offset: '95%'
			})
		});

		// Slide Text and Image in
		$('.timeline-modern__headline').each(function() {
			new Waypoint({
				element: $(this),
				handler: function(down){
					this.element.addClass('lightSpeedIn');
					$('.timeline-modern').addClass('shown');
				},
				offset: 'bottom-in-view'
			})
		});



	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 600,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});
	}

	})
})