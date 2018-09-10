

$(document).ready(function() {
	// Expandable Footer Menu show / hide functionality
	$('.accordion').click( function() {
		$(this).toggleClass('active');
	});

	$('.update-video').click(function(e){
		e.preventDefault();
		var id = $(this).attr('data-videoID');
		$('eco-advanced-container .section-graphic iframe').attr('src', 'https://www.youtube.com/embed/' + id);
	 });

	//Site-wide Accordions
	$('.accordion-container').find('.accordion-toggle').click(function(){
		// Do nothing when active section is clicked,
		if ($(this).hasClass('active')) {

		} else {
			// If $(this) is not active, remove all active classes.
			$('.accordion-toggle').removeClass('active');

       		//console.log('Class Removed');
			//Expand or collapse this panel, and add active class to header
			$(this).next().slideToggle('fast');
			$(this).addClass('active');

			//Hide the other panels
			$(".accordion-content").not($(this).next()).slideUp('fast');
		};
	});	

	// Custom Styled Dropdown Selects
	function DropDown(el) {
		this.dd = el;
		this.placeholder = this.dd.children('span');
		this.opts = this.dd.find('ul.dropdown > li');
		this.val = '';
		this.index = -1;
		this.sort = '';
		this.initEvents();
	}
	DropDown.prototype = {
		initEvents : function() {
			var obj = this;

			obj.dd.on('click', function(event){
				$(this).toggleClass('active');
				return false;
			});

			obj.opts.on('click',function(){
				var opt = $(this);
				obj.val = opt.text();
				obj.index = opt.index();
				obj.placeholder.text(obj.val);
				obj.sort = opt.attr('data-sort');
				$('.filtered-products-container').mixItUp('sort', obj.sort );
			});
		},
		getValue : function() {
			return this.val;
		},
		getIndex : function() {
			return this.index;
		}
	}

	$(function() {
		var dd = new DropDown( $('#dd-sort') );
		$(document).click(function() {
			// all dropdowns
			$('.wrapper-dropdown-3').removeClass('active');
		});
		// Lighting Landing Page 
		var dd = new DropDown( $('#dd-type') );
		$(document).click(function() {
			// all dropdowns
			$('.wrapper-dropdown-3').removeClass('active');
		});
		var dd = new DropDown( $('#dd-use') );
		$(document).click(function() {
			// all dropdowns
			$('.wrapper-dropdown-3').removeClass('active');
		});
		var dd = new DropDown( $('#dd-brand') );
		$(document).click(function() {
			// all dropdowns
			$('.wrapper-dropdown-3').removeClass('active');
		});
	});	

	$('#mobileSearch').click(function(){
		$('#mobileSearchBox').fadeToggle(300);
	});

	$('a.meanmenu-reveal').click(function(){
		$('#mobileSearchBox').hide();
	});

	$('li.active-country').hover(function(){
		$(this).toggleClass('country-clicked');
	});

    jQuery(window).bind('scroll', function() { //Fixed Navigation
 		var navHeight = 64;
           if (jQuery(window).scrollTop() > navHeight && jQuery(window).width() > 1024) {
               jQuery('.main-header').addClass('fixed');
               jQuery('body').css('padding-top','64px');
           }
           else {
               jQuery('.main-header').removeClass('fixed');
               jQuery('body').css('padding-top','0px');
           }
  	});



// Bind an event to window.onhashchange that, when the hash changes, gets the
 // hash and adds the class "selected" to any matching nav link.
 $(window).hashchange( function(){
   if(location.hash == ''){
   		var hash = $('.hash').find('a.accordion-toggle').slice(0,1).attr('href');
   } else {
   	var hash = location.hash;
   }
   console.log(hash);
   // Iterate over all nav links, setting the "selected" class as-appropriate.
   $('.hash .accordion-toggle').each(function(){
       if($(this).attr('href') === hash) {
       		$(this).trigger('click');
       }
   });
 })

  $(window).hashchange();

  $("#slider4").responsiveSlides({
   auto: true,
   pager: true,
   nav: true,
   speed: 500,
   namespace: "callbacks",
   before: function () {
	   $('.events').append("<li>before event fired.</li>");
   },
   after: function () {
	   $('.events').append("<li>after event fired.</li>");
   }
});	
//change bgcolor
    var x = $(location).attr('pathname');
    if (x.indexOf("/energizer-ultimate-lithium-batteries") >= 0) {
		$('body').removeClass("background-red");		
		$('body').addClass("background-blue");
		$('div[class="hash accordion-container"]').addClass('lithium-accordion');

    }
    if ((x.indexOf("/battery-chargers") >= 0) || (x.indexOf("/energizer-rechargeable-batteries") >= 0)){
		$('body').removeClass("background-red");		
		$('body').addClass("background-green");
    }
    if ((x.indexOf("/eco-advanced-batteries") >= 0) || (x.indexOf("/ecoadvanced") >= 0) || (x.indexOf("/eco-advanced-battery-coupon") >= 0)){
		$('body').removeClass("background-red");		
		$('body').addClass("background-eco");
    }
/*    if (x.indexOf("/ecoadvanced") >= 0){
		$( ".main-container" ).append().wrap( "<div class='eco-advanced-container'></div>" );
    }
	*/
    if (x.indexOf("/energizer-advanced-lithium-batteries") >= 0) {
		$('body').removeClass("background-red");		
		$('body').addClass("background-yellow");
    }

	$( "p:empty" ).remove();
	$('ul[class="sshContent"]').removeClass('sshContent').addClass('pagehead-social');
	$('li[class="sshListItem"]').removeClass('sshListItem');
	$('a[ title="Share on Facebook" ]').removeClass('sshListItem').addClass('facebook');
	$('span[class="sshIcon sshShareOnFacebook fa icon-header fa-facebook btf"]').removeClass('sshIcon sshShareOnFacebook ');//.addClass('fa icon-header fa-facebook');
	$('a[ title="Tweet this" ]').removeClass('sshListItem').addClass('twitter');
	$('span[class="sshIcon sshShareOnTwitter fa icon-header fa-twitter btt"]').removeClass('sshIcon sshShareOnTwitter ');//.addClass('fa icon-header fa-twitter');
	$('a[ title="Share on LinkedIn" ]').removeClass('sshListItem').addClass('linkedin');
	$('span[class="sshIcon sshLinkedIn "]').removeClass('sshIcon sshShareOnTwitter ').addClass('fa icon-header fa-linkedin');
    $('a[ title="Share on GoogleBookmarks" ]').removeClass('sshListItem').addClass('google-plus');
    $('span[class="sshIcon sshGoogleBookmarks fa icon-header fa-google-plus btg"]').removeClass('sshIcon sshGoogleBookmarks ');//.addClass('fa icon-header fa-google-plus');	
	$('div[class="RadSocialShare RadSocialShare_Default"]').removeClass('RadSocialShare RadSocialShare_Default');

    $('.sfsearchSubmit').removeClass('sfsearchSubmit').addClass('search-btn');
	$('input[value="Search"]').attr({"value":""});
        var input = $('.sfsearchTxt')[0];
        input.value = 'Search';
        $(input).focus(function () {
            var input = $(this);
            if (input.val() == 'Search') {
                input.val('');
            }
        });
        $(input).blur(function () {
            var input = $(this);
            if (input.val() == '') {
                input.val('Search');
            }
        });


});

