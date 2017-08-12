function setWelcome() {
	var t = $('.welcome');
	var baseHeight,
		bigSquareheight,
		portraitHeight,
		totalHeight;
	var isMobile = false;
	if ( Modernizr.mq('(min-width:1501px)') ) {
		//baseHeight = t.width()/6;
		baseHeight = ($(window).height()-$('header').height()-4)/3;
		if ( baseHeight < t.width()/9 ) {
			baseHeight = t.width()/9;
		} else if ( baseHeight > t.width()/6 ) {
			baseHeight = t.width()/6;
		}
		bigSquareHeight = baseHeight*2;
		portraitHeight = baseHeight*3;
		totalHeight = baseHeight*3;
	} else if ( Modernizr.mq('(max-width:1500px)') && Modernizr.mq('(min-width:1101px)') ) {
		//baseHeight = t.width()/5;
		baseHeight = ($(window).height()-$('header').height()-4)/4;
		if ( baseHeight < t.width()/9 ) {
			baseHeight = t.width()/9;
		} else if ( baseHeight > t.width()/5 ) {
			baseHeight = t.width()/5;
		}
		bigSquareHeight = baseHeight*2;
		portraitHeight = baseHeight*4;
		totalHeight = baseHeight*4;
	} else if ( Modernizr.mq('(max-width:1100px)') && Modernizr.mq('(min-width:768px)') ) {
		//baseHeight = t.width()/3;
		baseHeight = ($(window).height()-$('header').height()-4)/5;
		if ( baseHeight < t.width()/4 ) {
			baseHeight = t.width()/4;
		} else if ( baseHeight > t.width()/3 ) {
			baseHeight = t.width()/3;
		}
		bigSquareHeight = baseHeight;
		portraitHeight = baseHeight*3;
		totalHeight = baseHeight*5;
	} else if ( Modernizr.mq('(max-width:767px)') ) {
		isMobile = true;
	}
	if ( $('.welcome.slick-initialized').length ) {
		$('.welcome').slick('unslick');
	}
	if ( !isMobile ) {
		t.height(totalHeight);
		t.find('.item').each(function() {
			var e = $(this);
			if ( e.attr('data') == 'square' ) {
				e.height(baseHeight-4);
			} else if ( e.attr('data') == 'bigsquare' ) {
				e.height(bigSquareHeight-4);
			} else if ( e.attr('data') == 'portrait' ) {
				e.height(portraitHeight-4);
			}
		});
	} else {
		var sliderHeight = $(window).height()-$('.header').height();
		if ( sliderHeight < $(window).width()/320*510 ) {
			sliderHeight = $(window).width()/320*510;
		}
		t.height(sliderHeight);
		t.find('.item').each(function() {
			$(this).height(sliderHeight);
		});
		$('.welcome').slick({
			slidesToScroll: 1,
			slidesToShow: 1,
			arrows: true,
			dots: false,
			infinite: true,
			cssEase: 'ease-out',
			speed: 300
		});
	}
	t.find('.icon').each(function() {
		$(this).width($(this).height());
	});
}
function setImgCover(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'cover'
		});
	});
}
function setImgContain(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'contain'
		});
	});
}
function animateAppearance() {
	$('.animated').each(function() {
		if ( $(window).scrollTop() > $(this).offset().top-$(window).height() && !$(this).hasClass('complete') ) {
			var t = $(this);
			setTimeout(function() {
				t.addClass('complete')
			}, Math.random()*500);
		}
	});
}
$(function() {
	setImgCover($('.img-cover'));
	setImgContain($('.img-contain'));

	var isMobile = false;
	var justSwitched = false;
	function setEqualHeight() {
		$('[data-equal]').each(function() {
			var t = $(this).find('[data-elem]');
			if ( !isMobile ) {
				var max = 0;
				t.each(function() {
					var h = $(this).outerHeight(); 
					max = h > max ? h : max;
				});
				t.outerHeight(max);
			} else {
				t.outerHeight('auto');
			}
		});
	}
	function detectDevice() {
		var temp = isMobile;
		if ( Modernizr.mq('(max-width:960px)') ) {
			isMobile = true;
		} else {
			isMobile = false;
		}
		if ( temp == isMobile ) {
			justSwitched = false;
		} else {
			justSwitched = true;
		}
	}
	
	function startApp() {
		if ( $('.welcome').length ) {
			setWelcome();
		}
		detectDevice();
		if ( justSwitched ) {
			if ( isMobile ) {
				if ( $('.about--event').length ) {
					$('.about__rc').detach().insertBefore($('.about__lc'));
				}
			} else {
				if ( $('.about--event').length ) {
					$('.about__rc').detach().insertAfter($('.about__lc'));
				}
			}
		}
		setEqualHeight();
	}
	startApp();
	$(window).on('resize', _.debounce(function() {
		startApp();
	}, 100));
	animateAppearance();
	$(window).on('scroll', function() {
		animateAppearance();
	});
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	function openMenu() {
		$('.menu').addClass('is-opened');
	}
	function closeMenu() {
		$('.menu').removeClass('is-opened');
	}
	$('.menu--private a').on('click', function(e) {
		e.preventDefault();
		$(this).parents('.menu--private').hide();
		$('[data-menu-tab="'+$(this).attr('href')+'"]').show().siblings('[data-menu-tab]').hide();
		$('.menu--back').show();
	});
	$('.menu--back').on('click', function(e) {
		e.preventDefault();
		$(this).hide();
		$('.menu--private').show();
		$('[data-menu-tab="nav"]').show().siblings('[data-menu-tab]').hide()
	});
	$('.menu-open').on('click', function(e) {
		e.preventDefault();
		openMenu();
	});
	$('.menu--close').on('click', function(e) {
		e.preventDefault();
		closeMenu();
	});
	$(document).on('click', function(e) {
		if ( !$(e.target).closest('.menu').length && !$(e.target).closest('.menu-open').length ) {
			closeMenu();
		}
	});
	$('.about__courses--title').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('is-dropped');
	});
	$('.reviews__item .more').on('click', function(e) {
		e.preventDefault();
		var t = $(this).parents('.reviews__item').find('.hidden');
		if ( t.is(':hidden') ) {
			t.show();
			$(this).text('Свернуть');
		} else {
			t.hide();
			$(this).text('Читать далее');
		}
	});
});