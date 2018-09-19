function CheckValid() {
    var e = $('.search input[type="text"]').val().toLowerCase();
    return "" == e || "search" == e ? ($('.search input[type="text"]').addClass("searchError"), !1) : !0
}
$(document).ready(function() {
    function e(e) {
        this.dd = e, this.placeholder = this.dd.children("span"), this.opts = this.dd.find("ul.dropdown > li"), this.val = "", this.index = -1, this.sort = "", this.initEvents()
    }
    $(".accordion").click(function() {
        $(this).toggleClass("active")
    }), $(".update-video").click(function(e) {
        e.preventDefault();
        var t = $(this).attr("data-videoID");
        $(".eco-intro .section-graphic iframe").attr({
            src: "https://www.youtube.com/embed/" + t + "?rel=0&enablejsapi=1",
            "data-videoID": t
        })
    }), $(".accordion-container").find(".accordion-toggle").click(function() {
        $(this).hasClass("active") || ($(".accordion-toggle").removeClass("active"), $("div").remove("#afshcontainer"), $("select").val("NA"), $(this).next().find("select option:nth-child(2)").attr("selected", "selected").change(), $(this).next().slideToggle("fast"), $(this).addClass("active"), $(".accordion-content").not($(this).next()).slideUp("fast"))
    }), e.prototype = {
        initEvents: function() {
            var e = this;
            e.dd.on("click", function(e) {
                return $(this).toggleClass("active"), !1
            }), e.opts.on("click", function() {
                var t = $(this);
                if (e.val = t.text(), e.index = t.index(), e.placeholder.text(e.val), "#dd-spbattries" == e.dd.selector) {
                    $(".special-product").css("display", "none");
                    var a = $(t.html()).attr("href");
                    $(a).show(), $("#btnsearch").show(), $("body, html").animate({
                        scrollTop: $(a).offset().top
                    }, 100)
                }
                if ("#dd-spnav" == e.dd.selector) {
                    var a = $(t.html()).attr("href");
                    $(location).attr("href", a)
                }
                e.sort = t.attr("data-sort"), $(".filtered-products-container").mixItUp("sort", e.sort)
            })
        },
        getValue: function() {
            return this.val
        },
        getIndex: function() {
            return this.index
        }
    }, $(function() {
        new e($("#dd-sort"));
        $(document).click(function() {
            $(".wrapper-dropdown-3").removeClass("active")
        });
        new e($("#dd-type"));
        $(document).click(function() {
            $(".wrapper-dropdown-3").removeClass("active")
        });
        new e($("#dd-use"));
        $(document).click(function() {
            $(".wrapper-dropdown-3").removeClass("active")
        });
        new e($("#dd-brand"));
        $(document).click(function() {
            $(".wrapper-dropdown-3").removeClass("active")
        });
        new e($("#dd-spbattries"));
        $(document).click(function() {
            $(".wrapper-dropdown-3").removeClass("active")
        });
        new e($("#dd-spnav"));
        $(document).click(function() {
            $(".wrapper-dropdown-3").removeClass("active")
        })
    }), $("#mobileSearch").click(function() {
        $("#mobileSearchBox").fadeToggle(300)
    }), $("a.meanmenu-reveal").click(function() {
        $("#mobileSearchBox").hide()
    }), $("li.active-country").hover(function() {
        $(this).toggleClass("country-clicked")
    }), $(window).bind("scroll", function() {
        var e = 64;
        $(window).scrollTop() > e && $(window).width() > 1024 ? ($(".main-header").addClass("fixed"), $("body").css("padding-top", "64px")) : ($(".main-header").removeClass("fixed"), $("body").css("padding-top", "0px"))
    }), $(window).hashchange(function() {
        if ("" == location.hash) var e = $(".hash").find("a.accordion-toggle").slice(0, 1).attr("href");
        else var e = location.hash;
        $(".hash .accordion-toggle").each(function() {
            return $(this).attr("href") === e ? ($(this).trigger("click"), PriceSpider.rebind(), !1) : void 0
        })
    }), $("#slider4").responsiveSlides({
        auto: !0,
        pager: !0,
        nav: !0,
        speed: 500,
        namespace: "callbacks",
        before: function() {
            $(".events").append("<li>before event fired.</li>")
        },
        after: function() {
            $(".events").append("<li>after event fired.</li>")
        }
    });
    var t = $(location).attr("pathname");
    t.indexOf("/flashlights-lighting") >= 0 || t.indexOf("/everyday-flashlights") >= 0 ? $(".filtered-products-container").mixItUp("sort", "myorder:asc") : t.indexOf("/hands-free-lighting") >= 0 ? $(".filtered-products-container").mixItUp("sort", "handsfreeorder:asc defaultorder:asc") : t.indexOf("/emergency-lighting") >= 0 ? $(".filtered-products-container").mixItUp("sort", "preorder:asc") : t.indexOf("/outdoor-lighting") >= 0 ? $(".filtered-products-container").mixItUp("sort", "outorder:asc") : t.indexOf("/do-it-yourself") >= 0 && $(".filtered-products-container").mixItUp("sort", "diyorder:asc"), t.indexOf("/energizer-ultimate-lithium-batteries") >= 0 && ($("body").removeClass("background-red"), $("body").addClass("background-blue"), $('div[class="hash accordion-container"]').addClass("lithium-accordion")), (t.indexOf("/battery-chargers") >= 0 || t.indexOf("/energizer-rechargeable-batteries") >= 0) && ($("body").removeClass("background-red"), $("body").addClass("background-green")), (t.indexOf("/eco-advanced-batteries") >= 0 || t.indexOf("/ecoadvanced") >= 0 || t.indexOf("/eco-advanced-battery-coupon") >= 0) && ($("body").removeClass("background-red"), $("body").addClass("background-eco")), t.indexOf("/buybatteries") >= 0 && $(".main-container").addClass("contact-container -buy-now"), t.indexOf("/energizer-advanced-lithium-batteries") >= 0 && ($("body").removeClass("background-red"), $("body").addClass("background-yellow")), t.indexOf("/hearing-aid-batteries") >= 0 && $(".page-meta").addClass("hearing-aids-meta"), $('iframe[src*="youtube.com"]').each(function() {
        $(this).wrap("<div class='videowrapper' />")
    }), $("p:empty").remove(), $('ul[class="sshContent"]').removeClass("sshContent").addClass("pagehead-social"), $('li[class="sshListItem"]').removeClass("sshListItem"), $('a[ title="Share on Facebook" ]').removeClass("sshListItem").addClass("button-fb facebook"), $('span[class="sshIcon sshShareOnFacebook fa icon-header fa-facebook btf"]').removeClass("sshIcon sshShareOnFacebook "), $('a[ title="Tweet this" ]').removeClass("sshListItem").addClass("twitter"), $('span[class="sshIcon sshShareOnTwitter fa icon-header fa-twitter btt"]').removeClass("sshIcon sshShareOnTwitter "), $('a[ title="Share on LinkedIn" ]').removeClass("sshListItem").addClass("linkedin"), $('span[class="sshIcon sshLinkedIn "]').removeClass("sshIcon sshShareOnTwitter ").addClass("fa icon-header fa-linkedin"), $('a[ title="Share on GoogleBookmarks" ]').removeClass("sshListItem").addClass("google-plus"), $('span[class="sshIcon sshGoogleBookmarks fa icon-header fa-google-plus btg"]').removeClass("sshIcon sshGoogleBookmarks "), $('div[class="RadSocialShare RadSocialShare_Default"]').removeClass("RadSocialShare RadSocialShare_Default"), $(".sfsearchSubmit").removeClass("sfsearchSubmit").addClass("search-btn"), $(window).hashchange(), $('input[value="Search"]').attr({
        value: ""
    }), $(".search .search-btn").on("click", function(e) {
        var t = $('.search input[type="text"]').val();
        ("" == t || "Search" == t) && (e.preventDefault(), $('.search input[type="text"]').addClass("searchError"))
    })
});
var mylist = $("#batteylist"),
    listitems = mylist.children("li").get();
