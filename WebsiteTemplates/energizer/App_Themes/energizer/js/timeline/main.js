// Main Timeline Object
// --------------------------------------------------

var timeline = (function() {

    var appNamespace = 'timeline',
        appNamespaceSelector = '.' + appNamespace;

    // Cache ui selectors
    var ui = {
        app: appNamespaceSelector,
        img: appNamespaceSelector + ' img',
        intro: appNamespaceSelector + ' .intro',
        introWrap: appNamespaceSelector + ' .intro .wrap',
        introExplore: appNamespaceSelector + ' .intro .explore',
        navBar: appNamespaceSelector + ' .nav .top',
        scrollTo: appNamespaceSelector + ' .js-scrollto',
        contentDay: appNamespaceSelector + ' .content.day',
        milestones: appNamespaceSelector + ' .milestone[id]',
        percentage: appNamespaceSelector + ' .percentage',
        loaderBar: appNamespaceSelector + ' .loader-bar',
        scrollContainer: appNamespaceSelector + ' .scroll-container',
        bunnySequence: appNamespaceSelector + ' .sequence'
    };

    return {

        init: function(opts) {

            var self = this;
            this.opts = opts;

            this.initBunnySequence( opts.skrollr );

            // To skroll or not to skroll
            // ...that is the question
            if (opts.skrollr) {
                this.skr = skrollr.init({
                    forceHeight: false
                });
            }

            this.bindUIEvents();

            this.setIntroHeight();
            this.initLoadingIndicator();
            this.handleWaypoints();

            $(ui.app).removeClass('initing');

            this.bindShares();

        },

        initBunnySequence: function( skrollr ) {
            if( skrollr ) {
                $(ui.bunnySequence).find('span').each(function() {
                    var attrs = {};

                    $.each(this.attributes, function(idx, attr) {
                       attrs[attr.nodeName] = attr.nodeValue;
                    });

                    $(this).replaceWith(function() {
                        return $('<img/>', attrs).append($(this).contents());
                    });
                });
            } else {
                $(ui.bunnySequence).find('span').remove();
            }
        },

        refreshSkrollr: function() {
            this.skr.refresh();
        },

        bindUIEvents: function() {
            var self = this;

            $(window).on('resize', $.proxy(this.onResize, this));
            $(document).on('milestone:in-view', function(e) {
                self.updateNav(e.target);
            });

            $(ui.scrollTo).on('click', $.proxy(this.scrollTo, this));

            // Disable dragging of images
            $(ui.img).on('mousedown', function() {
                return false;
            });

            // Additional visibility check for noSkrollr environments
            if (!this.opts.skrollr) {
                $(window).on('scroll resize', $.proxy(this.checkScrollPosition, this));
            }

        },

        onResize: function() {
            this.setIntroHeight();
            this.positionExploreElement();
        },

        setIntroHeight: function() {
            var headerHeight = this.opts.skrollr ? 0 : $('#cstm-masthead, .faux-header').height(),
                introHeight = $(window).height() - headerHeight;

            $(ui.intro).css({
                height: introHeight,
                marginTop: headerHeight
            });

            if (introHeight <= 700) {
                $(ui.intro).addClass('small-screen');
            } else {
                $(ui.intro).removeClass('small-screen');
            }

        },

        positionExploreElement: function() {
            var introWrapBottomOffset = $(ui.introWrap).offset().top + $(ui.introWrap).outerHeight(true);

            $(ui.introExplore).css({
                top: introWrapBottomOffset + 20
            });

        },

        checkScrollPosition: function() {
            if ($(window).scrollTop() > 480) {
                $(ui.app).addClass('back-to-top-is-visible');
            } else {
                $(ui.app).removeClass('back-to-top-is-visible');
            }
        },

        initLoadingIndicator: function() {
            var self = this;
            $(ui.app).waitForImages(function() {
                $(this).removeClass('loading');
                self.enableScrolling();
                if (self.opts.skrollr) {
                    self.refreshSkrollr();
                    self.positionExploreElement();
                }
            }, function(loaded, count, success) {
                var percentage = Math.floor((loaded / count) * 100);
                $(ui.percentage).html(percentage + '<span>%</span>');
                $(ui.loaderBar).css('width', percentage + '%');
                self.preventScrolling();
            });

        },

        preventScrolling: function() {
            $('html').addClass('disable-scrolling');
        },

        enableScrolling: function() {
            $('html').removeClass('disable-scrolling');
        },

        handleWaypoints: function() {

            var self = this,
                viewportHeight = $.waypoints('viewportHeight');

            $(ui.milestones).waypoint(function(direction) {
                if (direction === 'down') {
                    $(this).trigger('milestone:in-view');
                }
            }, {
                offset: '50%'
            }).waypoint(function(direction) {
                if (direction === 'up') {
                    $(this).trigger('milestone:in-view');
                }
            }, {
                offset: -viewportHeight / 2
            });

        },

        updateNav: function(milestone) {
            var self = $(milestone);
            if (self.attr('id')) {
                var currId = '[data-id=' + self.attr('id') + ']',
                    navItemOffset = $(currId).position().left;
                $(ui.navBar).css({
                    width: navItemOffset + 9
                });
            }
        },

        scrollTo: function(e) {
            e.preventDefault();

            var self = this,
                target = $(e.currentTarget).attr('href'),
                offset = $(target).offset();

            if (offset === null) {
                offset = 0;
            }

            if (typeof $.velocity === "object") {
              $(ui.scrollContainer).velocity('scroll', {
                  duration: 800,
                  offset: offset.top,
                  easing: 'easeInOutQuart'
              }).promise().done(function() {
                  if (target !== undefined) {
                      window.location.hash = target;
                  } else {
                      window.location.hash = '';
                  }
              });
            }
            else {
                if (target !== undefined) {
                    window.location.hash = target;
                } else {
                    window.location.hash = '';
                }
            }
        },

        bindShares: function() {
            var url = location.href.split('#')[0];
            var text = 'See what the Energizer Bunny has been up to for the last 25 years.';
            var image = 'http://www.energizer.com/sitecollectiondocuments/custom-timeline-module/img/global/share-image.jpg';

            $('.fb').share({
                type: 'facebook',
                url: url,
                text: text,
                image: image
            });
            $('.tw').share({
                type: 'twitter',
                url: url,
                text: text,
                image: image
            });
            $('.pt').share({
                type: 'pinterest',
                url: url,
                text: text,
                image: image
            });
            $('.gp').share({
                type: 'plusone',
                url: url,
                text: text,
                image: image
            });
        }

    };

}());

$(function() {
    var skrollr;
    if (!Modernizr.touch && Modernizr.csstransforms) {
        skrollr = true;
    } else {
        skrollr = false;
    }
    timeline.init({
        skrollr: skrollr
    });
});
