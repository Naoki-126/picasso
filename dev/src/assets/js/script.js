// alert("テスト");

/* ドロワー
=========================== */
jQuery("#js-drawer").on("click", function (e) {
  e.preventDefault();
  jQuery("#js-drawer").toggleClass("is-checked");
  jQuery("#js-drawer__content").toggleClass("is-checked");
});

/* fixedで固定したフローティングアイテムをフッターの上で止める
=========================== */
jQuery(window).on("scroll", function() {
	documentHeight = jQuery(document).height();
	scrollPosition = jQuery(this).height() + jQuery(this).scrollTop();
	footerHeight = jQuery("#js-footer").innerHeight();

	if (documentHeight - scrollPosition <= footerHeight) {
		jQuery(".l-btn__shop").css({
			position: "absolute",
			bottom: footerHeight + 10
		});
	} else {
		jQuery(".l-btn__shop").css({
			position: "fixed",
			bottom: 10
		});
	}
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
