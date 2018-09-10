     function CheckValid()
      {
		var searched = $('.search input[type="text"]').val().toLowerCase();
		if(searched == '' || searched == 'search'){
			$('.search input[type="text"]').addClass('searchError');
			return false;
          } else {
			 return true;
          }
      }
	  
$(document).ready(function() {
	// Expandable Footer Menu show / hide functionality
	$('.accordion').click( function() {
		$(this).toggleClass('active');

	});	
	$('.update-video').click(function(e){
		e.preventDefault();
		var id = $(this).attr('data-videoID');
		$('.eco-intro .section-graphic iframe').attr({'src': 'https://www.youtube.com/embed/' + id +'?rel=0&enablejsapi=1', 'data-videoID': id});
	 });
	//Site-wide Accordions
	$('.accordion-container').find('.accordion-toggle').click(function(){
		// Do nothing when active section is clicked,
		if ($(this).hasClass('active')) {
//			$(this).next().children(".gabox").append("<div id='afshcontainer'></div>");
		} else {
			// If $(this) is not active, remove all active classes.
			$('.accordion-toggle').removeClass('active');
			$( "div" ).remove( "#afshcontainer" );
			$("select").val("NA");
			$(this).next().find('select option:nth-child(2)').attr("selected", "selected").change();
//       		console.log('Class Removed me');
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
				if(obj.dd.selector =='#dd-spbattries')
				{
					$(".special-product").css("display","none");
					var href = $(opt.html()).attr('href');
					$(href).show();
					$("#btnsearch").show();
					$("body, html").animate({ scrollTop: $(href).offset().top }, 100);

					}
				if(obj.dd.selector =='#dd-spnav')
				{
					var href = $(opt.html()).attr('href');
					$( location ).attr("href", href);
				}

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
		var dd = new DropDown( $('#dd-spbattries') );
		$(document).click(function() {
			// all dropdowns
			$('.wrapper-dropdown-3').removeClass('active');
		});
		var dd = new DropDown( $('#dd-spnav') );
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
    $(window).bind('scroll', function() { //Fixed Navigation
 		var navHeight = 64;
           if ($(window).scrollTop() > navHeight && $(window).width() > 1024) {
               $('.main-header').addClass('fixed');
               $('body').css('padding-top','64px');
           }
           else {
               $('.main-header').removeClass('fixed');
               $('body').css('padding-top','0px');
           }
  	});
// Bind an event to window.onhashchange that, when the hash changes, gets the
 // hash and adds the class "selected" to any matching nav link.
 $(window).hashchange( function(){
   if(location.hash == ''){

   		var hash = $('.hash').find('a.accordion-toggle').slice(0,1).attr('href');
//  console.log(hash);
   } else {

   	var hash = location.hash;
   }
   // Iterate over all nav links, setting the "selected" class as-appropriate.
   $('.hash .accordion-toggle').each(function(){
       if($(this).attr('href') === hash) {

       		$(this).trigger('click');
			PriceSpider.rebind();
       		
       		return false;
       }
   });
 })
//  $(window).hashchange();

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

    if ((x.indexOf("/flashlights-lighting") >= 0) || (x.indexOf("/everyday-flashlights") >= 0)) 
	{
		$('.filtered-products-container').mixItUp('sort', 'myorder:asc' );
	}
	else if (x.indexOf("/hands-free-lighting") >= 0)
	{
		$('.filtered-products-container').mixItUp('sort', 'handsfreeorder:asc defaultorder:asc' );
	}
	else if (x.indexOf("/emergency-lighting") >= 0)
	{
		$('.filtered-products-container').mixItUp('sort', 'preorder:asc' );
	}
	else if (x.indexOf("/outdoor-lighting") >= 0)
	{
		$('.filtered-products-container').mixItUp('sort', 'outorder:asc' );
	}
	else if (x.indexOf("/do-it-yourself") >= 0)
	{
		$('.filtered-products-container').mixItUp('sort', 'diyorder:asc' );
	}
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
    if (x.indexOf("/buybatteries") >= 0){
		$( ".main-container" ).addClass("contact-container -buy-now");
    }
    if (x.indexOf("/energizer-advanced-lithium-batteries") >= 0) {
		$('body').removeClass("background-red");		
		$('body').addClass("background-yellow");
    }
/*    if (x.indexOf("/search-results") >= 0) {
		$(".sfsearchResultHighLighter").each(function() {
		$('.sfsearchResultHighLighter').html().replaceWith('&lt;','<').replace('&gt;', '>');
		});
			
    }*/
    if (x.indexOf("/hearing-aid-batteries") >= 0) {
	$('.page-meta').addClass("hearing-aids-meta");
	}
/*    if (x.indexOf("/lighting") >= 0) {
	$('.main-container').addClass("lighting-landing");
	}
	*/
	$('iframe[src*="youtube.com"]').each(function() {
		$(this).wrap("<div class='videowrapper' />");
	});
	
    if (x.indexOf("/batteries/battery-comparison-chart") >= 0) {
		$('.ultimate-learn').on('click',function(e){
			e.preventDefault();
			$('#ultimate-uthium').addClass('open');
		});

		$('.max-learn').on('click',function(e){
			e.preventDefault();
			$('#max').addClass('open');
		});

		$('.universal-learn').on('click',function(e){
			e.preventDefault();
			$('#recharge-universal').addClass('open');
		});

		$('.power-learn').on('click',function(e){
			e.preventDefault();
			$('#recharge-power').addClass('open');
		});

		$('.close').on('click',function(e){
			$('.lightbox').removeClass('open');
		});
	}

    if (x.indexOf("/batteries/energizer-ultimate-lithium-batteries") >= 0) {
		$('.video-modal-1').on('click',function(e){
			e.preventDefault();
			$('#video-modal-1').addClass('open');
		});

		$('.video-modal-2').on('click',function(e){
			e.preventDefault();
			$('#video-modal-2').addClass('open');
		});

		$('.video-modal-3').on('click',function(e){
			e.preventDefault();
			$('#video-modal-3').addClass('open');
		});

		$('.video-modal-4').on('click',function(e){
			e.preventDefault();
			$('#video-modal-4').addClass('open');
		});

		$('.video-modal-5').on('click',function(e){
			e.preventDefault();
			$('#video-modal-5').addClass('open');
		});
		
		$('.modal-close').on('click',function(e){
			var vid = document.getElementById("vid1");
				vid.pause();
			var vid2 = document.getElementById("vid2");
				vid2.pause();
			var vid3 = document.getElementById("vid3");
				vid3.pause();
			var vid4 = document.getElementById("vid4");
				vid4.pause();
			var vid5 = document.getElementById("vid5");
				vid5.pause();
			$('.video-modal').removeClass('open');
		});
	}
	
	
	$( "p:empty" ).remove();
	$('ul[class="sshContent"]').removeClass('sshContent').addClass('pagehead-social');
	$('li[class="sshListItem"]').removeClass('sshListItem');
	$('a[ title="Share on Facebook" ]').removeClass('sshListItem').addClass('button-fb facebook');
	$('span[class="sshIcon sshShareOnFacebook fa icon-header fa-facebook btf"]').removeClass('sshIcon sshShareOnFacebook ');//.addClass('fa icon-header fa-facebook');
	$('a[ title="Tweet this" ]').removeClass('sshListItem').addClass('twitter');
	$('span[class="sshIcon sshShareOnTwitter fa icon-header fa-twitter btt"]').removeClass('sshIcon sshShareOnTwitter ');//.addClass('fa icon-header fa-twitter');
	$('a[ title="Share on LinkedIn" ]').removeClass('sshListItem').addClass('linkedin');
	$('span[class="sshIcon sshLinkedIn "]').removeClass('sshIcon sshShareOnTwitter ').addClass('fa icon-header fa-linkedin');
    $('a[ title="Share on GoogleBookmarks" ]').removeClass('sshListItem').addClass('google-plus');
    $('span[class="sshIcon sshGoogleBookmarks fa icon-header fa-google-plus btg"]').removeClass('sshIcon sshGoogleBookmarks ');//.addClass('fa icon-header fa-google-plus');	
	$('div[class="RadSocialShare RadSocialShare_Default"]').removeClass('RadSocialShare RadSocialShare_Default');

    $('.sfsearchSubmit').removeClass('sfsearchSubmit').addClass('search-btn');
	
		  $(window).hashchange();
	$('input[value="Search"]').attr({"value":""});
/*        var input = $('.sfsearchTxt')[0];
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
 */
 	$('.search .search-btn').on('click', function(e){
		var searched = $('.search input[type="text"]').val();
		if(searched == '' || searched == 'Search'){
			e.preventDefault();
			$('.search input[type="text"]').addClass('searchError');
		}
	})
 });
	var mylist = $('#batteylist');
	var listitems = mylist.children('li').get();
	listitems.sort(function(a, b) {
	return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
	})
	$.each(listitems, function(idx, itm) { mylist.append(itm); });

	var mylist = $('.all-list');
	var listitems = mylist.children('div').get();
	listitems.sort(function(a, b) {
	return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
	})
	$.each(listitems, function(idx, itm) { mylist.append(itm); });
//Remove duplicate items
	var seen = {};
	$('.mix').each(function() {
		var txt = $(this).text();
		if (seen[txt])
			$(this).remove();
		else
			seen[txt] = true;
	});	
	jQuery('.brand-product li a').click(function(){
		   $('html,body').animate({
			 scrollTop: $('.page-title').offset().top
		   }, 0);
	return false;
	})
// attach id's on promotional content
$( document ).ready(function() {

    var x = $(location).attr('pathname');
//for batter comparison-chart
    if (x.indexOf("/batteries/battery-comparison-chart") >= 0){
       var cells = $('thead th');
        function setCellWidth(cells) {
            cells.each(function(index, el) {
                var theWidth = $('.responsive tbody > tr:first-of-type > td');
                theWidth = $(theWidth[index]).outerWidth();
                $(el).css('width', theWidth);
            });
        }
        $(window).on('resize', function(e){
            setCellWidth(cells);
            Waypoint.refreshAll();
        });
        setCellWidth(cells);
        var sticky = new Waypoint.Sticky({
              element: $('table.responsive-head')[0],
              handler: function(){
                setCellWidth(cells);
                if( ! $('.main-header').hasClass('fixed') ) {
                    $('.responsive-head').css('top', 150);
                }
              },
          offset: function(){
            var offset = 150 + $('.main-header').outerHeight();
            if( $('.main-header').hasClass('fixed') ) {
                return offset;
            } else {
                return 150;
            }
          }
        });

        setTimeout(function(){
            Waypoint.refreshAll();
        }, 1000);
}
 	// hearing aid page tweaks
//	if($('.page-title:contains("Hearing Aid")').length > 0){
    if (x.indexOf("/hearing-aid-batteries") >= 0){

          	// fixing social buttons
/*
  		$('.btf').replaceWith('<img src="/images/default-source/hearing-aid/facebook.png?Status=Master&amp;sfvrsn=2" height="70%" width="35%" style="position: relative; top: -12%;">');
  		$('.btt').replaceWith('<img src="/images/default-source/hearing-aid/twitter.png?Status=Master&amp;sfvrsn=2" height="60%" width="45%" style="position: relative;top: -15%;">');
  		$('.btg').replaceWith('<img src="/images/default-source/hearing-aid/googleplus.png?Status=Master&amp;sfvrsn=2" height="70%" width="45%" style="position: relative;top: -13%;">');
*/  		
        	// moving where the "type size" buttons go
        	$('.product-family-image').before('<p class="font-size"> <span> <a href="#!" id="decreaseFontSize">Smaller</a> </span> <span>Type Size</span> <span> <a href="#!" id="increaseFontSize">Larger</a> </span> </p>');
          	
          	// adjusting position of the "type size" buttons further
          	$('p:contains("Type Size")').css("margin-top","0%");
          
          	if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
			//alert('Its Safari');
                  	$('p:contains("Type Size")').css("margin-bottom","3%");
		}
	}
  
	// right sidebar promos in 1/4 column layout
/*	$(".col_1_4 a[href='/promotions/rechargeable-battery-coupons']").attr("id","sidebar-promo-recharge");
	$(".col_1_4 a[href='/ecoadvanced']").attr("id","sidebar-promo-eco");
	$(".col_1_4 a[href='/about-batteries/no-leaks-guarantee']").attr("id","sidebar-promo-noleaks");
	$(".col_1_4 a[href='https://www.facebook.com/Energizer']").attr("id","sidebar-promo-facebook");
	$(".col_1_4 a[href='/lighting-finder']").attr("id","sidebar-promo-lightingfinder");
	$(".col_1_4 a[href='/batteries/energizer-ultimate-lithium-batteries']").attr("id","sidebar-promo-lithiumultimate");
	$(".col_1_4 a[href='/batteries/energizer-rechargeable-batteries']").attr("id","sidebar-promo-rechargepowerplus");
	$(".col_1_4 a[href='/batteries/energizer-rechargeable-batteries ']").attr("id","sidebar-promo-rechargepowerplus");
	$(".col_1_4 a[href='/battery-chargers/nimh-pro-charger']").attr("id","sidebar-promo-rechargepro");
	$(".col_1_4 a[href='/specialty-battery-finder']").attr("id","sidebar-promo-batteryfinder");
*/
	// right sidebar promos in 1/3 column layout
/*	$(".col_1_3 a[href='/promotions/rechargeable-battery-coupons']").attr("id","sidebar-promo-recharge");
	$(".col_1_3 a[href='http://www.earth911.com/recycling-guide/how-to-recycle-single-use-batteries/']").attr("id","sidebar-promo-earth911");
	$(".col_1_3 a[href='/ecoadvanced']").attr("id","sidebar-promo-eco");
	$(".col_1_3 a[href='/about-batteries/no-leaks-guarantee']").attr("id","sidebar-promo-noleaks");
	$(".col_1_3 a[href='https://www.facebook.com/Energizer']").attr("id","sidebar-promo-facebook");
	$(".col_1_3 a[href='/lighting-finder']").attr("id","sidebar-promo-lightingfinder");
	$(".col_1_3 a[href='/batteries/specialty-batteries/lithium-photo-batteries']").attr("id","sidebar-promo-lithiumphoto");
	$(".col_1_3 a[href='/batteries/energizer-ultimate-lithium-batteries']").attr("id","sidebar-promo-lithiumultimate");
	$(".col_1_3 a[href='/batteries/energizer-rechargeable-batteries']").attr("id","sidebar-promo-rechargepowerplus");
	$(".col_1_3 a[href='/batteries/energizer-rechargeable-batteries ']").attr("id","sidebar-promo-rechargepowerplus");
	$(".col_1_3 a[href='/battery-chargers/nimh-pro-charger']").attr("id","sidebar-promo-rechargepro");
	$(".col_1_3 a[href='/specialty-battery-finder']").attr("id","sidebar-promo-batteryfinder");
*/
	// sidebar promos in other layouts
	$(".sf_colsOut a[href='/specialty-battery-finder']").attr("id","sidebar-promo-batteryfinder");
	$(".how-batteries-works-container a[href='/promotions/rechargeable-battery-coupons']").attr("id","banner-coupon-procharger-recharge");
	
	// promos on /responsibility page
	$(".sfContentBlock a[href='http://www.earth911.com/recycling-guide/how-to-recycle-single-use-batteries/']").attr("id","inline-earth911");
	$(".sfContentBlock a[href='/responsibility/coin-lithium-battery-safety']").attr("id","inline-lithium-battery-safety");
	$(".sfContentBlock a[href='/responsibility/preparedness']").attr("id","inline-preparedness");
	$(".sfContentBlock a[href='/responsibility/change-your-clock-change-your-battery']").attr("id","inline-change-clock-battery");

	// promos on homepage
/*	$(".col_1_2 a[href='/promotions/vision-headlight-coupons']").attr("id","carousel-vision-headlight-coupons");
	$(".col_1_2 a[href='/promotions/rechargeable-coupons']").attr("id","carousel-rechargable-coupons");
	$(".col_1_2 a[href='/about-batteries/no-leaks-guarantee']").attr("id","carousel-no-leaks-guarantee");
	$(".col_1_2 a[href='/responsibility']").attr("id","carousel-responsibility");
	$(".col_1_2 a[href='/energizer-bunny']").attr("id","carousel-energizer-bunny");
*/
	// promos on /ecoadvanced
	$(".full-width-wrap a[href='http://www.earth911.com/recycling-guide/how-to-recycle-single-use-batteries/']").attr("id","banner-earth911");
	$(".full-width-wrap a[href='/responsibility']").attr("id","banner-responsibility");
	$(".full-width-wrap a[href='/media']").attr("id","banner-media");

	// promo on /no-leaks-guarantee
	$(".ps-split a[href='/about-batteries/battery-leakage']").attr("id","banner-battery-leakage");
	
	// promos on /coin-lithium-battery-safety
	$(".sfContentBlock a[href='/docs/default-source/pdf/coin_lithium_battery_safety_infographic.pdf?sfvrsn=2']").attr("id","sidebar-lithium-battery-safety");
	$(".sfImageWrapper a[href='http://ow.ly/ujIdP']").attr("id","promo-coin-lithium-battery-safety");
	$(".sfImageWrapper a[href='http://thebatterycontrolled.com/']").attr("id","promo-the-battery-controlled");

	// promos in sub navigation
	$(".promo-subnav a[href='/promotions/fathers-day-headlights-coupon']").attr("id","subnav-vision-headlight-coupons");
	$(".promo-subnav a[href='/promotions/rechargeable-battery-coupons']").attr("id","subnav-rechargable-coupons");
	$(".promo-subnav a[href='/promotions/scholastic-scratch-win']").attr("id","subnav-scratch-win");
	$(".promo-subnav a[href='/promotions/back-to-school-rewards']").attr("id","subnav-school-rewards");
	$(".promo-subnav a[href='http://www.earth911.com/recycling-guide/how-to-recycle-single-use-batteries/']").attr("id","subnav-earth911");
	$(".promo-subnav a[href='/responsibility/coin-lithium-battery-safety']").attr("id","subnav-lithium-battery-safety");
	$(".promo-subnav a[href='/responsibility/preparedness']").attr("id","subnav-preparedness");
	$(".promo-subnav a[href='/responsibility/change-your-clock-change-your-battery']").attr("id","subnav-change-clock-battery");

	// promos on /promotions
	$(".sf_colsIn a[href='/promotions/vision-headlight-coupons']").attr("id","promotions-vision-headlight-coupon-hero");
	$(".cstm-mediathumbs a[href='/promotions/vision-headlight-coupons']").attr("id","promotions-vision-headlight-mediathumbs");
	$(".cstm-mediathumbs a[href='/promotions/rechargeable-battery-coupon']").attr("id","promotions-rechargecoupon-mediathumbs");
	$(".cstm-mediathumbs a[href='http://energizerinstantwin.com/index.php']").attr("id","promotions-scratchwin-mediathumbs");
	$(".cstm-mediathumbs a[href='/promotions/back-to-school-rewards']").attr("id","promotions-backtoschoolbucks-mediathumbs");

	// social media id attributes
	$("li.socialTop").attr("id","social-top-button");
//alert(window.location.href.search("[?&]") == -1);
	if (window.location.href.search("[?&]") == -1)
	{
		var _href =  $('#subnav-echoadvanced').attr('href');
		$('#subnav-echoadvanced').attr('href',  _href + '?utm_source=dropdownpromobannerk&amp;utm_medium=website&amp;utm_campaign=ecoadvanced');  
		_href =  $('.promo-echoadvanced').attr('href');
		$('.promo-echoadvanced').attr('href',  _href + '?utm_source=promotionpagepromobanner&amp;utm_medium=website&amp;utm_campaign=ecoadvanced');  
	}
	else
	{
		var _href =  $('#subnav-echoadvanced').attr('href');
		$('#subnav-echoadvanced').attr('href');//,  _href + '?utm_source=dropdownpromobannerk&amp;utm_medium=website&amp;utm_campaign=ecoadvanced');  
		_href =  $('.promo-echoadvanced').attr('href');
		$('.promo-echoadvanced').attr('href');//,  _href + '?utm_source=promotionpagepromobanner&amp;utm_medium=website&amp;utm_campaign=ecoadvanced');  		
	}
	
	var oldlink =[];
//	console.log("I am here")
	$(".main-nav a").each(function(i) {
	var link = $(this).attr('href');
	link = link.substr(link.lastIndexOf('/')+1);
//	console.log(oldlink);
//	console.log(link);
//	console.log($.inArray(link, oldlink));
//	console.log(oldlink.length);
	//console.log($.inArray(10,oldlink.link));
	if ($.inArray(link, oldlink) >= 0) {
		link = link + (i+1);
	}
     $(this).addClass('primarynav-'+link);
	 oldlink.insert = ({"link":link});
	 
    });
$(".footer-menu-container a").each(function(i) {
	var linkf = $(this).attr('href');
	linkf = linkf.substr(linkf.lastIndexOf('/')+1);
     $(this).addClass('bottomnav-'+linkf);
    });	

	// Font-size adjustment feature
	$('.font-size a').on('click', function(){
		if(!$('.main-container[data-font-size]').length){
			var size =$('.main-container').css('font-size');
		} else {
			var size = $('.main-container').attr('data-font-size');
		}
		size = parseInt(size);
		if($(this).attr('id') == 'decreaseFontSize'){
			size = size - 2;
		} else {
			size = size + 2;
		}
		size = size + 'px';
		if($('#font-change').length){
			$('#font-change').empty();
			$('#font-change').append(
				".main-container p, .accordion-container ul, pagehead-social ul:not(:first-child), .accordion-toggle, .family-info .family-meta span{"+
				"font-size:" + size + ";"+
				"}"
				);
		} else {
			$('body').append(
				"<style id='font-change'>"+
				".main-container p, .accordion-container ul, pagehead-social ul:not(:first-child), .accordion-toggle, .family-info .family-meta span{"+
				"font-size:" + size + ";"+
				"}"+
				"</style>"
			);
		}
		$('.main-container').attr('data-font-size', size);
	});
		
		//End Font-size adjustment feature
	
	    $('#Container').mixItUp();

		$(".popupimage").each(function(){
		   $(this).fancybox({
			   href : $(this).attr('data-fancybox-href'),
			   autoScale : false
		   });
		});		
$(".sfsearchResultHighLighter:contains('&lt;')").html(function(i, text) {
    return text.replace(/&lt;/g, '<');
});
$(".sfsearchResultHighLighter:contains('&gt;')").html(function(i, text) {
    return text.replace(/&gt;/g, '>');
});
});