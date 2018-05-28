!(function () {
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
      $(".fixation-box").fadeIn(200)
    } else {
      $(".fixation-box").fadeOut(200);
    }
  });

  $(".returnTop").click(function (e) {
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

  $(".js-search-button").on("click",function(){
    $(this).toggleClass("js-open");
    $(".js-search-wrapper").toggleClass("open");
  })

})();

/* 图片上传 */
!(function ($, window) {
  'use strick';
  /* 图片上传 */
  if (!$) {
    console.error("需要Jquery");
    return false;
  }
  var getBlobUrl = (window.URL && URL.createObjectURL.bind(URL)) ||
    (window.webkitURL.createObjectURL.bind(webkitURL)) ||
    window.createObjectURL;
  var revokeBlobURL = (window.URL && URL.revokeObjectURL.bind(URL)) ||
    (window.webkitURL.revokeObjectURL.bind(webkitURL)) ||
    window.revokeObjectURL;

  function bindFn(fn, context) {
    return function () {
      return fn.apply(context, arguments);
    };
  }



  function ue_imageWall(el, options) {
    /* 最大上传数量 */
    this.max = options.max;
    /* 上传控件 */
    this.el = $(el);
    /* 图片容器 */
    this.container = $(options.container);
    /*  开始回调 */
    this.upload = options.upload;

    /* 删除按钮 */
    this.delBtn = options.delBtn || "del_btn"

    this.options = options || {};
    /* 存放上传文件数组 */
    this.files = [];
    /* 计数 */
    this.i = 0;

    this.preloader = ["<div class='preloader regular'>", "<div></div>", "<div></div>", "<div></div>", "<div></div>", "<div></div>", "</div>"].join("");
    var onChange = $.proxy(this.onChange, this);
    var that = this;
    // this.preload(function () {

    this.el.on("change", onChange);
    //   that.el.on('change', onChange).trigger('ue_change');
    //   // $(window).on('resize', onResize).trigger('resize');
    // })
    $(window).on('ue_change', function (e, data) {
      that.upload && that.upload(that.el, data);
    });

  }


  ue_imageWall.prototype.preload = function (callback) {
    $("body").append($(this.preloader)).trigger("preloader");
    if (typeof callback === 'function') {
      callback();
    }
  }



  ue_imageWall.prototype.onChange = function (e) {
    var file = e.target.files[0];
    if (this.i == this.max) {
      e.target.value = '';
      var html = "<div class='c_alert_wrapper'>" +
        " " +
        "" +
        "</div>"
      $("body").append(html);
      return false;
    }
    this.el.trigger('ue_change', [file]);
    this.createBlob(file)
  }

  ue_imageWall.prototype.createBlob = function (file) {
    var that = this,
      uploadImage = getBlobUrl(file);
    img = new Image();
    img.src = uploadImage;
    img.onload = function () {
      var html = "<li>" +
        "<a>" +
        "<div class='mask " + that.delBtn + "'>" +
        "<span>删除</span>" +
        "</div>" +
        "<img src=" + img.src + ">" +
        "</a>" +
        "</li>";
      that.container.append(html);
      that.i++;
    }
  }

  ue_imageWall.prototype.delete = function () {

  }






  $.extend($.fn, {
    ue_imageWall: function (options) {
      var opts = $.extend({}, $.fn.ue_imageWall.defaults, options);
      return this.each(function () {
        $(this).data("ue_imageWall", new ue_imageWall(this, opts));
        return this;
      })
    }
  });

  $.fn.ue_imageWall.defaults = {
    container: '[data-control="ue_container"]',
  }



})(jQuery, window)

/* 弹窗 */
!(function ($, window) {
  function ue_Alert(element) {
    this.element = element;
    this.show = false;
  }
})(jQuery, window)



!(function ($, win) {
  var typeArr = [];
  $(".Belongs_list").on("click", "a[data-type]", function (e) {
    $(this).parent().toggleClass("active");
    var $dataLists = $(".Business-info").find("[data-listID]");
    var $Belongs_list = $(this).parent().parent().parent();
    var input = $Belongs_list.find("input");
    var $ListID = $Belongs_list.find("[data-list]").data("listID");
    var type = $(this).data("type");
    console.log($dataLists);


  })
})(jQuery, window)