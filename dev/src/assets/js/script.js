// alert("テスト");

/* swiper
=========================== */
const swiper = new Swiper('#js-recruit__swiper', {
  loop: true,
  slidesPerView: 1,
  initialSlide: 1, // スライドの開始位置
  spaceBetween: 10,
  centeredSlides: true,

  breakpoints: {
    // when window width is >= 767px
    768: {
      centeredSlides: true,
      slidesPerView: 2,
      spaceBetween: 10,
    },

    // when window width is >= 999px
    1000: {
      centeredSlides: true,
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },

  // If we need pagination
  pagination: {
    el: '#js-recruit__pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '#js-recruit__next',
    prevEl: '#js-recruit__prev',
  },
});


/* アコーディオン
=========================== */
jQuery(".js-faq").on("click", function (e) {
  e.preventDefault();

  if (jQuery(this).parent().hasClass("is-open")) {
    jQuery(this).parent().removeClass("is-open");
    jQuery(this).next().slideUp();
  } else {
    jQuery(this).parent().addClass("is-open");
    jQuery(this).next().slideDown();
  }
});

// カレント表示
const links = jQuery(".c-btn__category");

links.each(function () {
    if (this.href === location.href) {
        jQuery(this).closest(".c-btn__category ").addClass("current");
    }
});