listitems.sort(function(e, t) {
    return $(e).text().toUpperCase().localeCompare($(t).text().toUpperCase())
}), $.each(listitems, function(e, t) {
    mylist.append(t)
});
var mylist = $(".all-list"),
    listitems = mylist.children("div").get();
listitems.sort(function(e, t) {
    return $(e).text().toUpperCase().localeCompare($(t).text().toUpperCase())
}), $.each(listitems, function(e, t) {
    mylist.append(t)
});
var seen = {};
$(".mix").each(function() {
    var e = $(this).text();
    seen[e] ? $(this).remove() : seen[e] = !0
}), jQuery(".brand-product li a").click(function() {
    return $("html,body").animate({
        scrollTop: $(".page-title").offset().top
    }, 0), !1
}), $(document).ready(function() {
    var e = $(location).attr("pathname");
    if (e.indexOf("/hearing-aid-batteries") >= 0 && ($(".product-family-image").before('<p class="font-size"> <span> <a href="#!" id="decreaseFontSize">Smaller</a> </span> <span>Type Size</span> <span> <a href="#!" id="increaseFontSize">Larger</a> </span> </p>'), $('p:contains("Type Size")').css("margin-top", "0%"), -1 != navigator.userAgent.indexOf("Safari") && -1 == navigator.userAgent.indexOf("Chrome") && $('p:contains("Type Size")').css("margin-bottom", "3%")), $(".sf_colsOut a[href='/specialty-battery-finder']").attr("id", "sidebar-promo-batteryfinder"), $(".how-batteries-works-container a[href='/promotions/rechargeable-battery-coupons']").attr("id", "banner-coupon-procharger-recharge"), $(".sfContentBlock a[href='http://www.earth911.com/recycling-guide/how-to-recycle-single-use-batteries/']").attr("id", "inline-earth911"), $(".sfContentBlock a[href='/responsibility/coin-lithium-battery-safety']").attr("id", "inline-lithium-battery-safety"), $(".sfContentBlock a[href='/responsibility/preparedness']").attr("id", "inline-preparedness"), $(".sfContentBlock a[href='/responsibility/change-your-clock-change-your-battery']").attr("id", "inline-change-clock-battery"), $(".full-width-wrap a[href='http://www.earth911.com/recycling-guide/how-to-recycle-single-use-batteries/']").attr("id", "banner-earth911"), $(".full-width-wrap a[href='/responsibility']").attr("id", "banner-responsibility"), $(".full-width-wrap a[href='/media']").attr("id", "banner-media"), $(".ps-split a[href='/about-batteries/battery-leakage']").attr("id", "banner-battery-leakage"), $(".sfContentBlock a[href='/docs/default-source/pdf/coin_lithium_battery_safety_infographic.pdf?sfvrsn=2']").attr("id", "sidebar-lithium-battery-safety"), $(".sfImageWrapper a[href='http://ow.ly/ujIdP']").attr("id", "promo-coin-lithium-battery-safety"), $(".sfImageWrapper a[href='http://thebatterycontrolled.com/']").attr("id", "promo-the-battery-controlled"), $(".promo-subnav a[href='/promotions/fathers-day-headlights-coupon']").attr("id", "subnav-vision-headlight-coupons"), $(".promo-subnav a[href='/promotions/rechargeable-battery-coupons']").attr("id", "subnav-rechargable-coupons"), $(".promo-subnav a[href='/promotions/scholastic-scratch-win']").attr("id", "subnav-scratch-win"), $(".promo-subnav a[href='/promotions/back-to-school-rewards']").attr("id", "subnav-school-rewards"), $(".promo-subnav a[href='http://www.earth911.com/recycling-guide/how-to-recycle-single-use-batteries/']").attr("id", "subnav-earth911"), $(".promo-subnav a[href='/responsibility/coin-lithium-battery-safety']").attr("id", "subnav-lithium-battery-safety"), $(".promo-subnav a[href='/responsibility/preparedness']").attr("id", "subnav-preparedness"), $(".promo-subnav a[href='/responsibility/change-your-clock-change-your-battery']").attr("id", "subnav-change-clock-battery"), $(".sf_colsIn a[href='/promotions/vision-headlight-coupons']").attr("id", "promotions-vision-headlight-coupon-hero"), $(".cstm-mediathumbs a[href='/promotions/vision-headlight-coupons']").attr("id", "promotions-vision-headlight-mediathumbs"), $(".cstm-mediathumbs a[href='/promotions/rechargeable-battery-coupon']").attr("id", "promotions-rechargecoupon-mediathumbs"), $(".cstm-mediathumbs a[href='http://energizerinstantwin.com/index.php']").attr("id", "promotions-scratchwin-mediathumbs"), $(".cstm-mediathumbs a[href='/promotions/back-to-school-rewards']").attr("id", "promotions-backtoschoolbucks-mediathumbs"), $("li.socialTop").attr("id", "social-top-button"), -1 == window.location.href.search("[?&]")) {
        var t = $("#subnav-echoadvanced").attr("href");
        $("#subnav-echoadvanced").attr("href", t + "?utm_source=dropdownpromobannerk&amp;utm_medium=website&amp;utm_campaign=ecoadvanced"), t = $(".promo-echoadvanced").attr("href"), $(".promo-echoadvanced").attr("href", t + "?utm_source=promotionpagepromobanner&amp;utm_medium=website&amp;utm_campaign=ecoadvanced")
    } else {
        var t = $("#subnav-echoadvanced").attr("href");
        $("#subnav-echoadvanced").attr("href"), t = $(".promo-echoadvanced").attr("href"), $(".promo-echoadvanced").attr("href")
    }
    var a = [];
    $(".main-nav a").each(function(e) {
        var t = $(this).attr("href");
        t = t.substr(t.lastIndexOf("/") + 1), $.inArray(t, a) >= 0 && (t += e + 1), $(this).addClass("primarynav-" + t), a.insert = {
            link: t
        }
    }), $(".footer-menu-container a").each(function(e) {
        var t = $(this).attr("href");
        t = t.substr(t.lastIndexOf("/") + 1), $(this).addClass("bottomnav-" + t)
    }), $(".font-size a").on("click", function() {
        if ($(".main-container[data-font-size]").length) var e = $(".main-container").attr("data-font-size");
        else var e = $(".main-container").css("font-size");
        e = parseInt(e), "decreaseFontSize" == $(this).attr("id") ? e -= 2 : e += 2, e += "px", $("#font-change").length ? ($("#font-change").empty(), $("#font-change").append(".main-container p, .accordion-container ul, pagehead-social ul:not(:first-child), .accordion-toggle, .family-info .family-meta span{font-size:" + e + ";}")) : $("body").append("<style id='font-change'>.main-container p, .accordion-container ul, pagehead-social ul:not(:first-child), .accordion-toggle, .family-info .family-meta span{font-size:" + e + ";}</style>"), $(".main-container").attr("data-font-size", e)
    }), $("#Container").mixItUp(), $(".popupimage").each(function() {
        $(this).fancybox({
            href: $(this).attr("data-fancybox-href"),
            autoScale: !1
        })
    }), $(".sfsearchResultHighLighter:contains('&lt;')").html(function(e, t) {
        return t.replace(/&lt;/g, "<")
    }), $(".sfsearchResultHighLighter:contains('&gt;')").html(function(e, t) {
        return t.replace(/&gt;/g, ">")
    })
});

