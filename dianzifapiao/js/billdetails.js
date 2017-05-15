$(function() {
	var policyNo = days.getParam("policyNo");
	$.ajax({  
		url:"js/billdetails.json",   //发票信息查询接口
		type:"get",
		datatype:"json",
		async:true,
		data:{policyNo:policyNo},
		success:function(data){
			if(data.resultCode == 0){
				var i=0;
				for(x in data.result){
					$(".clr").find("span").eq(i).html(data.result[x]);
					i++;
				}
			}

			if(data.result.status == "S"){  //N=未申请，Y=已申请，S=开票成功，F=开票失败
				var stopdate = days.getNewDay(data.result.createTime,30);  //投保成功后的30天有效期内
				var dateDiff = days.DateDiff(days.getNowFormatDate(),stopdate); //现在时间与投保成功后30天有效期内的时间差值

				$(".state").addClass("stateOk");
				$(".state").html("电子发票已生成，请按需点击以下按钮获取！发票文件请于 " + stopdate  + " 之前下载");
				$(".billDetails .btns").show();

				if(dateDiff > 30){ //当前时间加上30天后的时间 > 当前时间加上大于30天后的时间，则提示电子发票申请失败
					$(".state").removeClass("stateOk");
					$(".state").html("对不起，电子发票申请入口失效");
					$(".billDetails .btns").hide();				
				}			

			}else{
				$(".state").removeClass("stateOk");
				$(".state").html("电子发票生成中，请刷新获取最新进展");
				$(".billDetails .btns").hide();
			}
		},
		error:function(){
			console.log("请求失败");
		}
	})


})


var days = {
	getNewDay:function (dateTemp, days) {    //开发票的当天时间 加上 30天 后 得出的日期
	    var date1 = new Date(dateTemp);
	    var date2 = new Date(date1);
	    date2.setDate(date1.getDate()+days);
	    var times = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
	    return times+" 00:00:00";
	},
	DateDiff:function(sDate1,  sDate2){      //sDate1和sDate2是2002-12-18格式  
         var  aDate,  oDate1,  oDate2,  iDays;  
         aDate  =  sDate1.split("-") ;
         oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]) ;   //转换为12-18-2002格式  
         aDate  =  sDate2.split("-")  ;
         oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])  ;
         iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)  ;  //把相差的毫秒数转换为天数  
         return  iDays  ;
 	},
 	getNowFormatDate:function () {           //获取当前时间
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
    getParam:function (key) {
            var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return '';
        }
}