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

    /*var signupcontent = $('.signup-modal');

    $('.sign-up-trigger').featherlight(signupcontent, {
        variant: 'feather-signup',
        openTrigger: 'click',
        type: 'html',
        loading: '<div class="loader">Loading...</div>',
        openSpeed: 100,
        closeSpeed: 1,
        //closeOnEsc: true,
        closeOnClick: false,
        beforeClose: function () {
            //$('.featherlight:last-of-type').css('background-color','rgba(0, 0, 0, 0)');
            $('#signUpIframe').attr('src', '');
            $('body').css('overflow', '');
            $('.modal').css('overflow', '');
        },
        afterOpen: function () {
            $('body').css('overflow', 'hidden');
            $('.modal').css('overflow', 'scroll');
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
            // trigger adroll event
            /!*try {
                __adroll.record_user({"adroll_segments": "a925a4d1"});
            } catch(err) {}*!/
        },
        afterContent: function () {

            //$('.featherlight-close-icon').css('display: block');

            //setTimeout(function(){

            //$('.featherlight:last-of-type').css('background', 'rgba(0,0,0,0.3)');

            // },
            // 10);

        }

    });*/

});