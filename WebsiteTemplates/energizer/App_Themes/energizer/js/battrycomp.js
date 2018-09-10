$(document).ready(function(){
	    var x = $(location).attr('pathname');

	if(x.indexOf('/batteries/battery-comparison-chart') >=0)
	{
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
            /** THIS SECTION WAS UPDATED **/
            var offset = 150 + $('.main-header').outerHeight();
            if( $('.main-header').hasClass('fixed') ) {
                return offset;
            } else {
                return 150;
            }
            /** END UPDATE **/
          }
        });

        /** THIS SECTION WAS ADDED **/
        setTimeout(function(){
            Waypoint.refreshAll();
        }, 1000);
	}   
    });