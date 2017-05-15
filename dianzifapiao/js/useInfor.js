var policyNom;//定义获取从json传过来的保单号
$(document).ready(function() {
	
	//邮箱验证。文本框失去焦点时，值为空则错误提示显示，不为空则验证邮箱格式
	$(".email input").blur(function() {
		var field = $(this).val();
		if(field == ""){
			$(".email").find(".errorTips").html("请输入接收电子发票的邮箱");
		}else{
			isEmail(field);
		}
	})

	//手机号码验证。文本框失去焦点时，值为空则错误提示显示，不为空则验证手机号码格式
	$(".tel input").blur(function() {
		var telVal  = $(this).val();
		if(telVal == ""){
			$(".tel").find(".errorTips").html("请输入手机号码");
		}else{
			validate.checkPhone(telVal);
		}		
	})

	//发票抬头，邮箱，电话，验证码，填写正确，失去焦点时，按钮移除btnGary，变为可点击状态
	$(".invoice input,.email input,.tel input,.code input").blur(function () {
		var fa = $(".invoice input").val();
		var em = $(".email input").val();
		var te = $(".tel input").val();
		var co = $(".code input").val();

		if($(".errorTips").css('display') == "none" && fa != "" && em != "" && te != "" && co != ""){
			$(".btn").removeClass("btnGary");
			
		}else{
			$(".btn").addClass("btnGary");
		}
	})

	$(".userInfo .btn").click(function(){      //点击提交，核对信息弹框显示
		if(!$(".btn").hasClass("btnGary")){    //btnGary此样式不存在时，则执行mesCode方法
			sends.mesCode();
		}		
	})

	//点击确认无误按钮执行billiing方法，提示开票成功弹窗，跳转到billdetails页面
	$('.btn2').click(function(){
		sends.billiing();
	})


	//可开票金额和税率的json数据useinfor.json,
	$.ajax({
		url:"js/useinfor.json",
		type:"get",
		datatype:"json",
		async:true,
		data:{invoiceAmount:$("#premium").text(), tax: $("#tax").text()},   //开票金额 、 税率
		success:function(data){
			if(data.resultCode=="0"){
				$("#premium").html(data.result.premium);
				$("#tax").html(data.result.tax);
				policyNom = data.result.policyNo;   //获取useinfor.json里的保单号
			}else{
				$("#premium").html(0);
				$("#tax").html("0%");
			}
		},
		error:function(){
			console.log("保险服务请求失败")
		}
	})

	//电话号码发送短信验证码按钮点击事件
	$(".tel a").bind("click",function() {
		if($(".send0").length == 0){  //若send0样式不存在，则执行send方法，解决此按钮点击多次计时错乱的问题
			sends.send();
		}

		if($(".tel input").val() != "" && $(".tel span").hide()){  //若手机号码的值不为空且错误提示不显示，则执行code方法
			sends.code();
		}
	});	
   

	//纳税人信息展开关闭
	$('h3 span') .click(function(){
		$('.taxpayer') .slideToggle();
		if ($(this) .hasClass('shut')) {
		  $(this) .addClass('open') .removeClass('shut')
		}
		else{
		  $(this) .addClass('shut') .removeClass('open')
		}
	})
	//返回修改按钮点击关闭弹窗
	$('.btn1') .click(function(){
		$('.billMc') .hide();
	})
	

})

//email验证
function isEmail(strEmail) {
	if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1){
		return true;
	}else{ 
		$(".email").find(".errorTips").html("请输入邮箱的正确格式");   //错误提示的值
		$(".email").find(".errorTips").show();                         //错误提示显示
		$(".email input").attr("placeholder","");                      //邮箱输入框的placeholder清空
		$(".email input").val("");                                     //邮箱输入框的值清空
	}
}


var sends = {
	checked:1,
	send:function(){  //短信验证码的发送
		var numbers = /^1\d{10}$/;
		var val = $('.tel input').val(); //获取输入手机号码

		if(numbers.test(val)){
			var time = 30;
			function timeCountDown(){
				if(time==0){
					clearInterval(timer);
					$('.tel a').addClass('colorGrye').removeClass('send0').html("发送验证码");
					sends.checked = 1;
					return true;
				}
				$('.tel a').html(time+"S后再次发送");
				time--;
				return false;
				sends.checked = 0;
			}
			$('.tel a').addClass('send0').removeClass('colorGrye');
			timeCountDown();			
			var timer = setInterval(timeCountDown,1000);
		}
	},
	code:function(){  //获取短信验证码接口message.json
		$.ajax({
			url:"js/message.json",  
			type:"get",
			datatype:"json",
			async:true,
			data:{mobile:$(".tel input").val()},  //手机号 
			success:function(data){
				if(data.resultCode == 0){
					$(".code input").blur(function(){      //验证码失去焦点时,值不为空且输入字段长度不为6时，提示错误，值清空，提交按钮不可点击
						var code = $(".code input").val();
						if(code !== "" && code.length != 6){
							$(".code .errorTips").show();
							$(".code .errorTips").html("短信验证码有误，请重新输入");
							$(this).val("");
							$(this).attr("placeholder","");
							// $(".btn").addClass("btnGary");
							$(".btn.btnGary").unbind("click");
						}
					});		

					$(".code input").keyup(function(){  //验证码输入时，输入字段长度不为6，则提交按钮不可点击
						var code = $(".code input").val();
						if(code.length != 6){							
							$(".btn").addClass("btnGary");							
						}else{
							$(".btn").removeClass("btnGary");
						}
					})
				}

			},
			error:function(){
				console.log("短信验证码请求失败");
			}
		})
	},
	mesCode:function(){
		$.ajax({
			url:"js/messcode.json",   //短信验证接口messcode.json
			type:"get",
			datatype:"json",
			async:true,
			data:{mobile:$(".tel input").val(),verificationCode:$(".code input").val()},  //手机号 /验证码
			success:function(data){
				if(data.resultCode == 0){
					$(".billMc").show();
					$(".useInfor .clr .text").eq(0).html($(".invoice input").val());
					$(".useInfor .clr .text").eq(1).html($(".email input").val());
					$(".useInfor .clr .text").eq(2).html($(".tel input").val());
				}
			},
			error:function(){
				console.log("短信验证码请求失败");
			}
		})
	},
	billiing:function(){   //申请开票接口billiing.json
		//请求的参数
		var policyNo={
			invoiceTitle:$(".invoice input").val(),   //发票抬头
			email:$(".email input").val(),            //电子邮箱
			tel:$(".tel input").val(),                //手机号
			taxpayerCode:$(".taxpayer p").eq(0).find("input").val(),     //手机号
			taxpayerAddTel:$(".taxpayer p").eq(1).find("input").val(),   //纳税人地址、电话
			bankInfo:$(".taxpayer p").eq(2).find("input").val()          //纳税人开户行及账号
		}

		$.ajax({
			url:"js/billing.json",
			type:"get",
			datatype:"json",
			async:true,
			data:policyNo,
			success:function(data){
				if(data.resultCode == 0){		
					$(".mc-main2").show();
					$('.mc-main') .hide();

					$(".mc-main2 .btn").click(function() {
						// console.log(policyNom);
					 	window.location.href="billdetails.html?policyNo="+policyNom;	//	policyNom为保单号
					})					
				}

			},
			error:function(){
				console.log("开票请求失败");
			}
		})
	}
}
