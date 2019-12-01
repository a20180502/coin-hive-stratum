$(document).ready(function () {

    $('.mdl-layout__content').scroll(function () {

        // get percentage of window scroll
        var s = $('.mdl-layout__content').scrollTop(),
            d = $('.mdl-layout__content').prop('scrollHeight'),
            c = $('.mdl-layout__content').height(),
            y = (s / (d - c)) * 100 * -1;

        jQuery('.parallax-container svg').css('transform', 'translate3d(0,' + y + 'vh,0)');

        jQuery('body').toggleClass('scrolled', s > 10);
        jQuery('#scroll-up-btn').toggleClass('block', s > 10);

    });

    $('#dark-theme-toggle').change(function (e) {
        $('body').toggleClass('dark-theme', this.checked);
        document.cookie = "theme=" + (this.checked ? 'dark' : 'light') + "; path=/";
    });


    //scroll to top functions
    var scrollTo = function(top) {
        var content = $(".mdl-layout__content");
        var target = top ? 0 : $(".page-content").height();
        content.stop().animate({ scrollTop: target }, "slow");
    };

    var scrollToTop = function() {
        scrollTo(true);
    };

    $(function() {
        $("#scroll-up-btn").click(scrollToTop);
    });



});

