var _prevY = window.pageYOffset;
$(document).ready(function() {
    $('#js-date').datepicker();
});
var _navItem = $('.nav-item');
_navItem.click(function() {
    /* Act on the event */
    if ($(window).width() > 992) {
        return false;
    }
});
var _topNav = $(".nav--fixed");
var _h = $('.top--intro').innerHeight();
if ($(window).width() > 768) {
    _topNav.css({
    top: _h
});}
var _divScroll = -1;
var _navBg = 'bg--dark';
window.onscroll = function() {
    if(_divScroll == -1){
        var _currentY = window.pageYOffset;
        if (_prevY > _currentY) {
            _topNav.removeClass('transformY--100').addClass('transformY--0').addClass(_navBg).css({
                top: _h
            });
        } else {
            _topNav.removeClass('transformY--0').addClass('transformY--100').css({
                top: _h
            });
        }
        if (_currentY == 0) {
            _topNav.removeClass('top--0').removeClass(_navBg);
        }
        _prevY = _currentY;
    }
}
var _getItem = 0;
var _wheelVal = 0.6;
var _sliCurr = $('.sli-item').first();
var _sliFirst = $('.sli-item').first();
var _sliLast = $('.sli-item').last();
var _mode = 1;
var _delayTime = 1000;
var _isWheel = 0;
var _cssOutLeft = 'bounceOutLeft';
var _cssOutRight = 'bounceOutRight';
var _cssInLeft = 'bounceInLeft';
var _cssInRight = 'bounceInRight';

$('.hero').bind('mousewheel', function(e) {
    if (_isWheel == 0 && $(window).width() > 768) {
        if (e.originalEvent.wheelDelta / 60 > 0) {
            //-----------up
            _isWheel = 1;
            if (_sliCurr.is(':first-child') === false) {
                _sliCurr.addClass(_cssOutRight).delay(_delayTime / 2).queue(function(next) {
                    $(this).removeClass('active').removeClass(_cssOutRight);
                    _sliCurr = _sliCurr.prev();
                    _sliCurr.addClass('active').addClass(_cssInLeft).delay(_delayTime).queue(function(next) {
                        $(this).removeClass(_cssInLeft);
                        next();
                    });
                    _isWheel = 0;
                    next();
                });
            } else {
                _isWheel = 0;
            }
        } else {
            //---------down
            _isWheel = 1;
            if (_sliCurr.is(':last-child') === false) {
                _sliCurr.addClass(_cssOutLeft).delay(_delayTime / 2).queue(function(next) {
                    $(this).removeClass('active').removeClass(_cssOutLeft);
                    _sliCurr = _sliCurr.next();
                    _sliCurr.addClass('active').addClass(_cssInRight).delay(_delayTime).queue(function(next) {
                        $(this).removeClass(_cssInRight);
                        next();
                    });
                    _isWheel = 0;
                    next();
                });
            } else {
                _isWheel = 0;
            }
        }
    }
});
var _notiClose = 'fa-times';
var _notiIcon = 'fa-comment-dots';
var _navIcon = 'fa-bars';
var _notiIsOpen = -1;

var _interface = $('.interface--fade');
var _navIsOpen = -1;
$('#btn--nav').click(function() {
    var _d = $(this).attr('data-link');
    if(_navIsOpen == -1)
    {
        _divScroll = 1;
        if(_notiIsOpen == 1){
            $('.notification--feedback').click();
        }
        $(this).find('.icon--bar:nth-child(1)').addClass('rotate-45--up');
        $(this).find('.icon--bar:nth-child(2)').addClass('d-none');
        $(this).find('.icon--bar:nth-child(3)').addClass('rotate-45--down');
        $(_d).addClass(_cssInRight).addClass('d-block');
        _interface.addClass('fade--black').delay(_delayTime).queue(function(next) {
            _navIsOpen = 1;
            next();
        });   
    }
    else
    {
        _divScroll = -1;
        $(this).find('.icon--bar:nth-child(1)').removeClass('rotate-45--up');
        $(this).find('.icon--bar:nth-child(2)').removeClass('d-none');
        $(this).find('.icon--bar:nth-child(3)').removeClass('rotate-45--down');
        $(_d).removeClass(_cssInRight).addClass(_cssOutRight);
        _interface.removeClass('fade--black').delay(_delayTime).queue(function(next) {
            _navIsOpen = -1;
            $(_d).removeClass('d-block').removeClass(_cssOutRight);
            next();
        });
        
    }   
});
var _notiCtn = $('.notification--container');
$('.notification--feedback').click(function() {
    if (_notiIsOpen == -1) {
        if(_navIsOpen == 1){
            $('#btn--nav').click();
        }
        _notiCtn.addClass('notification--is-open').addClass(_cssInLeft);
        _interface.addClass('fade--black').addClass('d-block');
        $(this).find('.icon--center').removeClass(_notiIcon).addClass(_notiClose).delay(_delayTime).queue(function(next) {
            _notiIsOpen = 1;
            next();
        });
    } else {
        _notiCtn.removeClass(_cssInLeft).addClass(_cssOutLeft);
        _interface.removeClass('fade--black').removeClass('d-block');
        $(this).find('.icon--center').removeClass(_notiClose).addClass(_notiIcon).delay(_delayTime/2).queue(function(next) {
            _notiIsOpen = -1;
            _notiCtn.removeClass('notification--is-open').removeClass(_cssOutLeft);
            next();
        });
    }
});
var _checkID = "";
var _subMenuItem = $('.a--data');
_subMenuItem.click(function() {
    var _ne = $(this).attr('data-link');
    if($(window).width() > 768){
        if(_ne != _checkID){
            _checkID = _ne;
            _sliCurr.addClass(_cssOutLeft).delay(_delayTime / 2).queue(function(next) {
                $(this).removeClass('active').removeClass(_cssOutLeft);
                _sliCurr = $(_ne);
                _sliCurr.addClass('active').addClass(_cssInRight).delay(_delayTime).queue(function(next) {
                    $(this).removeClass(_cssInRight);
                    next();
                });
                _isWheel = 0;
                next();
            });
        }
    }
    else
    {
        $('html, body').animate({scrollTop: $(_ne).offset().top},1000).delay(_delayTime/2).queue(function(next) {
            next();
        });
        
    }
});
