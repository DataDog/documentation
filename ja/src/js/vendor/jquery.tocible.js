/*
 * jquery.tocible.js v1.2.0, Tocible
 *
 * Copyright 2014 Mark Serbol.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/MIT.
 *
 * A lightweight table of contents navigation plugin
 * https://github.com/markserbol/tocible
 *
 */

;(function($){
  var defaults = {
		heading:'h2',
		subheading:'h3',
	  	subsubheading:'h4',
		reference:'.ref',
		title:'',
		hash:false,
		offsetTop:50,
		speed:800,
		collapsible:true,
		maxWidth:150
  };

  $.fn.tocible = function(options){
		var opts = $.extend({}, defaults, options);
		var current_target;

		return this.each(function(){
			var wrapper = $(this), nav, ref, heading, subheading, subsubheading, left;

			wrapper.find('.tocible').remove();

			ref = wrapper.find(opts.reference);
			//ref.css({'visibility':'hidden'});

			left = ref.offset().left;

			nav = $('<div/>', {'class':'tocible', html:'<ul/>'});
			//nav.css({'max-width': opts.maxWidth})

			$('#toc-box').append(nav);

			//wrapper.append(nav).css({'position':'relative'});

			if(opts.title){
				var title = $(opts.title).length ? $(opts.title).text() : opts.title;
				var head = $('<div/>', {'class':'tocible_header', html:title+'<span/>' });

				head.prependTo(nav).click(function() {
					$(this).siblings('ul').slideToggle({
						duration: 'slow',
						step: contain
					});

					$(this).find('span').toggleClass('toc_open');
				});
			}

			heading = wrapper.find(opts.heading);
			subheading = wrapper.find(opts.subheading);
			subsubheading = wrapper.find(opts.subsubheading);

			heading.add(subheading.add(subsubheading)).each(function() {
				var el = $(this), href, title, type, anchor, list;

				href = el.attr('id') ? '#'+el.attr('id'): '#';
				title = el.text();

				if(el.is(heading)) {
					type = 'heading';
				} else if(el.is(subheading)) {
					type = 'subheading';
				} else if(el.is(subsubheading)) {
					type = 'subsubheading';
				}

				anchor = $('<a/>', {text:title, href:href});
				list = $('<li/>', {'class':'tocible_'+type});
				list.append(anchor).appendTo('.tocible > ul');

				anchor.click(function(e) {
					e.preventDefault();

					var offset = el.offset();

					if(opts.hash){
					var winTop = $(window).scrollTop();

					if(history.pushState){
							history.pushState({}, document.title, href);
						}else{
							window.location.hash = href;
							$(window).scrollTop(winTop);
						}
					}
					$('html, body').stop(true).animate({scrollTop:offset.top - 110}, opts.speed);
				});

			});

			contain = function(){
				var winTop = $(window).scrollTop(), wrapTop = wrapper.offset().top;

				nav.css({'top':opts.offsetTop, 'bottom':'auto', 'left':left});

				if(wrapTop + wrapper.outerHeight() <= winTop + nav.height() + opts.offsetTop){
					nav.css({
						'position':'absolute',
						'bottom':0,
						'top':'auto',
						'left':ref.position().left
					});

				}else if(winTop >= wrapTop){
					nav.css({
						'position':'fixed',
						'bottom':'auto',
						'top':opts.offsetTop,
						'left':ref.offset().left
					});
				}else{
					nav.css({
						'position':'absolute',
						'left':ref.position().left
					});

				}
			};

			onScroll = function(){
				if(opts.collapsible){ $('.tocible li.tocible_subheading').hide(); }

				heading.add(subheading).each(function(index) {
					var el = $(this), elTop = el.offset().top,
					target = $('.tocible li').eq(index),
					winTop = $(window).scrollTop();

					if(winTop >= elTop - 120){
						target.addClass('toc_scrolled').siblings().removeClass('toc_scrolled');
						if(opts.collapsible){
							target.siblings().filter('.tocible_subheading').hide();
							if(target.is('.tocible_subheading')){
								target.prevAll('.tocible_heading:first').nextUntil('.tocible_heading').show();
							}else if(target.is('.tocible_heading')){
								target.nextUntil('.tocible_heading').show();
							}
						}
					}else{
						target.removeClass('toc_scrolled');
					}
				});
			};

			$(window).on('resize scroll',function(e) {
	        //contain();
					onScroll();
	      }).trigger('scroll');

		});
  };

})(jQuery);