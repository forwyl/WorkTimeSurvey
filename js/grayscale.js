/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

var isFacebookSignedIn = false;

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
  if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
    $('.navbar-toggle:visible').click();
  }
});

$("#knowMore").modal({
    show: false 
});

$("#knowMoreBtn").click(function(e){
    e.preventDefault();
    $("#knowMore").modal("show");
});

function statusChangeCallback(response) {
    if (response.status == 'connected') {
        isFacebookSignedIn = true;
        $("#fb-login-word").addClass("hidden");
        $("#form").removeClass("hidden");

        getUserInfo();
    } else {
        isFacebookSignedIn = false;
        $("#fb-login-word").removeClass("hidden");
        $("#form").addClass("hidden");
    }
}

window.fbAsyncInit = function() {
    var appId = (window.location.hostname == "localhost") ? '1750608541889151' : '1750216878594984';
    FB.init({
        appId   : appId,
        cookie  : true,
        xfbml   : true,
        version : 'v2.6'
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response); 
    });

    $("#fb-login").click(function(e){
        e.preventDefault();
        if (!isFacebookSignedIn) {
            FB.login(function(response){
                statusChangeCallback(response);
            },{
                scope: 'public_profile,email'
            });
        } else {
            $('html, body').stop().animate({
                scrollTop: $("#form").offset().top
            }, 1500, 'easeInOutExpo');
        }
    });

    $("#fb-share").click(function(e){
        e.preventDefault();
        FB.ui({
            method: 'share',
            href: 'https://goodjoblife.github.io/WorkTimeSurvey/'
        }, function(response){
            
        });
    });

    $("#submit").click(function(e) {
        e.preventDefault();
        checkForm();
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/zh_TW/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

function getUserInfo() {
    console.log("Welcome! Fetching your information");
    FB.api('/me', function(response){
        console.log('success login for: '+ response.name);
    });
};

function checkForm () {
    // TODO - check data in form
    console.log("check!");

    // FIXME - Just submit without check
    submitForm();
};

var _id = null;

function submitForm() {
    // TODO - submit data after check to server

    $.ajax({
        url: 'https://tranquil-fortress-92731.herokuapp.com/',
        method: 'POST', 
        data: {
            access_token: FB.getAccessToken(),
            company_id: $("#company_id").val(),
            company_name: $("#company_name").val(),
            job_title: $("#job_title").val(),
            week_work_time: $("#week_work_time").val(),
            email: $("#email").val(),
        },
        dataType: 'json',
    }).then(function(res) {
        _id = res._id;

        $("#form-more").removeClass("hidden");
        $("#submit-more").on('click', function(e) {
            e.preventDefault();
            checkMoreInfoForm();
        });
        $("#submit").addClass("hidden");

        console.log(res);

        // TODO if success
    }).fail(function(jqXHR, textStatus, errorThrown) {
        // TODO if fail

        console.log(jqXHR);
    });
};

function checkMoreInfoForm () {
    // TODO - check data in __?
    console.log("check!");

    // FIXME - Just submit without check
    submitMoreInfoForm();
};

function submitMoreInfoForm() {
    // TODO - submit data after check to server

    $.ajax({
        url: 'https://tranquil-fortress-92731.herokuapp.com/' + _id,
        method: 'POST',
        data: {
            salary_min: $("#month_salary_min").val(),
            salary_max: $("#month_salary_max").val(),
            salary_type: 'month',
            work_year: $("#work_year").val(),
            //review: $("#review").val(),
        }
    }).then(function(res) {
        console.log(res);
    });
};
