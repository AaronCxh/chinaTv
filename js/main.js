!(function () {

  'use strick';
  function BrowserType() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器  
    var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器  
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器  
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器  

    if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      // if (fIEVersion == 7) { return "IE7"; }
      // else if (fIEVersion == 8) { return "IE8"; }
      if (fIEVersion == 9) { return "IE9"; }
      else if (fIEVersion == 10) { return "IE10"; }
      else if (fIEVersion == 11) { return "IE11"; }
      else { return "0" }//IE版本过低  
    }//isIE end  

    if (isFF) { return "FF"; }
    if (isOpera) { return "Opera"; }
    if (isSafari) { return "Safari"; }
    if (isChrome) { return "Chrome"; }
    if (isEdge) { return "Edge"; }
  }//myBrowser() end  
  if ($("[data-control='CityControl']").length) {
    $("[data-control='CityControl']").citys({

    })
  }
  if (BrowserType() == "0") {
    var radios = $(".radio-group").find("input[type='radio']");
    radios.each(function (i, v) {
      if ($(v).is(":checked")) {
        $(v).next().addClass('active');
      }
    })
    $(document).on("click", ".radio-group label", function (e) {
      $(this).parent().find('.active').removeClass("active").prev().prop('checked', false);
      $(this).find('span').addClass('active').prev().prop('checked', true);
    })
    // console.log("版本过低");
  }

  if ($("#city").length) {
    $("#city").click(function (e) {
      SelCity(this, e);
    });
    $("s").click(function (e) {
      SelCity(document.getElementById("city"), e);
    });
  }
  if ($("img[data-original]").length) {
    $("img[data-original]").lazyload({ effect: "fadeIn" });
  }


  $(".index-schedule-arrow").on("click", function (e) {
    var $headerSch = $(".header-schedule");
    if ($headerSch.hasClass("short")) {
      $headerSch.removeClass("short")
    } else {
      $headerSch.addClass("short");
    }
  })


  $(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    if (scrollTop >= 100) {
      $(".scroll-top").fadeIn(200)
    } else {
      $(".scroll-top").fadeOut(200);
    }
  });

  $(".scroll-top").click(function (e) {
    e.preventDefault();
    $("body,html").animate({
      scrollTop: 0
    }, 500)
  });

  $('.code').hover(
    function () {
      var code = $(this).find('.fixation-code-box');
      code.stop().show(200)
    },
    function () {
      var code = $(this).find('.fixation-code-box');
      code.stop().hide(200)
    }
  )

  $('.phone').hover(
    function () {
      $(this).addClass("open");
      var phone = $(this).find('.phone-box').addClass("active");
    },
    function () {
      $(this).removeClass("open");
      var phone = $(this).find('.phone-box').removeClass("active");
    }
  )

  if ($('[data-toggle="viewer"]').length) {
    $('[data-toggle="viewer"]').viewer();
  }

  $(document).hover(
    function () { },
    function () { },
  )


  $(document).on("click", ".payment-list li", function () {
    $(".payment-list li").removeClass("current");
    $(this).addClass("current");
    $("#_paymentmethod").val($(this).attr('data-type'));
  })

  $(document).on("click", ".create-popup", function (e) {
    e.preventDefault();
    var source = $(this).data("source") || '';
    var id = $(this).data("target").replace("#", "");
    var title = $(this).data("name") || '';
    var summary = $(this).data("summary") || '';
    console.log(id);
    var model1 = "<div class='modal fade' id= " + id + " tabindex='-1' role='dialog' aria-labelledby='myModalLabel'> " +
      "<div class='modal-dialog modal-lg' role='document'>" +
      "<div class='modal-content '>" +

      "<div class='modal-body'>" +
      "<button style='font-size:45px;position: relative;top:-10px;' type='button' class='close' data-dismiss='modal' aria-hidden='true'> &times" +
      "</button>" +
      "<div class='text-c'>" +
      "<img style='width:100%' class='' src=" + source + ">" +
      "</div>" +
      "<div>" +
      "<p>" + summary + "</p>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
    var $model = $(model1);
    $("body").append($model);
    $("#" + id).modal().on("hidden.bs.modal", function () {
      $(this).remove();
    });
  });

  $('#accordion').on('show.bs.collapse', function (e) {
    var $this = e.target,
      state = e.type;
    if (state == "show") {
      $($this).parent('.c_panel').find('.icon-rightcircleo').removeClass("icon-rightcircleo").addClass('icon-downcircle');
    }
  }).on('hidden.bs.collapse', function (e) {
    var $this = e.target,
      state = e.type;
    if (state == "hidden") {
      $($this).parent('.c_panel').find('.icon-downcircle').removeClass("icon-downcircle").addClass('icon-rightcircleo');
    }
  })




  /* 评分函数 */
  starInfoChange = function (index) {
    $(".star-info").text(index + "分");
  }
  ratingChange = function (elem, index) {
    return $(elem).each(function (i, ratingelem) {
      return $(ratingelem).find('i').each(function (i, item) {
        if (i <= index) {
          $(item).removeClass('icon-staro');
          return $(item).addClass('icon-star');
        } else {
          $(item).removeClass('icon-star');
          return $(item).addClass('icon-staro');
        }
      });
    });
  };

  $('.commstar span').hover(function (e) {
    var index;
    index = $(this).attr("index") | 0;
    if (index <= 0) {
      return;
    }
    starInfoChange(index);
    index--;
    return ratingChange($(this).parent(), index);
  });

  $('.commstar').on("mouseenter", function (e) {
    return $(this).removeClass('active');
  });

  $('.commstar').on("mouseleave", function (e) {
    e.preventDefault();
    var index;
    $(this).addClass('active');
    index = $(this).attr("active") | 0;
    index--;
    return ratingChange(this, index) && index ? starInfoChange(index + 1) : starInfoChange(1);
  });

  $('.commstar span').click(function (e) {
    console.log(213123);
    index = $(this).attr("index") | 0;
    if (index <= 0) {
      return;
    }
    $('.commstar').attr("active", index);
    ratingChange($('.commstar'), index - 1);
    // data = {
    // };
    // return $.ajax({
    //   url: '',
    //   method: 'POST',
    //   data: data,
    //   success: function (resp) {
    //     if (!resp) {
    //       $('.rating').addClass('active');
    //     } else {
    //       alert('提交失败，请重新尝试');
    //     }
    //   },
    //   error: function (err) {
    //     return alert('提交成功,请重新尝试');
    //   }
    // });



  });
  /* 评分函数 */





  /* 搜索框 */
  $("#js-global-btn-search").on("click", function (e) {
    $("html").toggleClass('global-search-show');

    $("html").append($('<div class="global-mask" id="global-mask"></div>'));

    $(".global-mask").toggleClass('global-mask-open');

    $('.global-mask').one("click", function (e) {
      if (e.target !== e.currentTarget) return
      $("html").removeClass('global-search-show');
      $(".global-mask").removeClass('global-mask-open').remove();;
    })
  });
  /* 搜索框 */

  $(document).on("click", "[data-control='#a_checkbox']", function (e) {
    var $checkbox = $(this).attr("data-control");
    console.log($checkbox);
    var type = parseInt($(this).attr("data-type"));
    type ? $($checkbox).prop("checked", true) : $($checkbox).prop("checked", false);

  })

  $(".js-search-button").on("click", function () {
    $(this).toggleClass("js-open");
    $(".js-search-wrapper").toggleClass("open");
  })

})();



!(function () {
  
  if(!$(".info--promo").length){return}
  var offsetTop = $(".info--promo").offset().top;
  var Top = $(".info--content").offset().top + $(".info--content").height() - $(".info--promo").height();
  $(window).scroll(function () {
    
    if ($(".info--content").height() < $(".info--aside").height()) {
      return false;
    } else if ($(window).scrollTop() >= Top) {
      $(".info--promo").css({
        position: "absolute",
        bottom: -20,
        top: "auto"
      })
    } else if ($(window).scrollTop() >= offsetTop) {
      $(".info--promo").css({
        position: "fixed",
        // top:61,
        top: 20
      })
    } else {
      $(".info--promo").css({
        position: "static"
      })
    }
  })
})()
