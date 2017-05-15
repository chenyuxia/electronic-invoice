$(document).ready(function() {
	$(".homePage .bill input[type='text'],.tel input").keyup(function() {
		// 禁止文本框输入字母，只能输入数字
		this.value = this.value.replace(/[^\d\.]/g,'');
	})
	// 文本框获取焦点时，错误提示隐藏
	$(".homePage .bill input[type='text'],.userInfo input[type='text']").focus(function() {
		$(this).nextAll(".errorTips").hide();
	})

	//文本框失去焦点时，错误提示显示，placeholde值清空，值清空
	$(".baoNum input,.invoice input,.email input,.tel input,.code input").blur(function() {
		//判断文本框为空时，显示提示
		if($(this).val() == "" || $(this).val().length < 4){
			$(this).nextAll(".errorTips").show();
			$(this).attr("placeholder","");
			$(this).val("");
		}
	})

	/*身份证号码输入框失去焦点时，
	  验证输入的数字是否符合身份证号码格式，
	  身份证号码不符合时，错误提示显示，placeholder值清空，值清空
	**/
	$(".identity input").blur(function(){
		var card = $(this).val();
		validate.checkIdNo(card);
		if(validate.checkIdNo(card) === false){
			$(this).nextAll(".errorTips").show();
			$(this).attr("placeholder","");
			$(this).val("");
		}		
	});

	/*身份证号码输入框光标输入时，验证输入的数字是否符合身份证号码格式，
	  若符合则移除btnGary样式，按钮呈可点击状态，
	  否则，不移除，不可点击
	**/
	$(".identity input").keyup(function(){
		var card = $(this).val();
		validate.checkIdNo(card);
		if(validate.checkIdNo(card) === true){
			$(".btn").removeClass("btnGary");
		}else{
			$(".btn").addClass("btnGary");
		}
	})

	/*保单号文本框，身份证号码文本框失去焦点时，
	  若错误提示都不显示且保单号和身份证文本框的值都不为空，
	  则移除btnGary，按钮呈可点击状态，提交按钮可点击跳转页面
	  否则，样式不移除，按钮不可
	**/
	$(".baoNum input,.identity input").blur(function() {
		if(($(".errorTips").css('display') == "none") && ($(".baoNum input").val() != "") && ($(".identity input").val() != "")){
			$(".btn").removeClass("btnGary");
			cli.btnClick();
		}else{
			$(".btn").addClass("btnGary");
		}
		
	})	

})

//提交按钮点击跳转到useInfor.html
var cli = {
	btnClick:function(){
		$('.btn') .click(function(){
	        window.location.href="useInfor.html";
	    })
	}
}

