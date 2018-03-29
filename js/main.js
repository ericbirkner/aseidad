/*
 * Toasty v0.1.2
 * Show Dan Forden's Toasty from Mortal Kombat as an Easter Egg for your website
 * (c)2014 Ruben Torres - rubentdlh@gmail.com
 * Released under the MIT license
 */
 var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

 (function($) {

 	//singleton
 	var singleToasty;

 	function Toasty(elem, options){
 		this.options=options;
 	}

 	Toasty.prototype = {

 		//initialize including neccesary elements in DOM
 		init: function(){
 			//Add to dom needed elements
 			$("body").append('<div id="toasty-guy-dan"><img src="images/'+ this.options.image +'" alt="toasty"></div>');
			$('#toasty-guy-dan').css('position', 'fixed');
			$('#toasty-guy-dan').css('right', '-170px');
			$('#toasty-guy-dan').css('bottom', '0px');
			if(this.options.sound){
				$("body").append('<audio id="toasty-audio"><source src="'+ this.options.sound +'" type="audio/mpeg"></source></audio>');
 			}
 		},

 		pop: function(){
 			var audio = document.getElementById('toasty-audio');
			audio.play();
			$("#toasty-guy-dan").addClass("show-dan");
			setTimeout( function(){ $("#toasty-guy-dan").removeClass("show-dan"); }, 1000);
 		}

 	}

 	$.fn.toasty = function(options) {

 		this.each(function(){
			// Check if we should operate with some method
			if (/^(pop)$/i.test(options)) {
				// Normalize method's name
				options = options.toLowerCase();
				switch(options){
					case 'pop':
						singleToasty.pop();
						break;
				}
			}else if (typeof options == 'object' || !options) {
				options = $.extend({}, $.fn.toasty.defaults, options);
				if(!singleToasty){
					singleToasty = new Toasty($(this), options);
					singleToasty.init();
				}
			}
 		});

	}

	$.fn.toasty.defaults = {
 		sound: true,
 		image: 'controlql.png',
 		sound: 'toasty.mp3'
 	};

})(jQuery);


// JavaScript Document
$(document).ready(function(e) {



	$('svg#culebra path').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
    function(e) {

    	//alert('fin animacion');

  	});

	setTimeout(function(){
		$('svg#culebra').addClass('giro');
		$('a.link_home').fadeIn('slow');
	},4000);


	$('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
		$(this).toggleClass('open');
		$('header ul.menu').slideToggle('slow');
	});

	$("body").toasty();

	$("header h1").click( function(){
           $("body").toasty('pop');
    });

});
