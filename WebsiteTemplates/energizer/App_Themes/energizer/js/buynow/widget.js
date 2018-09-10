var initialWidget;
var tag = GetQueryStringParams('utm_campaign');
if (typeof tag == 'undefined')
{
	tag ='brandsite';
}
var BuyNowWidget = function( elem, options ) {

	if( ! elem.length ) {
		console.log( 'Element does not exist' );
		return;
	}
	initialWidget = $(elem).clone();

	// Set properties
	this.widget = elem;
	this.batteryType;
	this.batteryFamily;
	this.packSizes;
	this.retailers = {};
	this.cssHideClass = '-hide';
	this.cssLoadClass = 'loading';

	// Reference to self for property updating
	var self = this;

	if( typeof(options) == 'object' ) {
		if( typeof(options.batteryFamily) != 'undefined' && options.batteryFamily != null ) {
			this.batteryFamily = options.batteryFamily;
		}
		if( typeof(options.batteryType) != 'undefined' && options.batteryType != null ) {
			self.setBatteryType(options.batteryType);
		}
		if( typeof(options.model) != 'undefined' && options.model != null ) {
			this.model = options.model;
		}
	}

	self.$retailersStep = self.widget.find('.step.retailers');

	if( this.batteryFamily == null ) {
		this.$batteryFamilyStep = this.widget.find('.step.family');
		this.$batteryFamilyStep.find('select').on('change', function(e){
			if( $(e.target).val() != 'default' ) {
				self.setBatteryFamily( $(e.target).val() );
			}
		});
	}

	if( this.batteryType == null ) {
		this.$batteryTypeStep = this.widget.find('.step.type');

		if( this.$batteryTypeStep.find('select').length > 0 ) {
			this.$batteryTypeStep.find('select').on('change', function(e){
				if( $(e.target).val() != 'default' ) {
					self.setBatteryType( $(e.target).val() );
				}
			});
		}
		if( this.$batteryTypeStep.find('button').length > 0 ) {
			this.$batteryTypeStep.on('click', 'button', function(e){
				$(this).addClass('-selected').siblings().removeClass('-selected');
				self.setBatteryType( $(this).attr('data-type') );
			});
		}

	}
	
	if( this.packSizes == null ) {
		self.$packSizesStep = this.widget.find('.step.packs');
	}

	/**
	** Page 15 of creative PDF
	**
	** Case 1: Battery Type and Battery Family are unknown
	** Hides pack size and family selection by default.
	** ASAD SEE HERE
	**/
	if( this.batteryType == null && this.batteryFamily == null ) {
		self.$batteryFamilyStep.addClass(self.cssHideClass);
		self.$packSizesStep.addClass(self.cssHideClass);

		self.populateTypeOptions();

		self.widget.on('batteryTypeUpdated', function(){
			// This AJAX url would grab any families tied to a product
			// Use your unique identifier here to make the call
			self.$batteryFamilyStep.removeClass(self.cssHideClass).addClass(self.cssLoadClass);

			var families = window.batteryData[self.batteryType].Types;

			// Add lithium, max, etc based on selected type
			// Use self.batteryType 
			self.$batteryFamilyStep.find('select option').remove();
				$(self.$batteryFamilyStep.find('select'))
			         .append($("<option></option>")
			                    .attr("value","default")
			                    .text("Select")); 
							
			$.each(families, function(key, obj) {
			     $(self.$batteryFamilyStep.find('select'))
			         .append($("<option></option>")
			                    .attr("value",obj.Type[0])
			                    .text(obj.Type[0])); 
			});
			self.$packSizesStep.find('button').remove();
			$(self.$retailersStep.find('#retailers')).empty();
			setTimeout(function(){
				self.$batteryFamilyStep.removeClass(self.cssLoadClass);
			}, 500);
			if( self.batteryType == 'Battery Chargers' ) {
				self.$packSizesStep.addClass(self.cssHideClass);
			}
			
		});

		self.widget.on('batteryFamilyUpdated', function(){
			self.$packSizesStep.find('button').remove();
			$(self.$retailersStep.find('#retailers')).empty();
			self.getPackSizesByType();
			
		});

		self.$packSizesStep.on('click', 'button', function(){
			self.getRetailersFromAPI( $(this) );
		});

	}

	/**
	** Case 2: Battery Type is UNKNOWN but Battery Family IS KNOWN
	**
	** Displays type step but hides pack options
	**/
	if( this.batteryType == null && this.batteryFamily != null ) {
		self.$packSizesStep.addClass(self.cssHideClass);
		self.$retailersStep.addClass(self.cssHideClass);


		self.populateTypeOptions();

		self.widget.on('batteryTypeUpdated', function(){
			self.getPackSizesByFamily();
		self.$retailersStep.addClass(self.cssHideClass);
		});
		

		self.$packSizesStep.on('click', 'button', function(){
			self.getRetailersFromAPI( $(this) );
		});

	}

	/**
	** Case 3: Battery Type and Family are KNOWN - one size stuff
	**
	** Displays Where to buy options on load
	**/
	if( this.batteryFamily != null && this.batteryType != null && options.model != null ) {		
		self.widget.addClass('-no-pad');
		if( typeof(options.model) != 'undefined' && options.model != null ) {
			self.getRetailersFromAPI( self.model );
		} else {
			console.log( 'Model number not defined' );
		}
	}

	/**
	** Case 4: Battery Type and Family are KNOWN but Pack Size is not
	**
	** Displays pack options on load
	**/
	if( this.batteryFamily != null && this.batteryType != null && typeof(options.model) == 'undefined' ) {		
		self.widget.addClass('-no-pad');

		self.getPackSizesByFamily(true);

	}
};

