$(document).ready(function() {
	headerSection();
	teamSection();
	testimonialsSection();
	gallerySection();
});

function headerSection() {
	$('.navbar li').on('click', function() {
		var $this = $(this),
			sectionId = $this.attr('href'),
			scrollDistance = $(sectionId)[0].offsetTop,
			$activeNavItem = $('li.active');

		$('body').animate({
			scrollTop: scrollDistance
		}, {
			duration: 1000,
			complete: function() {
				console.log("Animation complete");
			}
		});

		$activeNavItem.removeClass('active');
		$this.addClass('active');
		
		if($('#navbar').height() > 70){
			$('#navbar').collapse('toggle');
		}
		
	});

	$(window).on('scroll', function(event) {
		var $this = $(this),
			scrollTop = $this.scrollTop(), // window 的 相对滚动条的距离
			$currentNavItem = $('li.active'), // 当前激活中的 nav item
			$sections = $('[class*="section-"]'), // 所有的sections
			activeSection, // 要被滚动到的section
			$activeNavItem; // 要被激活的nav item

		$sections.each(function(index, entry) {
			var sectionOffsetTop = entry.offsetTop;
			if (scrollTop > (sectionOffsetTop - 70)) {
				activeSection = entry;
			}
		});

		if (activeSection) {
			$activeNavItem = $('li[href*="' + activeSection.id + '"]');
			$currentNavItem.removeClass('active');
			$activeNavItem.addClass('active');

			if (activeSection.id == 'hero' || activeSection.id == 'info-3columns') {
				$('li').eq(0).addClass('active');
			}
		}

	});
}

function teamSection() {

	$(".teams-slideshow").owlCarousel({

		autoPlay: 6000, //Set AutoPlay to 3 seconds

		items: 4,
		itemsDesktop: [1199, 4],
		itemsDesktopSmall: [979, 3],
		stopOnHover: true

	});

	$('[data-toggle="tooltip"]').tooltip();
}

function testimonialsSection() {
	$(".testimonials-slide").owlCarousel({
		autoPlay: 6000,
		navigation: false, // Show next and prev buttons
		pagination: false,
		slideSpeed: 300,
		paginationSpeed: 400,
		singleItem: true,
		stopOnHover: true

	});
}

function gallerySection() {

	$('.section-gallery .row').magnificPopup({
		delegate: 'a',
		type: 'image',
		image: {
			markup: '<div class="mfp-figure something-else">' +
				'<button class="mfp-close"></button>' +
				'<figure>' +
				'<img class="mfp-img" />' +
				'<figcaption>' +
				'<div class="mfp-bottom-bar">' +
				'<div class="mfp-title">Title</div>' +
				'<div class="mfp-counter"></div>' +
				'</div>' +
				'</figcaption>' +
				'</figure>' +
				'</div>',
			titleSrc: function(item) {
				return '<span>' + item.el.attr('title') + '</span>' + ' Hi!';
			}
		},
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		zoom: {
			enabled: true,
			duration: 300,
			easing: 'ease-in-out'
		},
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
		},
		callbacks: {
			close: function() {
				location.hash = "";
			},
			change: function() {
				console.log('Content changed');

				location.hash = "gallery-" + this.currItem.el.data("image_id");
			}

		}
	});

	loadGalleryDeepLink();

	function loadGalleryDeepLink() {
		var prefix = "#gallery-";
		var h = location.hash;

		if (document.g_magnific_hash_loaded === undefined && h.indexOf(prefix) === 0) {
			h = h.substr(prefix.length);
			var $img = $('*[data-image_id="' + h + '"]');

			if ($img.length) {
				document.g_magnific_hash_loaded = true;
				$img.parents().find('.popup-gallery').magnificPopup("open", $img.index());
			}
		}
	}

}