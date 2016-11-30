/*
	Visualize by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

$(function() {

	// Vars.
		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#wrapper');
			$viewer = $('#viewer');

	// Breakpoints.
		skel.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Disable animations/transitions until everything's loaded.
		$body.addClass('is-loading');

		$window.on('load', function() {
			$body.removeClass('is-loading');
		});

	// Poptrox.
		$window.on('load', function() {
			/*
			if( navigator.userAgent.match(/Android/i)
				 || navigator.userAgent.match(/webOS/i)
				 || navigator.userAgent.match(/iPhone/i)
				 || navigator.userAgent.match(/iPod/i)
				 || navigator.userAgent.match(/BlackBerry/i)
				 || navigator.userAgent.match(/Windows Phone/i)
				 )
			{
				console.log("mobile");
				window.open(this.href);
			} else {
				console.log("not mobile");
			}
			*/
			//window.open("https://www.apple.com");
			//console.log("open it !");
			$('.thumbnails').poptrox({
				//window.open(this.href);
				onPopupClose: function() { $body.removeClass('is-covered'); },
				onPopupOpen: function() { $body.addClass('is-covered'); },
				baseZIndex: 10001,
				useBodyOverflow: false,
				usePopupEasyClose: true,
				overlayColor: '#000000',
				overlayOpacity: 0.75,
				usePopupCloser: false,
				popupLoaderText: 'Loading...',
				fadeSpeed: 400,
				popupWidth: window.innerWidth*0.8,
				popupHeight: window.innerHeight*0.7,
				usePopupDefaultStyling: false,
				windowMargin: (skel.breakpoint('small').active ? 5 : 50)
			});
			

		});

});