$(document).ready(function() {

    var x = $(location).attr('pathname');

    if (x.indexOf("/batteries/battery-comparison-chart") >= 0) {
        $('.ultimate-learn').on('click', function(e) {
            e.preventDefault();
            $('#ultimate-uthium').addClass('open');
        });

        $('.max-learn').on('click', function(e) {
            e.preventDefault();
            $('#max').addClass('open');
        });

        $('.universal-learn').on('click', function(e) {
            e.preventDefault();
            $('#recharge-universal').addClass('open');
        });

        $('.power-learn').on('click', function(e) {
            e.preventDefault();
            $('#recharge-power').addClass('open');
        });

        $('.close').on('click', function(e) {
            $('.lightbox').removeClass('open');
        });
    }
    if (x.indexOf("/batteries/energizer-ultimate-lithium-batteries") >= 0) {
        $('.video-modal-1').on('click', function(e) {
            e.preventDefault();
            $('#video-modal-1').addClass('open');
        });

        $('.video-modal-2').on('click', function(e) {
            e.preventDefault();
            $('#video-modal-2').addClass('open');
        });

        $('.video-modal-3').on('click', function(e) {
            e.preventDefault();
            $('#video-modal-3').addClass('open');
        });

        $('.video-modal-4').on('click', function(e) {
            e.preventDefault();
            $('#video-modal-4').addClass('open');
        });

        $('.video-modal-5').on('click', function(e) {
            e.preventDefault();
            $('#video-modal-5').addClass('open');
        });

        $('.modal-close').on('click', function(e) {
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

})
