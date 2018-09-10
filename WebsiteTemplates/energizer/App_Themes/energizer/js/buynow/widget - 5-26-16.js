var BuyNowWidget = function( elem, options ) {

	if( ! elem.length ) {
		console.log( 'Element does not exist' );
		return;
	}

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

	} else { // For buynow.html - all products
	var data = window.batteryData;
		// Populate types with unkown family
		// obj.Type[0] is "AA", "AAA", etc
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

}

$(document).ready(function() {
	$('.bnreset').click(function() {
			var Batteries = new BuyNowWidget( $('#BuyNowBatteries'), {} );
			$('select option[value="default"]').attr("selected",true);
			$('#retailers').hide();
			$('.bnreset').hide();

});
});