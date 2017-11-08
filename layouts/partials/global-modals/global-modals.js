$(document).ready(function () {

    $('#signupModal').on('show.bs.modal', function (e) {
        //$('body').css('overflow', 'hidden');
        //$('.modal').css('overflow', 'scroll');
        var regURL = 'https://app.datadoghq.com/signup_corp';
        var mobileURL = 'https://app.datadoghq.com/signup_corp?mobile=true';

        if(document.documentElement.lang){
            lang = document.documentElement.lang;
        }else{
            lang = ddc.lang;
        }

        if (lang && lang === "fr"){
            var lang_param = "?lang=fr";
        }else {
            var lang_param = '';
        }
        // Detect Mobile Devices

        var isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        // Trigger conditional URL

        if (isMobile.any()) {
            $('#signUpIframe').attr('src', mobileURL);
        } else {
            $('#signUpIframe').attr('src', regURL+lang_param);
        }
    }).on('hide.bs.modal', function(e) {
        $('#signUpIframe').attr('src', '');
        //$('body').css('overflow', '');
        //$('.modal').css('overflow', '');
    });



    var naturalWidth = 0;
    var naturalHeight = 0;
    $('#popupImageModal').on('show.bs.modal', function (e) {
        var url = e.relatedTarget.href;
        var img = new Image();
        var imgEl = $('<img src="'+url+'" alt="" class="img-fluid" />');
        img.onload  = function() {
            /* Store naturalWidth & height for IE8 */
            naturalWidth = img.width;
            naturalHeight = img.height;
            $('#popupImageModal .modal-body').html(imgEl);
            resize(naturalWidth, naturalHeight);
        };
        img.src = url;
    }).on('hide.bs.modal', function(e) {
        $('#popupImageModal .modal-body').empty();
    });

    function resize(w, h) {
        var el = $('#popupImageModal .modal-body img');
        var p = $('#popupImageModal .modal-dialog');
        var parentW = (parseInt($(window).width()) / 100) * 90;
        var parentH = (parseInt($(window).height()) / 100) * 90;
        if (w && h) {
            /* Reset apparent image size first so container grows */
            el.css('width', '').css('height', '');
            p.css('width', '').css('height', '');
            /* Calculate the worst ratio so that dimensions fit */
            /* Note: -1 to avoid rounding errors */
            var ratio = Math.max(
                w  / (parentW-1),
                h / (parentH-1));
            /* Resize content */
            if (ratio > 1) {
                ratio = h / Math.floor(h / ratio); /* Round ratio down so height calc works */
                el.css('width', '' + w / ratio + 'px').css('height', '' + h / ratio + 'px');
                p.css('width', '' + w / ratio + 'px').css('height', '' + h / ratio + 'px');
            }
        }
    }

    $(window).on('resize', function() {
        if($('#popupImageModal').hasClass('show')) {
            resize(naturalWidth, naturalHeight);
        }
    });

});