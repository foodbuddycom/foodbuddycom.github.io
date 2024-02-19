
$(function (){

    "use strict";

    var wind = $(window);

    //smooth scroll
    $('.navbar-nav').singlePageNav({
        speed:1000,
        currentClass:'active',
        offset:80
    });


    // navbar scrolling background
    wind.on("scroll",function () {

        var bodyScroll = $(window).scrollTop(),
            navbar = $(".navbar-default");

        if(bodyScroll > 300){

            navbar.addClass("nav-scroll");

        }else{

            navbar.removeClass("nav-scroll");
        }
    });

    //smooth button scroll
    $('.button-scroll').on('click', function(){

        var scrollTo = $(this).attr('data-scrollTo');

        $('body, html').animate({

        "scrollTop": $('#'+scrollTo).offset().top - 80
        }, 1000 );

    });


    // typejs
    $('header .caption h2').typed({
        strings: ["NUTRITION WORKSHOPS","ENDURANCE COACHING","CYCLING COACHING","RUNNING COACHING"],
        loop: true,
        startDelay: 1000,
        backDelay: 2000
    });


    // progress bar
    wind.on('scroll', function () {
        $(".skills-progress span").each(function () {
            var bottom_of_object =
            $(this).offset().top + $(this).outerHeight();
            var bottom_of_window =
            $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if(bottom_of_window > bottom_of_object) {
                $(this).animate({
                  width : myVal
                }, 2000);
            }
        });
    });


    // owlCarousel
    $('.clients .owl-carousel').owlCarousel({
        items:1,
        loop:true,
        mouseDrag:true,
        autoplay:true,
        smartSpeed:1000
    });


    // stellar
    wind.stellar();


    // magnificPopup
    $('.v-middle').magnificPopup({
      delegate: 'a',
      type: 'image'
    });


});


// Preloader

$(window).on("load",function (){

    $(".loading").fadeOut(500);

    // isotope
    $('.gallery').isotope({
      // options
      itemSelector: '.item-img'
    });

    var $gallery = $('.gallery').isotope({
      // options
    });

    // filter items on button click
    $('.filtering').on( 'click', 'span', function() {

        var filterValue = $(this).attr('data-filter');

        $gallery.isotope({ filter: filterValue });

    });

    $('.filtering').on( 'click', 'span', function() {

        $(this).addClass('active').siblings().removeClass('active');

    });

     // contact form
    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $('#contact-form').find('.messages').html(alertBox);
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    });

});


let bodyLockStatus = true;
let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}
let bodyUnlock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove("lock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}
let bodyLock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - body.offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - body.offsetWidth + 'px';
		document.documentElement.classList.add("lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}

const modal = document.querySelector(".popup-end");
const modalButton = document.querySelector(".popup-end__button");
const closeButton = document.querySelector(".popup-end__close");
const body = document.body
const openModal = () => {
  modal.classList.add("_open");
  let lock_padding = document.querySelectorAll("[data-lp]");
  for (let index = 0; index < lock_padding.length; index++) {
      const el = lock_padding[index];
      el.style.paddingRight = window.innerWidth - body.offsetWidth + 'px';
  }
  body.style.paddingRight = window.innerWidth - body.offsetWidth + 'px';
  document.documentElement.classList.add("lock");
};

const closeModal = () => {
  modal.classList.remove("_open");
  let lock_padding = document.querySelectorAll("[data-lp]");
      for (let index = 0; index < lock_padding.length; index++) {
          const el = lock_padding[index];
          el.style.paddingRight = '0px';
      }
      body.style.paddingRight = '0px';
      document.documentElement.classList.remove("lock");
  document.documentElement.classList.remove('lock')
};

function openOnScroll() {
    if (window.scrollY > window.innerHeight / 3  ) {
        window.removeEventListener('scroll', openOnScroll)
        openModal();
    }

}
function showPopupButton() {
    if(window.scrollY < window.innerHeight / 5 ){
        modal.classList.add('_hidden')
    } else[
        modal.classList.remove('_hidden')
    ]
}

window.addEventListener("scroll", openOnScroll);
window.addEventListener("scroll", showPopupButton);

modalButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
document.addEventListener('click', (el) => {
    const e = el.target;
    if(e.classList.contains('popup-end')){
        closeModal()
    }
})
document.addEventListener('keydown', evt => {
    evt = evt || window.event;
    evt.keyCode === 27 ? closeModal() : false;
  }
)