
var common = {
       //输入框有值的情况下显示删除按钮
        Focusinput:function(){
          $("input").keyup(function(event) {
            if($(this).val()!==""){
                $(this).siblings('i').show();
             }
          });

         $("input").focus(function(event) {
            if($(this).hasClass('colorRed')){
             $(this).removeClass('colorRed');
               $(this).val("");
               $(this).removeAttr('placeholder');
            } 
          });

        },
       //清楚输入框的值
        Clearinput:function (){
           $('i').on('click', function(event) {
                 $(this).siblings('input').val("");
                 $(this).hide();
            });
        },
        //检验手机号码
        checkPhone: function(phone) {
            if (!/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(phone)) {
                return false;
            }
            return true;
        },
         //检验邮箱
        checkEmail: function(phone) {
            if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i.test(phone)) {
                return false;
            }
            return true;
        },
         getParam:function (key) {
            var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return '';
        },
        //添加cookies
        addCookie: function(name, value, path, options) {
            if (name && value) {
                var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
                if (options) {
                    if (options.maxAge) {
                        cookie += ';max-age=' + options.maxAge;
                    }
                }
                cookie += '; path=' + (path ? path : '/');
                document.cookie = cookie;
            }
        },
        getCookie: function(name) {
            if (!common.getCookieObj()) {
                return null;
            }
            return decodeURIComponent(common.getCookieObj()[name]);
        },
        getCookieObj: function() {
            var cookies = {};
            if (document.cookie) {
                var objs = document.cookie.split(';');
                for (var i in objs) {
                    var index = objs[i].indexOf('='),
                        name = objs[i].substring(0, index).replace(/(^\s*)|(\s*$)/g, ''),
                        value = objs[i].substring(index + 1, objs[i].length).replace(/(^\s*)|(\s*$)/g, '');
                    cookies[name] = value;
                }
            } else {
                return '';
            }
            return cookies;
        },
        removeCookie: function() {
            if (common.getCookieObj()[name]) {
                document.cookie = name + '=; max-age=0';
            }
        },
         DateDiff:function(sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式  
                 var  aDate,  oDate1,  oDate2,  iDays  
                 aDate  =  sDate1.split("-")  
                 oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2002格式  
                 aDate  =  sDate2.split("-")  
                 oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])  
                 iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数  
                 return  iDays  
         },
        getNowFormatDate:function () {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                        + " " + date.getHours() + seperator2 + date.getMinutes()
                        + seperator2 + date.getSeconds();
                return currentdate;
            },
         getNewDay:function (dateTemp, days) {     
                    var date1 = new Date(dateTemp);
                    var date2 = new Date(date1);
                    date2.setDate(date1.getDate()+days);
                    var times = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
                    return times+" 00:00:00";
            }  ,
           isWeiXin:function(){
                    var ua = window.navigator.userAgent.toLowerCase();
                    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                        return true;
                    }else{
                        return false;
                    }
              }
    }

    