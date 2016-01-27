/**
 * TNA - Global js
 */

// ----------------------------------------
// 1. Back to top
// 2. Website cookie
// 3. Mega menu for mobile
// 4. Responsive search
// 5. Search our website
// 6. Mega menu toggle
// ----------------------------------------

// 1. Back to top  - Displays a back to top link when the user has scrolled on longer pages.
//    Defaults are provided but can be overridden with options argument (object)
$(document).ready(function(){
    // Check the position of the page
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('#goTop').stop().animate({right: '.5em'});
        } else {
            $('#goTop').stop().animate({right: '-100px'});
        }
    });
    // Click event to scroll back to top
    $('#goTop').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });
});
// ----------------------------------------

// ----------------------------------------
// 2 Website Cookie -----------------------
// ----------------------------------------
// 2.1 setThisCookie()

tnaSetThisCookie = function (name, days) {
    var d = new Date();
    d.setTime(d.getTime() + 1000 * 60 * 60 * 24 * days);
    document.cookie = name + "=true;path=/;expires=" + d.toGMTString() + ';';
};
// 2.2 checkForThisCookie()
tnaCheckForThisCookie = function (name) {
    if (document.cookie.indexOf(name) === -1) {
        return false;
    } else {
        return true;
    }
};

// 2.3 Cookie notification
$(function(){ // All content must be placed within this IIFE.
    $('#mega-menu-pull-down').show();
    if (!tnaCheckForThisCookie("dontShowCookieNotice")) {
        $('<div class="cookieNotice">We use cookies to improve services and ensure they work for you. Read our <a href="http://www.nationalarchives.gov.uk/legal/cookies.htm">cookie policy</a>. <a href="#" id="cookieCutter">Close</a></div>').css({
            padding: '5px',
            "text-align" : "center",
            backgroundColor : '#FCE45C',
            position : 'fixed',
            bottom : 0,
            'font-size' : '14px',
            width : '100%',
            display : 'none'
        }).appendTo('body');

        setTimeout(function(){
            $('.cookieNotice').slideDown(1000);
        }, 1000);
    }

});

// 2.4 Binding to document (event delegation)
$(document).on('click', '#cookieCutter', function(e){
    e.preventDefault();
    tnaSetThisCookie('dontShowCookieNotice', 365);
    $('.cookieNotice').hide();
});
// ----------------------------------------

// ----------------------------------------
// 3 Mega menu for mobile -----------------
// ----------------------------------------
$(document).ready(function(){
    // When click show the childrens of the main categories
    $(document).on('click', '#nav h3', function(e){
        if($(window).width() < 480) {
            $(this).next("ul").slideToggle("slow");
            $(this).toggleClass('expanded');
            e.preventDefault();
        } else {
            return;
        }
    });
    // Show/Hide ul on mobile and desktop
    if($(window).width() < 480) {
        $('#nav ul').hide();
        $('#nav ul li.mobileOnly').show();

    }else {
        $('#nav ul li.mobileOnly').hide();
    }

    // Bindings to window
    $(window).on({
        resize: function() {
            if($(window).width() > 480){
                $('#nav ul').show();
                $('#nav ul li.mobileOnly').hide();
            } else {
                $('#nav ul').hide();
                $('#nav ul li.mobileOnly').show();
            }
        }
    });
});
// ----------------------------------------

// ----------------------------------------
//  4 Responsive search -------------------
// ----------------------------------------
//Hides the responsive search
$(document).ready(function(){
    $('#mobileGlobalSearch').css('display','none');
    //Responsive Search Menu Toggle
    $('#search-expander').click(function() {
        $('#mobileGlobalSearch').slideToggle('fast');
    });

    $('input[name=radioSearchGroup]:radio').click(function() {
        $(this).parent().attr('action', 'http://www.nationalarchives.gov.uk/search/quick_search.aspx');
    });

    $('input[value=radioSearchGroup]:radio').click(function() {
        $(this).parent().attr('action', 'http://discovery.nationalarchives.gov.uk/SearchUI/s/res');
    });
    //Change placeholder and action url (end)

});
// ----------------------------------------
// 5 Search our website -------------------
$(document).ready(function() {
// Hide search option
    $('#search-options').hide();
// $.showExpander()
    $.showExpander = function () {
        if ($('.expander').length) {
            $('.expander').delay(200).slideDown(400);
        }
    };


    /*
     function checkWidth(init) {
     if ($(window).width() < 768) {
     $('#logo-holder a').addClass('hidden-xs');
     } else {
     $('#logo-holder a').removeClass('');
     }
     }
     */

// $.customEventer()
    $.customEventer = function (passedObject) {
        var elementIdOrClass = passedObject.elementIdOrClass,
            eventToWatch = passedObject.eventToWatch,
            customEventToTrigger = passedObject.customEventToTrigger;

        $(document).on(eventToWatch, elementIdOrClass, function () {
            $(document).trigger(customEventToTrigger);
        });
    };

// Generic toggle method. Does not include any bindings since it is designed to be used with
    $.toggleDisplayOfElement = function (toggler, togglee) {
        $(togglee).toggle();
        $(toggler).toggleClass('expanded');
    };

    $('.formDestinationChanger').on('click', function () {
        var placeholder = $(this).attr('data-placeholder'),
            target = $(this).attr('data-target'),
            fieldName = $(this).attr('data-fieldName');

        $.toggleDisplayOfElement('#scope-selector', '#search-options');

        $('#tnaSearch').attr({'placeholder': placeholder, 'name': fieldName});
        $('#globalSearch').attr('action', target);
    });

// When click change the arrow position
    $('#scope-selector').click(function () {
        $('#search-options').toggle();
        if ($('#search-options:visible').size() != 0) {
            $(this).addClass('expanded');
        }
        else {
            $(this).removeClass('expanded');
        }
    });

    $(document).on('click', '#search-controls li', function (e) {
        $('#search-controls li').removeClass('selected');
        $(e.target).addClass('selected');
    });

// Global search - larger screens
    $(document).one('toggleSearchOptionsOnce', function () {
        $.toggleDisplayOfElement('#scope-selector', '#search-options');
    });

    $(document).on('toggleSearchOptions', function () {
        $.toggleDisplayOfElement('#scope-selector', '#search-options');
        $(document).off('toggleSearchOptionsOnce');
    });

// Global search - smaller screens
    $(document).on('change', '.mobileSearchDestinationOption', function () {
        var target = $(this).attr('data-target'),
            placeholder = $(this).attr('data-placeholder'),
            fieldName = $(this).attr('data-fieldName');
        $('#mobile-search-field').attr({'placeholder': placeholder, 'name': fieldName}).focus();
        $('#mobileGlobalSearch').attr('action', target);
    });
});
// ----------------------------------------
// 6 Mega menu Toggle ---------------------

$('#nav').hide();
$('#mega-menu-pull-down').on('click', function () {
    $('#nav').slideToggle();
});

// ----------------------------------------