BuyNowWidget.prototype.setBatteryType = function ( newBatteryType ) {
    $('.bnreset').show();
	$('#bnplink').hide();
	var self = this;
    self.batteryType = newBatteryType;
    self.widget.trigger('batteryTypeUpdated');
}

BuyNowWidget.prototype.setBatteryFamily = function ( newBatteryFamily ) {
	$('#bnplink').show();
    var self = this;
    self.batteryFamily = newBatteryFamily;
    self.widget.trigger('batteryFamilyUpdated');
}

BuyNowWidget.prototype.setRetailers = function ( newRetailers ) {
    var self = this;
    self.subProduct = newRetailers;
    self.widget.trigger('retailersUpdated');
}

BuyNowWidget.prototype.populateTypeOptions = function() {
	var self = this;

	if( self.batteryFamily != null && typeof(self.batteryFamily) != 'undefined' ) { // For Max page and similar
	var data = window.batteryData[self.batteryFamily].Types;

if( $(self.$batteryTypeStep).find('select').length > 0 ) {
$(self.$batteryTypeStep.find('select'))
		         .append($("<option></option>")
		         .attr('value','default')
		         .text('Select a battery'));
		// Populates type when family is KNOWN
		$.each(data, function(key, obj) {
			 var css = 'bn-battery';
		     $(self.$batteryTypeStep.find('select'))
		         .append($("<option></option>")
		                    .attr("value",obj.Type[0])
		                    .text(obj.Type[0])); 
		});
		this.$batteryTypeStep.on('change', 'select', function(e){
			self.setBatteryType( $(this).val() );
		});
} else {

		// Populates type when family is KNOWN
		$.each(data, function(key, obj) {
			 var css = 'bn-battery';
		     $(self.$batteryTypeStep)
		         .append($("<button></button>")
		                    .attr("data-type",obj.Type[0])
		                    .attr("class", css)
							.attr("onclick", "return false;")
		                    .text(obj.Type[0])); 
		});
		this.$batteryTypeStep.on('click', 'button', function(e){
			$(this).addClass('-selected').siblings().removeClass('-selected');
			self.setBatteryType( $(this).attr('data-type') );
		});
}

	} else { // For buynow.html - all products
	var data = window.batteryData;
		// Populate types with unkown family
		// obj.Type[0] is "AA", "AAA", etc
			self.$batteryTypeStep.find('select option').remove();
			self.$batteryFamilyStep.find('select option').remove();
			self.$packSizesStep.find('button').remove();
			$(self.$retailersStep.find('#retailers')).empty();

			$(self.$batteryTypeStep.find('select'))
			 .append($("<option></option>")
						.attr("value","default")
						.text("Select")); 

		$.each(data, function(key, obj) {
		     $(self.$batteryTypeStep.find('select'))
		         .append($("<option></option>")
							.attr("value",key)
							.text(key));
//		                    .attr("value",obj.Type[0])
//		                    .text(obj.Type[0])); 
		});
	}

	console.log(data);

}

