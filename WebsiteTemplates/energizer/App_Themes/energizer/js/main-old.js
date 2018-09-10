$(document).ready(function() {
	// Expandable Footer Menu show / hide functionality
	$('.accordion').click( function() {
		$(this).toggleClass('active');
	});

	//Site-wide Accordions
	$('.accordion-container').find('.accordion-toggle').click(function(){
		// Do nothing when active section is clicked,
		if ($(this).hasClass('active')) {

		} else {
			// If $(this) is not active, remove all active classes.
			$('.accordion-toggle').removeClass('active');

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
    }
    if ((x.indexOf("/battery-chargers") >= 0) || (x.indexOf("/energizer-rechargeable-batteries") >= 0)){
		$('body').removeClass("background-red");		
		$('body').addClass("background-green");
    }
    if (x.indexOf("/energizer-advanced-lithium-batteries") >= 0) {
		$('body').removeClass("background-red");		
		$('body').addClass("background-yellow");
    }

	$('ul[class="sshContent"]').removeClass('sshContent').addClass('pagehead-social');
	$('li[class="sshListItem"]').removeClass('sshListItem');
	$('a[ title="Share on Facebook" ]').removeClass('sshListItem').addClass('facebook');
	$('span[class="sshIcon sshShareOnFacebook "]').removeClass('sshIcon sshShareOnFacebook ').addClass('fa icon-header fa-facebook');
	$('a[ title="Tweet this" ]').removeClass('sshListItem').addClass('twitter');
	$('span[class="sshIcon sshShareOnTwitter "]').removeClass('sshIcon sshShareOnTwitter ').addClass('fa icon-header fa-twitter');
	$('a[ title="Share on LinkedIn" ]').removeClass('sshListItem').addClass('linkedin');
	$('span[class="sshIcon sshLinkedIn "]').removeClass('sshIcon sshShareOnTwitter ').addClass('fa icon-header fa-linkedin');
	$('div[class="RadSocialShare RadSocialShare_Default"]').removeClass('RadSocialShare RadSocialShare_Default');
	
});
