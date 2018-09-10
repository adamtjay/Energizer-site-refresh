// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
$(document).ready(function(){
  $('.bxslider').bxSlider();
  $('.nav-contain').meanmenu({
    removeElements: ".power-last ul:nth-of-type(2), .bunny",
  });

    // If slider is on page, enable lightSlider
    if ($('.slideshow-list').length ) {
      $('.slider-parts').lightSlider({
            item: 1,
            enableTouch:true,
            swipeThreshold: 40,
            adaptiveHeight:true,
            controls: 0
      });
      $('.slider-powering').lightSlider({
            item: 1,
            enableTouch:true,
            swipeThreshold: 40,
        adaptiveHeight:true,
            controls: 0
      });
    };

    if ($('#promo-slide').length ) {
        $('#promo-slide').lightSlider({
                item: 2,
                slideMove: 2,
                enableTouch:true,
                swipeThreshold: 40,
                adaptiveHeight:true,
                controls: 1,
                pager: false,
                auto: true,
                speed: 1600,
                loop: true,
                pause: 3000,
                responsive : [
                {
                    breakpoint:720,
                    settings: {
                        item:1,
                        adaptiveHeight: true
                      }
                }
                ]
        });

    };
    if ( $('.filtered-products-filter').length ) {
        $('.filtered-products-container').mixItUp({
            controls: {
                enable: false,
                toggleLogic: 'and',
                toggleFilterButtons: true
            }
        });
        $('body').trigger('initialMix');
    };
/* SPECIAL BATTERY FINDER */
$('.brand-product ul li a').click(function(){
    $(this)
	.parent().addClass('active')
    .siblings().removeClass('active');
	
	$(".special-product").css("display","none");
	var href = $(this).attr('href');
	$(href).show();
})
$('.mix a').click(function(){
    $(this)
	.parent().addClass('active')
    .siblings().removeClass('active');
	
	$(".special-product").css("display","none");
	var href = $(this).attr('href');
	$(href).show();
})

$('.brand-product ul li').not('.brand-product ul li a').click(function(){
//    $(this).children().removeClass('active');
})

if($('.all-list').length){
    specialtyItem = $('.all-list .mix');
    $.each(specialtyItem, function(){
        if($(this).hasClass('no-results')){
            return;
        }
        firstLetter = $(this).find('a').html().charAt(0);
        $(this).addClass('first-' + firstLetter);
    })
    $('.letter').click(function(){
        var filter = $(this).attr('data-filter');
        filter = filter.replace('first-', '');
        if(!$('.first-'+filter).length){
            $('.all-list').removeClass().addClass('all-list no-results');
        } else {
            $('.all-list').removeClass().addClass('all-list show-' + filter);
        }
    })
}	
/* END SPECIAL BATTERY FINDER */
});

    $(document).ready(function(){

    // Find filter buttons
    var $filters = $('.filter-area').find('li.filter:not(.disabled)');

    // Find reset button
    var $reset = $('a.filter[data-filter="all"]');

    // Bind reset logic to reset button click
    $reset.on('click', function(){
        $filters.removeClass('active');
        $('.filtered-products-container').mixItUp('filter', 'all');
    });

    // Bind sorting logic to all filter buttons
    $filters.on('click', function () {
        var $t = $(this),
        filter = $t.attr('data-filter');
        if($('p#relevantMatch').length){
            $('p#relevantMatch').hide();
        }


        // Find active filter
        $current = $('.filter-area').find('li.filter.active');
        // Ff more than one active filter is returned in 'current' object
        if($current.length >= 1){
            // If the clicked filter is an active filter
            if($t.hasClass('active')){
                // Create a new filter string excluding the active filter
                var newFilterString = $current.map(function(){
                  return $(this).not($t).attr('data-filter');
                }).get().join('');
                // Filter the container based on the new string
                if(newFilterString != ''){
                $('.filtered-products-container').mixItUp('filter', newFilterString);
            } else {
                $('.filtered-products-container').mixItUp('filter', 'all');
            }
                // Remove active class
                $t.removeClass('active');
            } else {
                // Since clicked filter is not active, add it to new filter string
                var newFilterString = $current.map(function(){
                  return $(this).not($t.siblings()).attr('data-filter');
                }).get().join('');
                newFilterString = newFilterString + filter;
                // Mix the container with the new filter string
                $('.filtered-products-container').mixItUp('filter', newFilterString);
                
                // Remove active class from any siblings and add it to clicked filter
                $t.addClass('active').siblings().removeClass('active');
            }

        } else {
            // Since only one filter is active, check if clicked filter is active
            if ($t.hasClass('active')) {
                // Remove active class from current filter
                $t.removeClass('active');
                // Reset filter to all
                $('.filtered-products-container').mixItUp('filter', 'all');
                return;
             } else {
                $t.addClass('active').siblings().removeClass('active');
                $('.filtered-products-container').mixItUp('filter', filter);
             }

        }



         });





    });

    $('.filter').each(function(e) {
        var filter_class = $(this).attr('data-filter');
        var filter_count = $(filter_class).length;
        if ( (filter_count == 0) && (filter_class !== 'all') ) {
            $(this).css('opacity', 0.5);
            $(this).css('cursor', 'default');
            $(this).addClass('disabled');
            $(filter_class).unbind( "click" );
        };
    });


        function getQueryVariable(variable)
        {
               var query = window.location.search.substring(1);
               var vars = query.split("&");
               for (var i=0;i<vars.length;i++) {
                       var pair = vars[i].split("=");
                       if(pair[0] == variable){return pair[1];}
               }
               return(false);
        }

        function getQueryVars()
        {
               var query = window.location.search.substring(1);
               var vars = query.split("&");
               var returnedVars = [];
               for (var i=0;i<vars.length;i++) {
                  var pair = vars[i].split("=");
                  returnedVars.push(pair[0]);
               }
               return returnedVars;
        }

			if($(location).attr('pathname').indexOf("/lighting-finder") >= 0)
			{
        var urlInputs = getQueryVars();
        var matchedClass = '';
        $.each(urlInputs, function(i, val){
            if( val != '' ) {
                matchedClass = matchedClass + '.' + val + '-' + getQueryVariable(val);
            }
        })
//		alert(matchedClass);
        matchedClass = matchedClass.replace('use', 'type');
        matchedClass = matchedClass.replace('diy', 'DIY');
        matchedClass = matchedClass.replace('energizerweatheready', 'weatheready');
        matchedClass = matchedClass.replace('energizerhardcase', 'hardcase');
        matchedClass = matchedClass.replace('energizerlightfusiontech', 'lightfusion');
        matchedClass = matchedClass.replace('energizerintrinsicallysafe', 'intrinsicallysafe');
//        matchedClass = matchedClass.replace('disney', 'disney');
		
//		alert(matchedClass);
        var inputs = urlInputs.length;
		//alert(inputs);
        if( matchedClass == '' ) {
            var matches = 0;
        } else {
            var matches = $('.filtered-products-container').find('.mix' + matchedClass).length;
        }
//alert(matchedClass);
        if(matches < 1){
            // No exact match
            $('.filtered-products-container').prepend('<p id="relevantMatch" style="width: 100%; padding: 10px; box-sizing: border-box; background: #ddd; color: #333; font-size: 15px; ">Your search returned 0 results. Please try again using the options on the left.</h1>');
				if( matchedClass != ''  )
				{
				$('body').on('initialMix', function(){
				$('.filtered-products-container').mixItUp('filter', matchedClass);
				});
			}

        } else {
            $('body').on('initialMix', function(){
                $('.filtered-products-container').mixItUp('filter', matchedClass);
            });
            var filtersMatch = matchedClass.split(".");
            for (var i=0;i<filtersMatch.length;i++) {
                if(filtersMatch[i] != ''){
                    $('.filter[data-filter=".' + filtersMatch[i] + '"]').addClass('active');
                }
            }
        }
		//When going to page with out search.
		if(matchedClass ==".-undefined"){
			$("p").filter(":contains('returned')").remove()
		}
			}
    // Initial values for each input option
    var initialSearchInput = $('.lighting-search input').val(),
        initialType        = $('#dd-type span').text(),
        initialUse         = $('#dd-use span').text(),
        initialBrand       = $('#dd-brand span').text();

        initialType = initialType.replace(' ', '').toLowerCase();

        initialUse = initialUse.replace(' ', '').toLowerCase();

        initialBrand = initialBrand.replace(' ', '').toLowerCase();


    $('a.lighting-search-submit').on('click', function(){

        // Grab value of input options on click
        var searchInput = $('.lighting-search input').val(),
            type        = $('#dd-type span').text(),
            use         = $('#dd-use span').text(),
            brand       = $('#dd-brand span').text(),
            urlString;

            // Convert format to match class names of mixitup filters
            type = type.replace(' ', '').toLowerCase();
            use = use.replace(' ', '').toLowerCase();
            brand = brand.replace(/ /g, '').toLowerCase();
            brand = brand.replace('.', '').toLowerCase();
            brand = brand.replace('Â®', '').toLowerCase();

        // No search value given, deliver error
			if( type == initialType && use == initialUse && brand == initialBrand && searchInput == initialSearchInput ) {
				if(!$('.lighting-finder h3 span').length){
					$('.lighting-finder h3').append('<span style="font-size: 12px; color: red; padding-left: 5px;">Please select an option or type a search</span>');
				}
				return;
			}

        // User searched for something, ignore other fields
        if(searchInput != initialSearchInput){
            urlString = '?search=' + searchInput;
        } else { 
            urlString = '?';

            if( type != initialType ){
                urlString = urlString + 'type=' + type;
            }

            if( use != initialUse && urlString !== '?' ) {
                urlString = urlString + '&use=' + use;
            } else if( urlString == '?' && use != initialUse) {
                urlString = urlString + 'use=' + use;
            }

            if( brand != initialBrand && urlString !== '?' ) {
                urlString = urlString + '&brand=' + brand;
            } else if( urlString == '?' && brand != initialBrand ) {
                urlString = urlString + 'brand=' + brand;
            }

        }

        window.location.href = "/lighting-finder" + urlString;


    });



/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}(document.documentMode != undefined)&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);