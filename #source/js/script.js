$(document).ready(function(){
	$('.carousel__inner').slick({
		speed: 500,
		prevArrow: '<button type="button" class="slick-prev"><img src="img/icons/left-arrow.png"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="img/icons/right-arrow.png"></button>',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					infinite: true,
					dots: true,
					arrows: false
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
					}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
			}
		}
		]
	});

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active ');
	});

	function toggleSlide(item) {
		$(item).each(function(i) {
		$(this).on('click', function(e) {
			e.preventDefault();
			$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
			$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
		})
	});
	}

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	$('[data-modal=consultation]').on('click', function(){
		$('.overlay, #consultation').fadeIn();
	});
	$('.catalog-item__btn').on('click', function(){
		$('.overlay, #order').fadeIn();
	});
	$('.catalog-item__btn').each(function(i){
		$(this).on('click', function(){
			$('#order .modal__subtitle').text($('.catalog-item__subtitle').eq(i).text());
		})
	})

	$('.modal__close').on('click', function(){
		$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
	})

	function validateForms(form) {
		$(form).validate({
			rules: {
				name: "required",
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: "Пожалуйста, введите своё имя",
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
					required: "Пожалуйста, введите свою почту",
					email: "Неправильный формат почтового ящика"
				}
			}
		});
	};

	validateForms('#consultation-form');
	validateForms('#consultation .feed-form');
	validateForms('#order form');

	$("input[name=phone]").mask("+7 (999) 999-99-99");

	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function(){
			$(this).find('input').val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset')
		});
		return false;
	});
}); 