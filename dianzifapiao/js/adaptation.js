(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');//querySelector查询选择器name=浏览器视窗
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});
    /*dpr的配置
    首先，在引入flexible.js之前，我们可以对dpr进行手动的配置，即使用自定义的meta标签来配置dpr（看清楚是flexible，而非viewport）
    <meta name="flexible" content="initial-dpr=2,maximum-dpr=3" />
    iniital-dpr是把dpr强制设定为给定的值，而maximum-dpr则是给出一个最大的dpr限制，然后对其和系统的dpr做一个比较。*/
    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);//match[1]指([\d\.]+)括号再取一次
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }
    /*当我们在meta标签里面并没有对viewport以及flexible两个的任意一个进行书写的时候，他也是会自动获取一个dpr值的*/
    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);//navigator.appVersion浏览器app版本
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var isIPad = win.navigator.appVersion.match(/ipad/gi);
        var devicePixelRatio = win.devicePixelRatio;//devicePixelRatio设备像素比
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }
    function IsPC() 
    { 
        var userAgentInfo = navigator.userAgent; //浏览器用户代理
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod","X11");
        var flag = true; 
        for (var v = 0; v < Agents.length; v++) { 
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
        } 
        return flag; 
    }
    /*rem布局
    用js获取到页面的宽度，然后对其进行宽度/10的处理，再将其写到html的font-size中。*/
    function refreshRem(){
        var width = docEl.getBoundingClientRect().width;
        if (IsPC() && width < 2047) {
            width = 750;
        }

        var rem = width / 7.5;    //根据设计稿宽度设置
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 14 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 14 * dpr + 'px';
        }, false);
    }
    

    refreshRem();

    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }
})(window, window['lib'] || (window['lib'] = {}));