/*BuyNowWidget.prototype.getPackSizesByFamily = function() {
    var self = this;

	self.$packSizesStep.removeClass(self.cssHideClass).addClass(self.cssLoadClass); // CSS stuff - you probably dont need to touch this
	
	var packs = window.batteryData[self.batteryFamily].Types;
	console.log(packs);
	self.$packSizesStep.find('button').remove();
	$.each(packs, function(index, brand) {
		if( brand.Type == self.batteryType ) {
			$.each( brand.Sizes[0], function(size, model){
		     $(self.$packSizesStep)
		        .append($("<button></button>")
		                    .attr("data-model",model)
							.attr("onclick", "return false;")							
		                    .text(size + ' Pack')); 
			});
		}

	});

	setTimeout(function(){
		self.$packSizesStep.removeClass(self.cssLoadClass);
	}, 200);

	self.$packSizesStep.on('click', 'button', function(){
		self.getRetailersFromAPI( $(this) );
	});
}
*/
BuyNowWidget.prototype.getPackSizesByFamily = function( autoSelect ) {
	if( typeof( autoSelect ) == 'undefined' || null == autoSelect ) {
		autoSelect = false;
	}
    var self = this;

	self.$packSizesStep.removeClass(self.cssHideClass).addClass(self.cssLoadClass); // CSS stuff - you probably dont need to touch this
	
	var packs = window.batteryData[self.batteryFamily].Types;
	console.log(packs);
	self.$packSizesStep.find('button').remove();
	var packsCount = Object.keys(packs[0].Sizes[0]).length;
	if( packsCount == 1 && autoSelect === true ) {
		$("#spbnp").html("Click a retailer to buy online:");
		var firstProp = Object.keys(packs[0].Sizes[0])[0];
		var modelNum = packs[0].Sizes[0][firstProp];
		self.getRetailersFromAPI( modelNum );
		self.$packSizesStep.remove();
	} else {

/* to auto select
		this.$batteryTypeStep = this.widget.find('.step.type');
		self.populateTypeOptions();
	*/	
		$.each(packs, function(index, brand) {
			if( brand.Type == self.batteryType ) {
				$.each( brand.Sizes[0], function(size, model){
			     $(self.$packSizesStep)
			        .append($("<button></button>")
			                    .attr("data-model",model)
								.attr("onclick", "return false;")							
			                    .text(size + ' Pack')); 
				});
			}
		});
		setTimeout(function(){
			self.$packSizesStep.removeClass(self.cssLoadClass);
		}, 200);

		self.$packSizesStep.on('click', 'button', function(){
			self.getRetailersFromAPI( $(this) );
		});
	}
}
// Asad, modify this to do what you need for all products filtering page
// This wont break family page
BuyNowWidget.prototype.getPackSizesByType = function() {
var self = this;
	
	console.log([self.batteryFamily]);
	var packs = window.batteryData[self.batteryType].Types;
	if( self.batteryType == 'Battery Chargers' ) {
		$.each( packs, function( index, brand ){
			if( brand.Type == self.batteryFamily ) {
				$('#bnplink').attr("href", brand.URL[0]);
				self.$retailersStep.addClass(self.cssLoadClass);
				self.$packSizesStep.addClass(self.cssHideClass);
				self.getRetailersFromAPI( brand.Sizes[0]['1'] );
			}
		});

	} else {
		self.$packSizesStep.removeClass(self.cssHideClass).addClass(self.cssLoadClass); // CSS stuff - you probably dont need to touch this
		console.log(packs);
		self.$packSizesStep.find('button').remove();
		$.each(packs, function(index, brand) {
			if( brand.Type == self.batteryFamily ) {
			$('#bnplink').show();
			$('#bnplink').attr("href", brand.URL[0]);
				$.each( brand.Sizes[0], function(size, model){
			     $(self.$packSizesStep)
			        .append($("<button></button>")
			                    .attr("data-model",model)
								.attr("onclick", "return false;")
			                    .text(size + ' Pack')); 
				});
			}
		});
		setTimeout(function(){
			self.$packSizesStep.removeClass(self.cssLoadClass);
		}, 200);

		self.$packSizesStep.on('click', 'button', function(){
			self.getRetailersFromAPI( $(this) );
		});

	}
}
BuyNowWidget.prototype.reset = function() {

	var self = this;

	var elem = $(initialWidget);
	var newWidget = elem.insertAfter( $(self.widget) );
	var Batteries = new BuyNowWidget( elem, self.initialOptions );
	$(self.widget).remove();

	this.widget = '';
	this.widget = elem;
	this.initialState = $(elem).clone();
	this.initialOptions;
	this.batteryType;
	this.batteryFamily;
	this.packSizes;
	this.retailers = {};
	this.cssHideClass = '-hide';
	this.cssLoadClass = 'loading';
	self = Batteries;
}

