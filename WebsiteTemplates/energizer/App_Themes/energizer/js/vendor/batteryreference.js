$(document).ready(function () {

    // ------------------------------------------------------------------------
    // Go to global link

/*    $(".specialtydropdown").qDroppy({
        speed: 200
      , delayshow: 100
      , hidespeed: 200
      , activeclass: "hover"
      , subnavselector: "> ul"
      , usesmartcolumns: false
    });

    $(".specialtydropdown > li > a").click(function (e) {
        e.preventDefault();
        return false;
    });

  */
    // Production steps of ECMA-262, Edition 5, 15.4.4.18
    // Reference: http://es5.github.com/#x15.4.4.18
    if (!Array.prototype.forEach) {

        Array.prototype.forEach = function (callback, thisArg) {

            var T, k;

            if (this == null) {
                throw new TypeError(" this is null or not defined");
            }

            // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            var len = O.length >>> 0;

            // 4. If IsCallable(callback) is false, throw a TypeError exception.
            // See: http://es5.github.com/#x9.11
            if (typeof callback !== "function") {
                throw new TypeError(callback + " is not a function");
            }

            // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if (thisArg) {
                T = thisArg;
            }

            // 6. Let k be 0
            k = 0;

            // 7. Repeat, while k < len
            while (k < len) {

                var kValue;

                // a. Let Pk be ToString(k).
                //   This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
                //   This step can be combined with c
                // c. If kPresent is true, then
                if (k in O) {

                    // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                    kValue = O[k];

                    // ii. Call the Call internal method of callback with T as the this value and
                    // argument list containing kValue, k, and O.
                    callback.call(T, kValue, k, O);
                }
                // d. Increase k by 1.
                k++;
            }
            // 8. return undefined
        };
    }

    //Object.keys support for ie8
    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    if (!Object.keys) {
        Object.keys = (function () {
            'use strict';
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
                dontEnums = [
                  'toString',
                  'toLocaleString',
                  'valueOf',
                  'hasOwnProperty',
                  'isPrototypeOf',
                  'propertyIsEnumerable',
                  'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function (obj) {
                if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                    throw new TypeError('Object.keys called on non-object');
                }

                var result = [], prop, i;

                for (prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                        result.push(prop);
                    }
                }

                if (hasDontEnumBug) {
                    for (i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                            result.push(dontEnums[i]);
                        }
                    }
                }
                return result;
            };
        }());
    }



    // Adjust styles for surrounding webpart wrapper
    $('#specialmain').closest('.cstm-wpzone > table').css('width', '100%');

    var makeHash = {};
    var watchbranddd;
    var watchbrandnumdd; 

    var selectedYear;
    var selectedMake;
    var selectedModel;
    var selectedBrand;
    var selectedBrandNum;

    var carXml;
    var otherXml;

    $("#autocontinuebutton").hide();
    $("#watchcontinuebutton").hide();
    
     
    $.ajax({
        type: "GET",
        url: "/Sitefinity/WebsiteTemplates/energizer/App_Themes/energizer/xml/cardata.xml",
        //url: "xml/cardata.xml",
        datatype: "xml",
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log('Error: ' + errorThrown);
        },
        success: function (xml) {
            //console.log('AJAX Request is succeded.');

            carXml = $(xml);

            //populate year dropdown
            var yearArray = new Array("2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014");
            var compArray = [];
            var currentYear;

            for (var i = 0; i < yearArray.length; i++) {
                currentYear = yearArray[i];

                carXml.find('caryear[year="' + currentYear + '"] record').each(function () {

                    var foundMake = false;
                    var makeXml = $.trim($(this).find('make').text().toUpperCase());
                    var modelXml = $.trim($(this).find('model').text().toUpperCase());
                    
                    var modelHash = {};
                    var yearHash = {};

                    //add make if not added to makearray
                    if (!makeHash.hasOwnProperty(makeXml)) {
                        makeHash[makeXml] = modelHash;
                    } else {
                        modelHash = makeHash[makeXml];
                    }

                    if (!modelHash.hasOwnProperty(modelXml)) {
                        modelHash[modelXml] = yearHash;
                    } else {
                        yearHash = modelHash[modelXml];
                    }

                    if (!yearHash.hasOwnProperty(currentYear)) {
                        yearHash[currentYear] = currentYear;
                    }

                });
            }


            var sortedKeys = Object.keys(makeHash).sort();

            //Object.keys(makeHash).forEach(function (makeText) {
            sortedKeys.forEach(function (makeText) {
                var Ahref = $('<a href="#"></a>');
                Ahref.append(makeText);
                var LI = $("<li></li>");
                LI.append(Ahref);
                $('#myMakeUL').append(LI);
                // iteration code
            })
            
        }

    });

    


    $.ajax({
        type: "GET",
        url: "/Sitefinity/WebsiteTemplates/energizer/App_Themes/energizer/xml/otherdata.xml",
        //url: "xml/otherdata.xml",
        datatype: "xml",
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log('Error: ' + errorThrown);
        },
        success: function (xml) {
            //console.log('AJAX Request is succeded.');

            otherXml = $(xml);

            //populate competitor dropdown
            //create holding array
            var compArray = new Array();
            otherXml.find('record').each(function () {
                var compText = $(this).find('competitor').text();
                if (jQuery.inArray(compText, compArray) == -1) {
                    compArray.push(compText);
                }
            });

            //loop thru makeArray and populate dropdown
            jQuery.each(compArray, function (i, compValue) {

                var Ahref = $('<a href="#"></a>');
                Ahref.append(compValue);
                var LI = $("<li></li>");
                LI.append(Ahref);
                $('#myCompetitorUL').append(LI);
                $("#myCompetitor").append($('<option></option>').val(compValue).html(compValue));
            });

            watchbranddd = new DropDownBrand($('#WatchBrandDropDown'));
           
            //$(document).click(function () {
            //    // all dropdowns
            //    $('.wrapper-dropdown-1').removeClass('active');
            //});
        }
    });

    //hide divs
    initSpecial();






    function WatchContinue() {
        if (otherXml != undefined && otherXml != null) {
            var typeText;
            var enrText;

            //create holding array

            otherXml.find('record').each(function () {
                var compText = $(this).find('competitor').text();
                var compnumText = $(this).find('competitornum').text();
                if (compText == selectedBrand && compnumText == selectedBrandNum) {
                    typeText = $(this).find('type').text();
                    enrText = $(this).find('enr').text();
                    return false;
                }
            });

            //
            if (enrText != undefined && enrText != null && enrText != "----" && enrText != "-----" && enrText != "") {
                $("#specialresults").show();
                $("#specialwatch").hide();
                $("#myAutoResults").hide();
                $("#myResults").show();
                $("#myType").text(typeText);
                $("#myENR").text(enrText);
            } else {
                typeText = "We’re sorry but there were no results that matched your search criteria.\n Please refine your search and try again.";
                enrText = "We’re sorry but there were no results that matched your search criteria.\n Please refine your search and try again.";
                $("#specialresults").show();
                $("#specialwatch").hide();
                $("#myAutoResults").hide();
                $("#myResults").show();
                $("#myType").text(typeText);
                $("#myENR").text(enrText);
            }




        }

    }

    $("#watchcontinuebutton").click(function () {
        WatchContinue();
    });

    function AutoContinue() {
        if (carXml != undefined && carXml != null) {
            var batterysizeText;
            var batteryqtyText;
            var batterynotesText;
            var batteryArray = [];
            //create holding array  

            carXml.find('caryear[year="' + selectedYear + '"] record').each(function () {
                var makeText = $(this).find('make').text().toUpperCase();
                var modelText = $(this).find('model').text().toUpperCase();
                if (makeText == selectedMake.toUpperCase() && modelText == selectedModel.toUpperCase()) {

                    $(this).find("battery").each(function () {
                        //$tocOutput += "<li><a href='" + $(this).attr("url") + "'>" + $(this).attr("title") + "</a></li>";
                        batteryArray.push({
                            size: $(this).find('batterysize').text(),
                            qty: $(this).find('batteryqty').text(),
                            notes: $(this).find('batterynotes').text()
                        });

                        //batterysizeText = $(this).find('batterysize').text();
                        //batteryqtyText = $(this).find('batteryqty').text();

                    });
                    return false;
                }
            });

            //
            if (batteryArray.length > 0) {
                var batteryHtml = '';
                var batteryCount = 0;
                //battery template
                //<div id="BatterySizeLabel">Battery Size: </div>
                //<div id="myBatterySize"></div>
                //<div id="BatteryQtyLabel">Battery Quantity: </div>
                //<div id="myBatteryQty"></div>
                $.each(batteryArray, function (index, value) {
                    batteryCount++;
                    batterysizeText = value.size;
                    batteryqtyText = value.qty;
                    batterynotesText = value.notes;

                    if (batterysizeText != undefined && batterysizeText != null) {
                        if (batteryCount > 0) {
                            batteryHtml += '<div style="clear:left;"></div>';
                        }

                        batteryHtml += '<div id="BatterySizeLabel">Battery Size: </div>';
                        batteryHtml += '<div id="myBatterySize">' + batterysizeText + '</div>';
                        batteryHtml += '<div id="BatteryQtyLabel">Battery Quantity: </div>';


                        if (batteryqtyText.length > 0) {
                            batteryHtml += '<div id="myBatteryQty">' + batteryqtyText + '</div>';


                        }

                        if (batterynotesText.length > 0) {
                            batteryHtml += '<div id="BatteryNotesLabel">Additional Info: </div>';
                            batteryHtml += '<div id="myBatteryNotes">' + batterynotesText + '</div>';
                        }
                    }
                });

                if (batteryHtml != '') {
                    $("#specialresults").show();
                    $("#specialauto").hide();
                    $("#myAutoResults").show();
                    $("#myResults").hide();
                    $("#myAutoResults").html(batteryHtml);
                }

                //write to page the battery information

            }

        }
    }

    $("#autocontinuebutton").click(function () {
        AutoContinue();
    });

    function DropDownBrand(el) {
        this.watchbranddd = el;
        this.placeholder = this.watchbranddd.children('span');
        this.opts = this.watchbranddd.find('ul.dropdown > li');
        this.val = '';
        this.index = -1;
        this.initEvents();
    }
    DropDownBrand.prototype = {
        initEvents: function () {
            var obj = this;
            var completed = false;

            obj.watchbranddd.on('click', function (event) {

                $(this).toggleClass('active');
                $('#WatchBrandNumDropDown').removeClass('active');
                $('#WatchBrandNumDropDown').removeClass('selected');
                selectedBrandNum = undefined;
                if (!completed) {
                    $('#WatchBrandDropDown').children('span').text('BRAND');
                    $("#myType").text("");
                    $("#myEnr").text("");
                    $("#myResults").hide();
                    
                }
                CheckShowWatchContinue();
                return false;
            });

            obj.opts.on('click', function () {
                var opt = $(this);
                obj.val = opt.text();
                obj.index = opt.index();
                obj.placeholder.text(obj.val);
                $('#WatchBrandNumDropDown').children('span').text('BRAND NUMBER');
                $('#myCompetitorNumUL').empty();

                if (obj.val != undefined) {
                    selectedBrand = obj.val;
                    $('#WatchBrandDropDown').addClass('selected');
                    var compNumArray = new Array();
                    otherXml.find('record').each(function () {
                        var compText = $(this).find('competitor').text();
                        var compnumText = $(this).find('competitornum').text();
                        if (selectedBrand == compText) {
                            if (jQuery.inArray(compnumText, compNumArray) == -1) {
                                compNumArray.push(compnumText);
                            }
                        }
                    });

                    //loop thru makeArray and populate dropdown
                    jQuery.each(compNumArray, function (i, compnumValue) {
                        var Ahref = $('<a href="#"></a>');
                        Ahref.append(compnumValue);
                        var LI = $("<li></li>");
                        LI.append(Ahref);
                        $('#myCompetitorNumUL').append(LI);
                    });

                    completed = true;
                    
                }
                CheckShowWatchContinue();
                //close dropdown
                $(this).removeClass('active');
               
            });
        },
        getValue: function () {
            return this.val;
        },
        getIndex: function () {
            return this.index;
        }
    }

    $(function () {
        $('#WatchBrandNumDropDown').click(function () {
            $(this).toggleClass('active');
            return false;
        });
    });

    $(function () {
        $("#myCompetitorNumUL").on("click", "li", function (event) {
            var opt = $(this);
            var val = opt.text();
            var index = opt.index();
            $('#WatchBrandNumDropDown').children('span').text(val);
            if (val != undefined) {
                selectedBrandNum = val;
                $('#WatchBrandNumDropDown').addClass('selected');
            }
            CheckShowWatchContinue();
        });
    });
    

    $(function () {
        $('#CarMakeDropDown').click(function () {
            $('#CarModelDropDown').removeClass('active');
            $('#CarModelDropDown').removeClass('selected');
            $('#CarYearDropDown').removeClass('selected');
            $('#CarYearDropDown').removeClass('active');
            $('#CarYearDropDown').children('span').text('YEAR');
            $('#CarModelDropDown').children('span').text('MODEL');
            selectedModel = undefined;
            selectedYear = undefined;
            CheckShowAutoContinue();
            $(this).toggleClass('active');
            return false;
        });
    });

    $(function () {
        $("#myMakeUL").on("click", "li", function (event) {
            var opt = $(this);
            var val = opt.text().toUpperCase();
            var index = opt.index();
            $('#CarMakeDropDown').children('span').text(val);
            if (val != undefined) {
                selectedMake = val.toUpperCase();
                $('#CarMakeDropDown').addClass('selected');
                $('#myModelUL').empty();
                var modelHash = makeHash[selectedMake];
                //create holding array
                //if (!Object.keys) Object.keys = function (o) {
                //    if (o !== Object(o))
                //        throw new TypeError('Object.keys called on a non-object');
                //    var k = [], p;
                //    for (p in o) if (Object.prototype.hasOwnProperty.call(o, p)) k.push(p);
                //    return k;
                //}
                var sortedKeys = Object.keys(modelHash).sort();


                //Object.keys(modelHash).forEach(function (modelText) {
                sortedKeys.forEach(function (modelText) {
                    
                    var Ahref = $('<a href="#"></a>');
                    Ahref.append(modelText);
                    var LI = $("<li></li>");
                    LI.append(Ahref);
                    $('#myModelUL').append(LI);
                    // iteration code
                })

                
                $('#CarModelDropDown').children('span').text('MODEL');

                completed = true;
            }
            CheckShowAutoContinue();
        });
    });






    $(function () {
        $('#CarModelDropDown').click(function () {
            $('#CarYearDropDown').removeClass('selected');
            $('#CarYearDropDown').removeClass('active');
            $('#CarYearDropDown').children('span').text('YEAR');
            CheckShowAutoContinue();
            $(this).toggleClass('active');
            return false;
        });
    });

    $(function () {
        $("#myModelUL").on("click", "li", function (event) {
            var opt = $(this);
            var val = opt.text().toUpperCase();
            var index = opt.index();
           

            $('#CarModelDropDown').children('span').text(val);
            if (val != undefined) {
                selectedModel = val;
                $('#CarModelDropDown').addClass('selected');
                $('#myYearUL').empty();
                var yearHash = makeHash[selectedMake][selectedModel];
                //create holding array

                Object.keys(yearHash).forEach(function (yearText) {

                    var Ahref = $('<a href="#"></a>');
                    Ahref.append(yearText);
                    var LI = $("<li></li>");
                    LI.append(Ahref);
                    $('#myYearUL').append(LI);
                })


                $('#CarYearDropDown').children('span').text('YEAR');

                completed = true;
            }
            CheckShowAutoContinue();
        });
    }); 


    $(function () {
        $('#CarYearDropDown').click(function () {
           
            CheckShowAutoContinue();
            $(this).toggleClass('active');
            return false;
        });
    });

    $(function () {
        $("#myYearUL").on("click", "li", function (event) {
            var opt = $(this);
            var val = opt.text().toUpperCase();
            var index = opt.index();
            $('#CarYearDropDown').children('span').text(val);
            if (val != undefined) {
                selectedYear = val;
                $('#CarYearDropDown').addClass('selected');
            }
            CheckShowAutoContinue();
        });
    });

  

    //preload images
    function preload(arrayOfImages) {
        $(arrayOfImages).each(function () {
            $('<img/>')[0].src = this;
        });
    }


    function CheckShowAutoContinue() {
        if ($("#CarMakeDropDown").hasClass('selected')
            && $("#CarModelDropDown").hasClass('selected')
            && $("#CarYearDropDown").hasClass('selected')) {
            if (selectedYear != undefined
                && selectedModel != undefined
                && selectedMake != undefined) {
                $("#autocontinuebutton").show();
            } else {
                $("#autocontinuebutton").hide();
            }
        } else {
            $("#autocontinuebutton").hide();
        }
    }
    
    function CheckShowWatchContinue() {
        if ($("#WatchBrandDropDown").hasClass('selected')
            && $("#WatchBrandNumDropDown").hasClass('selected')) {
            if (
                selectedBrand != undefined
                && selectedBrandNum != undefined) {
                $("#watchcontinuebutton").show();
            } else {
                $("#watchcontinuebutton").hide();
            }

        } else {
            $("#watchcontinuebutton").hide();
        }
    }
});




function showAuto() {
    $("#specialwatch").hide();
    $("#specialstepone").hide();
    $("#specialresults").hide();
    $("#specialauto").show();


    //hide results
    $("#myBatterySize").text("");
    $("#myBatteryQty").text("");
    $("#myAutoResults").hide();

}

function showWatch() {
    $("#specialwatch").show();
    $("#specialauto").hide();
    $("#specialstepone").hide();
    $("#specialresults").hide();

    $("#watchotherheadertext").text("Let's Find Out About Your Watch");

    //hide results
    $("#myCompetitorNum").empty();
    $("#myType").text("");
    $("#myEnr").text("");
    $("#myResults").hide();
}

function showOther() {
    $("#specialwatch").show();
    $("#specialauto").hide();
    $("#specialstepone").hide();
    $("#specialresults").hide();
    
    $("#watchotherheadertext").text("Let’s Find Out About Your Battery");

    //hide results
    $("#myCompetitorNum").empty();
    $("#myType").text("");
    $("#myEnr").text("");
    $("#myResults").hide();
}

function initSpecial() {
    $("#specialwatch").hide();
    $("#specialauto").hide();
    $("#specialresults").hide();
}



			




			

