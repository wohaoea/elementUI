(function(doc, win) {
    var zzTime;
    var weixing = 'no';
    var dpr, rem, scale, docEl = doc.documentElement,
        fontEl = doc.createElement("style"),
        metaEl = doc.querySelector('meta[name="viewport"]'),
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    var u = (win.navigator.appVersion.match(/android/gi), win.navigator.appVersion.match(/iphone/gi));
    dpr = win.devicePixelRatio || 1;

    if (u && win.devicePixelRatio >= 3) {
        dpr = 1;
    } else if (win.devicePixelRatio >= 2) {
        dpr = 1;
    } else {
        dpr = 1;
    };

    var rstCli = function() {
        rem = docEl.clientWidth * dpr / 7.5;
        win.rem = docEl.clientWidth * dpr / 7.5;
        scale = 1 / dpr;
        //metaEl.setAttribute("content", "width=" + dpr * docEl.clientWidth + ",initial-scale=" + scale + ",maximum-scale=" + scale + ", minimum-scale=" + scale + ",user-scalable=" + weixing);
        //docEl.setAttribute("data-dpr", dpr);
        docEl.firstElementChild.appendChild(fontEl);
        fontEl.innerHTML = "html{font-size:" + rem + "px!important;}";
    }

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, rstCli, false);
    doc.addEventListener('DOMContentLoaded', rstCli, false);

    win.rem2px = function(a) {
        a = parseFloat(a);
        return a * rem
    };
    win.px2rem = function(a) {
        a = parseFloat(a);
        return a / rem
    };


    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return 'no';
        } else {
            return 'yes';
        }
    }

})(document, window)