BuyNowWidget.prototype.getRetailersFromAPI = function( elem ) {
    var self = this;

    if( typeof( elem ) == 'object' ) {
		var t = $(elem);
		var modelNumber = t.attr('data-model');
		t.addClass('-selected').removeClass('-faded').siblings().addClass('-faded').removeClass('-selected');
    } else {
		var modelNumber = elem;
    }
    if( self.batteryType != 'Battery Chargers' ) {
		self.$retailersStep.removeClass(self.cssHideClass).addClass(self.cssLoadClass); // Wrap this line in if statement
    }
var timeout = setTimeout(function(){$('.oosmessage').fadeIn();},5000);
$.getJSON('https://plrss-data.where-to-buy.co/feeds/plrss/v1/'+modelNumber+
                    '?type=jsonp'+
                    '&callback=?'+
                    '&authorizationToken=Z58QH8nvuxDQlHRDCC7M4QKxeBzMLSVV7Mjo56csXq30Fgs/30F38MwTjy8NxvCqjeSwJZPiifiWHpzWU44qZzKS1hzaHLy+sj/dqIU3mBM='+
                    '&tag='+tag,
                    function (data) {
                        clearTimeout(timeout);
                        if (data.products[0].retailers.length != 0) {
							self.$retailersStep.find('img').remove();
							self.$retailersStep.find('ul').remove();
							self.$retailersStep.append( $("<ul id='retailers'></ul>") );
                        }

                        var count = 0;
                        var ooscount = 0;
                        //START OF CHANGE
                        var retailerResults = [];
                        //Get retailer products.  Stop at first in stock per retailer.
                        data.products.map(function(p){
                            p.retailers.map(function(r){
                                var retailerEntries = retailerResults.filter(function(n){return n.retailer === r.name;});
                                if (retailerEntries.length > 0){
                                    if (retailerEntries[0].retailerProduct.instock !== 'true' && r.instock === 'true'){
                                        retailerEntries[0].retailerProduct = r;
                                    }
                                }
                                else{
                                    retailerResults.push({retailer: r.name, retailerProduct: r, product: p});
                                }
                            });
                        });

                        for (var i = 0; i < retailerResults.length; i++){
                            var result = retailerResults[i];
                            if (count >= 5) break;

                            var template = '';

                            if (result.retailerProduct.instock === 'true'){
                                var deeplink = result.retailerProduct.deeplink_url;
                                template = '<li class="item {2}" data-modelname=" ' + result.product.model_name + '" data-ean="' + result.product.model_name.ean + '" data-retailer="' + result.retailerProduct.name + '"><a target="_blank" href="' + deeplink + '"><img class="logo" src="{0}" alt="{2}"/></a><a class="btn btn-buynow" target="_blank" href="' + deeplink + '"></a></li>';
                            }
                            else{
                                ooscount++;
                                template = '<li class="item item-oos {2}"><img class="logo" src="{0}" alt="{2}"/><span class="btn btn-unavailable"></span></li>';
                            }

                            template = template.replace(/\{0\}/g, result.retailerProduct.logo_url);
                            template = template.replace(/\{1\}/g, result.retailerProduct.deeplink_url);
                            template = template.replace(/\{2\}/g, result.retailerProduct.name);
                            template = template.replace(/\{3\}/g, result.retailerProduct.price ? retailerResults.retailerProduct.price : "");

                            //$('#retailers').append($(template));
									     $(self.$retailersStep.find('#retailers')).append( template );

                            count++;
                        }
                        //END OF CHANGE
                        if (ooscount == 5) {
							$(self.$retailersStep.find('#retailers')).empty();
							$(self.$retailersStep.find('#retailers')).append( '<li>Your item may not be available for online purchase. Please visit your local retailer for a full <em>Energizer</em> product assortment.</li>' );
							$(self.$retailersStep.find('#retailers')).fadeIn('fast');
							self.$retailersStep.removeClass(self.cssLoadClass);
                        } else {

                            $(self.$retailersStep.find('#retailers')).fadeIn('fast');
							self.$retailersStep.removeClass(self.cssLoadClass);

                        }
                    });	
/*
	$.ajax({
		url: 'https://plrss-data.where-to-buy.co/feeds/plrss/v1/' + modelNumber + '?authorizationToken=Z58QH8nvuxDQlHRDCC7M4QKxeBzMLSVV7Mjo56csXq30Fgs/30F38MwTjy8NxvCqjeSwJZPiifiWHpzWU44qZzKS1hzaHLy+sj/dqIU3mBM=&tag=brandsite',
		type: 'GET'
	})
	.done(function( response ) {
		self.$retailersStep.find('img').remove();
		self.$retailersStep.find('ul').remove();
		self.$retailersStep.append( $("<ul id='retailers'></ul>") );
		$.each(response.products[0].retailers, function(index, retailer) {   
			var retailerHtml = $( $('<li class="item item-oos"><img class="logo" src="'+ retailer.logo_url +'" /></li>') );
			if( retailer.instock == 'true' ) {
				retailerHtml = $( '<a target="_blank" href="'+ retailer.deeplink_url +'"></a>' ).append( retailerHtml );
			}
		     $(self.$retailersStep.find('#retailers'))
		        .append( retailerHtml );
		});
		self.$retailersStep.removeClass(self.cssLoadClass);

	});
	*/

}

$(document).ready(function() {
	$('body').on('click', '.bnreset', function() {
//	$('.bnreset').click(function() {

/*			$('select option[value="default"]').attr("selected",true);
			$('.family').find('select option').remove();
			$('#bnplink').hide();
			$('.packs').find('button').remove();
			$('#retailers').hide();
	*/
	Batteries.reset();
	$('.bnreset').hide();

});
});

function GetQueryStringParams(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}