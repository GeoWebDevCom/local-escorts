$(window).resize(function() {
  makeUp();
	pupMakeup();
	$(".header-map-wrapper.active").css({
		height:$(window).height() - $(".header-top").height() - $(".header-bottom").height()
	})
	
});

$(window).scroll(function() {
  var scrollPos = $(window).scrollTop();
	
	if (scrollPos > 100) {
		$(".header-map-wrapper").css({
			height: 20
		}).data("init-height",20)
	} else {
		$(".header-map-wrapper").css({
			height: 65
		}).data("init-height",65)
	}
	
})

$(window).load(function() {
  makeUp()
})

$(document).ready(function() {
  
	makeUp();
	
	
	$(".sidebar-content").mCustomScrollbar();
	$(".cat-filter-ext-content").mCustomScrollbar();
	$(".cat-filter-metro-list").mCustomScrollbar();
	$(".cat-filter-sort-list").mCustomScrollbar();
	$(".settings-content").mCustomScrollbar();
	$(".location-selector-col-content").mCustomScrollbar();
	
	// Разворачивание отзывов в списке моделей
	
	$("body").on("click",".models-list-expandable-trigger",function() {
		if (!$(this).hasClass("active")) {
			$(this).find(".trigger-text").html($(this).find(".trigger-text").data("collapsetext"))
		} else {
			$(this).find(".trigger-text").html($(this).find(".trigger-text").data("expandtext"))
		}
		$(this).toggleClass("active");
		$(this).next(".models-list-block-expandable").slideToggle(400);
		
	})
	
	// Инфо об агентстве
	
	$(".agency-page-menu-more-trigger").on("click",function() {
		$(this).toggleClass("active");
		$(".agency-more").slideToggle(250);
	});
	
	// Навигация в профиле пользователя
	
	$(".settings-menu a").on("click",function() {
		$(".settings-menu a").removeClass("active");
		$(this).addClass("active");
		$(".settings-content").mCustomScrollbar("scrollTo",$("a[name='"+$(this).attr("href").replace("#","")+"']"));
		return false;
	})
	
	// Разворачиваемые блоки
	
	$("body").on("click",".block-expandable-trigger",function() {
		if (!$(this).parents(".block-expandable").hasClass("block-expandable-expanded")) {
			$(this).find("span").html($(this).find("span").data("collapsetext"))
			$(this).parents(".block-expandable").find(".block-expandable-content").hide().stop().slideDown(500,function() {
				$(this).parents(".block-expandable").addClass("block-expandable-expanded");
			});
		} else {
			$(this).find("span").html($(this).find("span").data("expandtext"))
			$(this).parents(".block-expandable").find(".block-expandable-content").show().stop().slideUp(500,function() {
				$(this).parents(".block-expandable").removeClass("block-expandable-expanded");
			});
		}
	});
	
	// Вывод каталога плиткой
	
	var $catContainer = $(".catalogue");
	
	$(".catalogue-item").css({
		opacity: 0
	})
	
	$catContainer.imagesLoaded( function() {
		$catContainer.masonry({
			itemSelector: '.catalogue-item',
			gutter: 10,
			isFitWidth: true,
			isInitLayout: false
		});
		
		$.when( $catContainer.masonry('layout') ).done(function(x) { 
			$(".catalogue-item").animate({
				opacity: 1
			},500)
		});
		
	});
	
	
	
	// Бесконечный скролл каталога
	
	var ias = $.ias({
		container: ".catalogue",
		item: ".catalogue-item",
		pagination: "#pagination",
		next: ".next a"
	});

	ias.on('render', function(items) {
		$(items).css({ opacity: 0 });
	});

	ias.on('rendered', function(items) {
		$catContainer.imagesLoaded( function() {
			$catContainer.masonry("appended",items);
		});
	});

	ias.extension(new IASSpinnerExtension());
	//ias.extension(new IASNoneLeftExtension({html: '<div class="ias-noneleft" style="text-align:center"><p><em>You reached the end!</em></p></div>'}));
	
	// Чекбоксы
	
	$("input:checkbox").each(function() {
		if ($(this).is(":checked")) {
			$(this).parents("label").addClass("checked")
		}
	})
	
	$("body").on("change","input:checkbox",function() {
		if ($(this).is(":checked")) {
			$(this).parents("label").addClass("checked")
		} else {
			$(this).parents("label").removeClass("checked")
		}
	})
	
	// Слайдеры в фильре
	
	var numFormat = wNumb({
		thousand: ' '
	});
	
	$(".filter-slider-range").each(function() {
		$(this).noUiSlider({
			start: [$(this).data("start"), $(this).data("finish")],
			connect: true,
			range: {
				'min': $(this).data("min"),
				'max': $(this).data("max")
			},
			step: 1
		});
		
		$(this).Link('lower').to($(this).parents(".filter-slider-wrapper").find(".slider-input-from"),null,{
			to: parseInt
		});
		$(this).Link('upper').to($(this).parents(".filter-slider-wrapper").find(".slider-input-to"),null,{
			to: parseInt
		});
		
		$(this).Link('lower').to('-inline-<div class="slider-tooltip"></div>', function ( value ) {

			// The tooltip HTML is 'this', so additional
			// markup can be inserted here.
			$(this).html(
				'<span>' + numFormat.to(value) + '</span>'
			);
		},{
			to: parseInt
		})
		
		$(this).Link('upper').to('-inline-<div class="slider-tooltip"></div>', function ( value ) {

			// The tooltip HTML is 'this', so additional
			// markup can be inserted here.
			$(this).html(
				'<span>' + numFormat.to(value) + '</span>'
			);
		},{
			to: parseInt
		})
		
	})
	
	// Звездочки рейтинга
	
	$(".rating-btn-group .btn").on("click",function() {
		$(this).prevAll(".btn").removeClass("act")
		$(this).nextAll(".btn").removeClass("act")
		$(this).prevAll(".btn").addClass("act")
	})
	
	// Селекты
	
	$("select").customSelect();
	
	// Формы
	
	$("input:text, input:password, textarea").each(function() {
    if ($(this).val()) {
      $(this).prev(".placeholder").hide();
    }
  });
	
	$("body").on("focus","input, textarea",function() {
		var item = $(this);
		
		if (item.parent().find(".placeholder").length) {
			var placeholder = item.parent().find(".placeholder");

			if (item.hasClass("phone") || item.hasClass("form-date")) {
				placeholder.hide();
			}
			
		}
		
	});
	
	$("body").on("keydown","input, textarea",function() {
		var item = $(this);
		
		if (item.parent().find(".placeholder").length) {
			var placeholder = item.parent().find(".placeholder");

			if (!item.hasClass("phone") && !item.hasClass("form-date")) {
				placeholder.hide();
			}
			
		}
		
	});
	
	$("body").on("blur","input, textarea",function() {
		var item = $(this);
		
		if (item.parent().find(".placeholder").length) {
			var placeholder = item.parent().find(".placeholder");

			if (!item.val() || (item.hasClass("masked") && ! /\d/.test(item.val()))) {
				placeholder.show();
			}
			
		}
		
	});
	
	$("body").on("click",".placeholder",function(e) {
		if ($(this).parent().find("input").length) {
			$(this).parent().find("input").trigger("focus");
		}
		if ($(this).parent().find("textarea").length) {
			$(this).parent().find("textarea").trigger("focus");
		}
	})
	
	// Открытие дополнительного фильтра
	
	$(".filter-more-trigger").on("click",function() {
		$(".filter-selector").not($(this)).removeClass("active");
		$(".filter-more-trigger").not($(this)).removeClass("active");
		$(".cat-filter-metro").removeClass("cat-filter-metro-open");
		$(".cat-filter-sort").removeClass("cat-filter-sort-open");
		$(this).toggleClass("active");
		$(".cat-filter-ext").toggleClass("cat-filter-ext-open");
	})
	
	$(".cat-filter-ext-close").on("click",function() {
		$(".filter-more-trigger").removeClass("active");
		$(".cat-filter-ext").removeClass("cat-filter-ext-open");
	});

	$(".cat-filter-ext .button-cancel").on("click",function() {
		$(".filter-more-trigger").removeClass("active");
		$(".cat-filter-ext").removeClass("cat-filter-ext-open");
	});
	
	$(".filter-selector-metro").on("click",function() {
		$(".filter-selector").not($(this)).removeClass("active");
		$(".filter-more-trigger").not($(this)).removeClass("active");
		$(".cat-filter-ext").removeClass("cat-filter-ext-open");
		$(".cat-filter-sort").removeClass("cat-filter-sort-open");
		$(this).toggleClass("active");
		$(".cat-filter-metro").toggleClass("cat-filter-metro-open");
	})
	
	$(".cat-filter-metro .button-cancel").on("click",function() {
		$(".filter-selector-metro").removeClass("active");
		$(".cat-filter-metro").removeClass("cat-filter-metro-open");
	});
	
	$(".filter-selector-sort").on("click",function() {
		$(".filter-selector").not($(this)).removeClass("active");
		$(".filter-more-trigger").not($(this)).removeClass("active");
		$(".cat-filter-metro").removeClass("cat-filter-metro-open");
		$(".cat-filter-ext").removeClass("cat-filter-ext-open");
		$(this).toggleClass("active");
		$(".cat-filter-sort").toggleClass("cat-filter-sort-open");
	})
	
	$(".cat-filter-sort .button-cancel").on("click",function() {
		$(".filter-selector-sort").removeClass("active");
		$(".cat-filter-sort").removeClass("cat-filter-sort-open");
	});
	
	// Маски текстовых полей
	
	$("input.digits_3").mask("9?99")
	$("input.digits_2").mask("9?9")
	
	// Текстовые поля дипапзона
	
	$(".input-from").on("keyup change blur mouseup",function() {
		
		inputFrom = $(this);
		inputTo = $(this).parents(".params-range").find(".input-to");
		
		fromVal = inputFrom.val();
		toVal = inputTo.val();
		
		fromValLength = fromVal.replace(/_/g, "").length;
		toValLength = toVal.replace(/_/g, "").length;
		
		if (fromVal != "" && toVal != "" && fromValLength >= toValLength && fromVal > toVal) {
			inputFrom.val(toVal)
		}
		
	})
	
	$(".input-to").on("keyup change blur mouseup",function() {
		
		inputTo = $(this);
		inputFrom = $(this).parents(".params-range").find(".input-from");
		
		fromVal = inputFrom.val();
		toVal = inputTo.val();
		
		fromValLength = fromVal.replace(/_/g, "").length;
		toValLength = toVal.replace(/_/g, "").length;
		
		if (fromVal != "" && toVal != "" && toValLength >= fromValLength && toVal < fromVal) {
			inputTo.val(fromVal)
		}
		
	})
	
	// Конвертация единиц в формах
	
	$(".radio_units").on("change",function() {
		if ($(this).is(":checked")) {
			var converter = $(this);
			var target = $("input").filter(function () {
				return $(this).data("converter") == converter.data("target")
			})
			var factor = converter.data("factor");
			
			target.each(function() {
				if ($(this).val() != "") {
					$(this).val(Math.round(parseFloat($(this).val())*factor))
				}
			})
			
		}
	});
	
	// Поиск метро
	
	$("#metro_search_input").on("keyup",function() {
		var inputVal = $(this).val();
		
		var items = $(".cat-filter-metro-list .form-checkbox");
		
		if (inputVal != "") {
			$(".cat-filter-metro-list .letter").hide();
			items.hide();
			items.filter(function() {
				return $(this).text().toLowerCase().indexOf(inputVal.toLowerCase()) >= 0
			}).show();
		} else {
			$(".cat-filter-metro-list .letter").show();
			items.show();
		}
		
	})
	
	// Сворачивание и разворачивание карты в шапке
	
	$(".header-map-wrapper").data("init-height",$(".header-map-wrapper").height())
	$(".header-map-trigger").on("click",function() {
		if (!$(this).hasClass("active")) {
			$(this).html($(this).data("collapsetext"))
			$(".header-map-wrapper").addClass("active");
			$(".header-map-wrapper").css({
				height:$(window).height() - $(".header-top").height() - $(".header-bottom").height()
			})
			
		} else {
			$(".header-map-wrapper").removeClass("active");
			$(this).html($(this).data("expandtext"))
			$(".header-map-wrapper").css({
				height:$(".header-map-wrapper").data("init-height")
			})
		}
		$(this).toggleClass("active");
		
	});
	
	// Сворачивание-разворачивание сайдбара
	
	$(".sidebar-trigger").not(".disabled").on("click",function() {
		$(this).toggleClass("active");
		$(".sidebar").toggleClass("sidebar-collapsed");
		$(".main-col").toggleClass("main-col-wide");
		var t = setTimeout(function() {
			$catContainer.masonry('layout')
		},1000)
	})
	
	// Поповеры в шапке
	
	$("html").on("mouseup", function(e) {
    if(!$(e.target).parents(".popover").length) {
			$(".popover").each(function(){
				$("[aria-describedby='"+$(this).attr("id")+"']").popover("hide");
			});
    }
	});
	
	$(".menu-selector-trigger").popover({
		trigger: "click",
		placement: "bottom",
		html: true,
		content: function() {
      return $(this).next('.popover-cont').html();
    },
		template: '<div class="popover menu-selector-popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>'
	})
	
	// Поповеры в верхних объявлениях
	
	$(".header-promo-item .piclink").popover({
		trigger: "click",
		container: "body",
		placement: "bottom",
		html: true,
		content: function() {
      return $(this).parent().find('.popover-content').html();
    },
		template: '<div class="popover promo-popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>'
	})
	
	
	
	// Поповер пользователя
	
	$(".user-badge").popover({
		trigger: "click",
		container: ".user-badge-wrapper",
		placement: "bottom",
		html: true,
		content: function() {
      return $("#userPopover").html();
    },
		template: '<div class="popover user-popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>'
	})
	
	// Поповер Инфо в каталоге
	
	$("body").on("click",".cat-pic-hover-button",function() {
		return false;
	});
	
	var infoPopOverSettings = {
    trigger: "click",
		placement: "bottom",
		html: true,
		content: function() {
      return $(this).parents(".catalogue-item").find('.info-popover-content').html();
    },
		selector: ".cat-pic-hover-button-info",
		template: '<div class="popover info-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	}
	
	$('body').popover(infoPopOverSettings);
	
	// $(".cat-pic-hover-button-info").popover({
		
	// })
	
	$("body").on("click", ".popover-close", function (e) {
    var popLink = $("[aria-describedby='"+$(this).parents(".popover").attr("id")+"']");
		popLink.popover("hide");
		return false;
	});
	
	// Попапы
	
	$("body").on(".info-popover-name","click",function() {
		$(this).parents(".catalogue-item").find(".cat-pic").trigger("click")
	});
	
	// Центрирование попапа по высоте
	
	$('.modal').on('loaded.bs.modal', function() {
		
		if ($(this).hasClass("model-popup")) {
			modelPopupInit();
		}
		
		pupMakeup();
		
		
	});
	
	$('.modal').on('shown.bs.modal', function() {
		
		pupMakeup();
		
		
		
	});
	
	// Клик по параметрам в каталоге переключает чекбоксы в фильтре
	
	$("body").on("click",".cat-feature-new",function() {
		$("input#sidebar-filter-new").prop("checked",true).trigger("change")
	})
	
	$("body").on("click",".cat-feature-video",function() {
		$("input#sidebar-filter-video").prop("checked",true).trigger("change")
	})
	
	$("body").on("click",".cat-feature-pornstar",function() {
		$("input#sidebar-filter-pornstar").prop("checked",true).trigger("change")
	})
	
	$("body").on("click",".cat-feature-travel",function() {
		$("input#sidebar-filter-travel").prop("checked",true).trigger("change")
	})
	
	$(".fancybox").fancybox({
		helpers: {
			overlay: {
				locked: false
			}
		}
	});
	
	// Комментарии в попапе модели
	
	$("body").on("click",".model-review-text-trigger",function() {
		if (!$(this).hasClass("model-review-text-trigger-on")) {
			$(this).addClass("model-review-text-trigger-on")
			$(this).prev(".model-review-text-cont").css({
				maxHeight: $(this).prev(".model-review-text-cont").find(".cont").height() + 20
			});
		} else {
			$(this).removeClass("model-review-text-trigger-on")
			$(this).prev(".model-review-text-cont").css({
				maxHeight: 90
			});
		}
	})
	
});

function modelPopupInit() {
  // Галерея модели
	
	$('.model-med-carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$(".model-tmb-carousel .selected").removeClass("selected")
		$(".model-tmb-carousel .slick-slide").eq(nextSlide).addClass("selected")
	});
	
	$('.model-med-carousel').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		fade: true,
		lazyLoad:'ondemand',
		asNavFor:".model-tmb-carousel",
		infinite:false
	});
	$('.model-tmb-carousel').slick({
		slidesToShow: 5,
		slidesToScroll: 3,
		dots: false,
		centerMode: false,
		focusOnSelect: true,
		asNavFor:".model-med-carousel",
		infinite:false
	});
	
	$(".model-tmb-carousel .slick-slide").on("click",function() {
		$(".model-tmb-carousel .selected").removeClass("selected")
		$(this).addClass("selected")
	});
	
	// google.maps.event.addDomListener(window, 'load', initModelMap);
	
	//initModelMap();
	
	var $catContainer = $(".model-popup .catalogue");
	
	$(".model-popup .catalogue-item").css({
		opacity: 0
	})
	
	$catContainer.imagesLoaded( function() {
		$catContainer.masonry({
			itemSelector: '.model-popup .catalogue-item',
			gutter: 6,
			isFitWidth: true,
			isInitLayout: false
		});
		
		$.when( $catContainer.masonry('layout') ).done(function(x) { 
			$(".model-popup .catalogue-item").animate({
				opacity: 1
			},500)
		});
		
	});
	
}

