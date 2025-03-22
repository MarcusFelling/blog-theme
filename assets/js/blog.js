let BlogJS = {

  bigImgEl : null,
  numImgs : null,

  init : function() {
    setTimeout(BlogJS.initNavbar, 10);

    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar").addClass("top-nav-short");
        } else {
            $(".navbar").removeClass("top-nav-short");
        }
    });

    $('#main-navbar').on('show.bs.collapse', function () {
      $(".navbar").addClass("top-nav-expanded");
    });
    $('#main-navbar').on('hidden.bs.collapse', function () {
      $(".navbar").removeClass("top-nav-expanded");
    });

    BlogJS.initImgs();

    BlogJS.initSearch();
  },

  initNavbar : function() {
    const rgb = $('.navbar').css("background-color").replace(/[^\d,]/g,'').split(",");
    const brightness = Math.round((
      parseInt(rgb[0]) * 299 +
      parseInt(rgb[1]) * 587 +
      parseInt(rgb[2]) * 114
    ) / 1000);
    if (brightness <= 125) {
      $(".navbar").removeClass("navbar-light").addClass("navbar-dark");
    } else {
      $(".navbar").removeClass("navbar-dark").addClass("navbar-light");
    }
  },

  initImgs : function() {
    if ($("#header-big-imgs").length > 0) {
      BlogJS.bigImgEl = $("#header-big-imgs");
      BlogJS.numImgs = BlogJS.bigImgEl.attr("data-num-img");

      const imgInfo = BlogJS.getImgInfo();
      const src = imgInfo.src;
      const desc = imgInfo.desc;
      BlogJS.setImg(src, desc);

      const getNextImg = function() {
        const imgInfo = BlogJS.getImgInfo();
        const src = imgInfo.src;
        const desc = imgInfo.desc;

        const prefetchImg = new Image();
        prefetchImg.src = src;

        setTimeout(function(){
          const img = $("<div></div>").addClass("big-img-transition").css("background-image", 'url(' + src + ')');
          $(".intro-header.big-img").prepend(img);
          setTimeout(function(){ img.css("opacity", "1"); }, 50);

          setTimeout(function() {
            BlogJS.setImg(src, desc);
            img.remove();
            getNextImg();
          }, 1000);
        }, 6000);
      };

      if (BlogJS.numImgs > 1) {
        getNextImg();
      }
    }
  },

  getImgInfo : function() {
    const randNum = Math.floor((Math.random() * BlogJS.numImgs) + 1);
    const src = BlogJS.bigImgEl.attr("data-img-src-" + randNum);
    const desc = BlogJS.bigImgEl.attr("data-img-desc-" + randNum);

    return {
      src : src,
      desc : desc
    }
  },

  setImg : function(src, desc) {
    $(".intro-header.big-img").css("background-image", 'url(' + src + ')');
    if (typeof desc !== typeof undefined && desc !== false) {
      $(".img-desc").text(desc).show();
    } else {
      $(".img-desc").hide();
    }
  },

  initSearch : function() {
    if (!document.getElementById("blog-search-overlay")) {
      return;
    }

    $("#nav-search-link").click(function(e) {
      e.preventDefault();
      $("#blog-search-overlay").show();
      $("#nav-search-input").focus().select();
      $("body").addClass("overflow-hidden");
    });
    $("#nav-search-exit").click(function(e) {
      e.preventDefault();
      $("#blog-search-overlay").hide();
      $("body").removeClass("overflow-hidden");
    });
    $(document).on('keyup', function(e) {
      if (e.key == "Escape") {
        $("#blog-search-overlay").hide();
        $("body").removeClass("overflow-hidden");
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', BlogJS.init);