function initModelMap() {
		var mapOptions = {
			zoom: 14,
			center: new google.maps.LatLng(55.749792,37.632495)
		}
		var map = new google.maps.Map(document.getElementById('modelMap'),
																	mapOptions);

		var image = 'images/model-map-pin.png';
		var myLatLng = new google.maps.LatLng(55.749792,37.632495);
		var beachMarker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				icon: image
		});
	}


$.fn.customSelect = function() {
	var selects = $(this);
	selects.each(function () {
		var select = $(this);
		
		if (!$(this).next(".param-selector").length) {
			select.css("visibility","hidden").css("position","absolute").css("z-index","-1");
			select.before("<div class='param-selector' id='" + select.attr("id") + "-selector'>");
			var selector = select.prev(".param-selector");
			
			if (select.is(":disabled")) {
				selector.addClass("selector-disabled")
			}
			
			
			selector.append("<div class='param-sel' />").append("<div class='dropdown' />");
			var dropdown = selector.find(".dropdown");
			var paramSel = selector.find(".param-sel");
			paramSel.addClass("initial");
			paramSel.append("<div class='arr' />");
			paramSel.append("<div class='sel-value' />");
			
			
			
			if (select.val()) {
				curOption = select.find("option[value='" + select.val() + "']");
				if (curOption.data("img")) {
					img = "<img class='sel-pic' src='"+curOption.data("img")+"' />";
				} else {
					img = "";
				}
				paramSel.find(".sel-value").html(img + select.find("option[value='" + select.val() + "']").html());
			} else {
				curOption = select.find("option:not(:disabled)").first();
				if (curOption.data("img")) {
					img = "<img class='sel-pic' src='"+curOption.data("img")+"' />";
				} else {
					img = "";
				}
				paramSel.find(".sel-value").html(img + select.find("option:not(:disabled)").first().html());
			}
			
			select.find("option").each(function () {
				
				if ($(this).data("img")) {
					img = "<img class='sel-pic' src='"+$(this).data("img")+"' />";
				} else {
					img = "";
				}
				
				if ($(this).val() != select.val()) {
					dropdown.append("<div class='option' val='" + $(this).attr("value") + "'>" + img + $(this).html() + "</div>");
				} else {
					dropdown.append("<div class='option' class='selected' val='" + $(this).attr("value") + "'>" + img + $(this).html() + "</div>");
				}
				
			});
			
			dropdown.mCustomScrollbar();
		
			paramSel.on("click",function() {
				$(this).parents(".common-form").find(".form-item").css("z-index",1);
				$(this).parents(".form-item").css("z-index",10);
				if (!select.is(":disabled")) {
					if (dropdown.css("display") != "block") {
						$(".dropdown").fadeOut(150);
						$(".param-open").removeClass("param-open");
						dropdown.fadeIn(150);
						
						if (selector.offset().top - $(window).scrollTop() + 20 > $(window).height()/2 && selector.offset().top + 40 + dropdown.height() - $(window).scrollTop() > $(window).height()) {
							dropdown.css("bottom",40)
						} else {
							dropdown.css("bottom","auto")
						}
						
						selector.addClass("param-open");
						var maxWidth = 0;
						
						$(this).parents(".form-item").prevAll(".form-item").css("z-index","10");
						$(this).parents(".form-item").css("z-index","11");
						$(this).parents(".form-item").nextAll(".form-item").css("z-index","10");
						
						dropdown.find("div").each(function () {
							if ($(this).width() >= maxWidth) {
								maxWidth = $(this).width();
							}
							if (paramSel.width() >= maxWidth) {
								maxWidth = paramSel.width() + 1;
							}
						});
						
					} else {
						dropdown.fadeOut(150);
						selector.removeClass("param-open");
					}
				}
			});
			
			dropdown.on("click", "div.option", function() {
				selector.removeClass("param-sel-error");
				paramSel.removeClass("initial");
				var div = $(this);
				paramSel.find(".sel-value").html($(this).html());
				if ($(this).attr("flag")) {
					paramSel.find(".sel-value").attr("flag",$(this).attr("flag"));
				}
				select.val($(this).attr("val")).change();
				if (select.hasClass("hide-ttl")) {
					dropdown.find("div[val='']").remove();
				}
				dropdown.fadeOut(150, function () {
					dropdown.find("div").show().removeClass("selected").removeClass("hidden");
					// if (select.find("option").length <= 2) {
						// div.addClass("hidden")
					// }
					div.addClass("selected");
					div.parents(".param-open").removeClass("param-open");
				});
			});
	
			$(document).mouseup(function (e) {
				var container1 = dropdown;

				if (!container1.is(e.target) // if the target of the click isn't the container...
						&& container1.has(e.target).length === 0) // ... nor a descendant of the container
				{
						dropdown.fadeOut(150)
				}
			});
		
		}
		
	});
	
};

function makeUp() {
	if ($(".header-map-wrapper").length) {
		mapHeight = 65
	} else {
		mapHeight = 0
	}
  $(".main-col").css({
		paddingTop: $(".header-top").outerHeight()	+ $(".header-bottom").outerHeight() + mapHeight
	})
}

function pupMakeup() {
  var popup = $(".modal").filter(function() {
		return $(this).attr("aria-hidden") == "false"
	}).find(".modal-dialog");
	var pupTop = ($(window).height() - popup.height())/2;
	if (pupTop < 30) pupTop = 30;
	
	popup.css({
		marginTop: pupTop
	})
	
}