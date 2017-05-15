	/**
	*	校验类
	*/
	var validate = {
		//后台关于相关校验位于ImportClientInfoUtil.java文件中
		//日期校验正则表达式
		regDate 		: /^(((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29)))?$/,
		regCharacter	: /^\w*$/,								//字符(字母|数字|下划线)
		regDoubChar		: /^[^\x00-\xff]*$/,					//双字节字符(包括汉字在内)	
		regCh 			: /^([\u4e00-\u9fa5])*$/,				//中文
		regEn			: /^([a-zA-Z])*$/,						//英文字母
		regNum			: /^\d*$/,								//数字
		regBlank		: /^\s*$/,								//空格
		regNumEn 		: /^[a-zA-Z\d]*$/,						//字母|数字
		regChEn 		: /^([\u4e00-\u9fa5]|[a-zA-Z])*$/,		//中文|字母
		regChEnNum 		: /^([\u4e00-\u9fa5]|[a-zA-Z\d])*$/,	//中文|字母|数字
		regEnNumKuo		: /^([a-zA-Z\d]|[\(\)])*$/,				//字母|数字|()
		regITSMobilePhone	: /^(((13|14|15|18)\d{1}([0-9]{4}|[*]{4})|(176|177|178)([0-9]{4}|[*]{4})|((1700|1705|1709)[0-9]{3}|(170)[*]{4}))\d{4})?$/,			//13|14|15|18打头的11位数字
		regMobilePhone	: /^(((13|14|15|18)\d{9})|((176|177|178)\d{8})|((1700|1705|1709)\d{7}))?$/,			//13|14|15|18 176|177|178 1700 1705 1709打头的11位数字
		regEmail		: /^[\w\-\.]+@[a-zA-Z0-9]+(\-[a-zA-Z0-9]+)?(\.[a-zA-Z0-9]+(\-[a-zA-Z0-9]+)?)*\.[a-zA-Z]{2,4}$/,	//emial
		regNameOld		: /^([\uFF0E\uFF07\uFF0F\,\.\·\•\(\)\'\/\uFF0D\u0391-\uFFE5-]{2,25}|[\uFF0C\uFF0E\uFF07\uFF08\uFF09\uFF0F\,\.\·\•\(\)\'\/\uFF0DA-Za-z\s-]{4,50})$/,	//姓名-之前的规则
		regNameNew		: /^([a-zA-Z\u4e00-\u9fa5\s\.\·\267\•\(\)\/]{2,38}|[a-zA-Z\s\.\/]{4,38})*$/,	//姓名-中文空格()/.· 或 英文空格/.
		regName			: /^([\u4e00-\u9fa5\s]|[a-zA-Z]|[\.])$/,//中文|空格|字母|"."
		regNameEmt		: /[a-zA-Z]{2,20}|[\u4e00-\u9fa5]{2,10}/,//谁TM写的养老险的正则？不管了，先原班过来吧
		regNameSpell	: /^[^\u4e00-\u9fa5]*$/,				//姓名拼音 非中文
		regPostCode		: /(^\d{6}$)/,							//邮政编码
		regAreaCode		: /(0[0-9]{2,3})/,						//固定电话 - 区号
		regTelephone	: /(^\d{6,8}$)/,						//邮政编码 - 号码
		regCargoName : /^([0-9a-zA-Z\u4e00-\u9fa5]{2,50})*$/,  //货物名称最多输入50个字符，只能是中文、英文、数字
		regAddress		: /^([\u4e00-\u9fa5]|[a-zA-Z\d]|[\.\(\)\（\）\-\#])*$/,	//中文|字母|数字|(|)|（|）|-|#
		regNamePost		: /^([\uFF0E\uFF07\uFF0F\,\.\·\•\(\)\'\/\uFF0D\u0391-\uFFE5-]{2,10}|[\uFF0C\uFF0E\uFF07\uFF08\uFF09\uFF0F\,\.\·\•\(\)\'\/\uFF0DA-Za-z\s-]{4,10})$/,
		regDecimal :  /(^0|^[1-9]\d*).\d{1,2}$/,
		//regDate         :/^((\\d{2}(([02468][048])|([13579][26]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])))))|(\\d{2}(([02468][1235679])|([13579][01345789]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\\s(((0?[0-9])|([1-2][0-3]))\\:([0-5]?[0-9])((\\s)|(\\:([0-5]?[0-9])))))?$/,
		/**
		*	把输入的字符串转换为半角 常用于校验之前调用如我们项目的校验框架option里面可加这样的配置项 beforeValid:'.validate.toDBC',
		*	输入: Str    任意字符串 
		*	输出: DBCStr 半角字符串 
		*	说明: 1、全角空格为12288，半角空格为32 
		*		 2、其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248 
		*/ 
		toDBC : function(obj){
			if(!obj) return true;
			var eObj = $(obj)
			objValue = eObj.val();
			if(!objValue) return true;
			var DBCStr = "";
			for(var i=0; i<objValue.length; i++){
				var c = objValue.charCodeAt(i);
				if(c == 12288) {
					DBCStr += String.fromCharCode(32);
					continue;
				}
				if (c > 65280 && c < 65375) {
					DBCStr += String.fromCharCode(c - 65248);
					continue;
				}
				DBCStr += String.fromCharCode(c);
			}
			DBCStr = $.trim(DBCStr);			//这里是去除首尾空格，看项目具体的需求是否要去空格
			//DBCStr = DBCStr.toUpperCase();	//这里是转换成大写字母，看项目具体是否要转大写
			DBCStr.indexOf("•")!=-1 && (DBCStr=DBCStr.replace(/\•/g,"\267"));
			eObj.val(DBCStr);
			return true;
		},
		
		/**
		*	严格的身份证号码校验
		*/
		idCard : function (idcard) {
			idcard = idcard.toUpperCase();
			/*if(idcard=="321123197911250068"){//前端临时对身份证号如下的人员进行屏蔽处理
				return "非常抱歉，您的投保人或被保人中存在不能满足我司投保条件的人员，故无法承保。请谅解！";
			}*/
			var Errors = [
				true,
				"身份证号码位数不对，请正确填写。",
				"身份证号码出生日期超出范围或含有非法字符，请正确填写。",
				"身份证号码校验错误，请正确填写。",	
				"身份证号码地区非法，请正确填写。",
				"身份证号码出生日期只能在当前日期之前!"
			];
			var area = {
				11: "\u5317\u4eac",	12: "\u5929\u6d25",	13: "\u6cb3\u5317",	14: "\u5c71\u897f",	15: "\u5185\u8499\u53e4",	21: "\u8fbd\u5b81",	22: "\u5409\u6797",	23: "\u9ed1\u9f99\u6c5f",
				31: "\u4e0a\u6d77",	32: "\u6c5f\u82cf",	33: "\u6d59\u6c5f",	34: "\u5b89\u5fbd",	35: "\u798f\u5efa",	36: "\u6c5f\u897f",	37: "\u5c71\u4e1c",	41: "\u6cb3\u5357",	42: "\u6e56\u5317",
				43: "\u6e56\u5357",	44: "\u5e7f\u4e1c",	45: "\u5e7f\u897f",	46: "\u6d77\u5357",	50: "\u91cd\u5e86",	51: "\u56db\u5ddd",	52: "\u8d35\u5dde",	53: "\u4e91\u5357",	54: "\u897f\u85cf",	
				61: "\u9655\u897f",	62: "\u7518\u8083",	63: "\u9752\u6d77",	64: "\u5b81\u590f",	65: "\u65b0\u7586",	71: "\u53f0\u6e7e",	81: "\u9999\u6e2f",	82: "\u6fb3\u95e8",	91: "\u56fd\u5916"
			};
			var Y, JYM;
			var S, M;
			var idcard_array = new Array();
			idcard_array = idcard.split("");
			if(idcard == ""){//为空
				return true;
			}
			if (area[parseInt(idcard.substr(0, 2))] == null) {
				return Errors[4];
			}
			switch (idcard.length) {
			case 15:
				if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/
				} else {
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/
				}
				if (ereg.test(idcard)) {
					var birthYear = idcard.substr(6, 2);
					var birthMonth = idcard.substr(8, 2);
					var birthDay = idcard.substr(10, 2);
					if(common.oServerDate){//取服务器端系统时间，没有则取客户端系统时间
						var oToday = common.oServerDate;
					}else{
						var oTodayMS = new Date();
						var oToday = new Date(oTodayMS.getFullYear(), oTodayMS.getMonth(), oTodayMS.getDate());
					}
					var oUserBirth = new Date(birthYear, parseInt(birthMonth,10) - 1, birthDay);
					if((Date.parse(oUserBirth)-Date.parse(oToday)) >= 0){
						return Errors[5];
					}
					return Errors[0];
				}else {
					return Errors[2];
				}
				break;
			case 18:
				if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
					ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/
				} else {
					ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/
				}
				if (ereg.test(idcard)) {
					S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
					Y = S % 11;
					M = "F";
					JYM = "10X98765432";
					M = JYM.substr(Y, 1);
					if (M == idcard_array[17]) {
						var birthYear = idcard.substr(6, 4);
						var birthMonth = idcard.substr(10, 2);
						var birthDay = idcard.substr(12, 2);
						if(common.oServerDate){
							var oToday = common.oServerDate;
						}else{
							var oTodayMS = new Date();
							var oToday = new Date(oTodayMS.getFullYear(), oTodayMS.getMonth(), oTodayMS.getDate());
						}
						var oUserBirth = new Date(birthYear, parseInt(birthMonth,10) - 1, birthDay);
						if((Date.parse(oUserBirth)-Date.parse(oToday)) >= 0){
							return Errors[5];
						}
						return Errors[0];
					} else {
						return Errors[3]
					}
				} else {
					return Errors[2];
				}
				break;
			default:
				return Errors[1];
				break;
			}
			return true
		},
		
		/** 
		*	校验是否为整数型字符串
		*/
		isInteger : function (str){
			Val = $.trim(str);
			myRegExp = /^([0-9]+)$/;
			return (myRegExp.test(Val))
		},
		/** 校验是否有金额 */
		isMoney:function(data){
			return /^(-)?\d+(\.\d{1,2})?$/.test(data);
		},
		/**
		*	校验字符字节长度
		*/
		byteLengthCheck : function(str,minlen,maxlen) {
			if (str == null) return false;
			var l = str.length;
			var blen = 0;
			for(i=0; i<l; i++) {
				if ((str.charCodeAt(i) & 0xff00) != 0) {
					blen ++;
				}
				blen ++;
			}
			if (blen > maxlen || blen < minlen) {
				return false;
			}
			return true;
		},
		//正则匹配身份证号码
		checkIdNo : function(idNo) {
			var num = idNo.toUpperCase();           //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
			if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
				return false;
			} //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
			//下面分别分析出生日期和校验位
			var len, re; len = num.length; if (len == 15) {
				re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
				var arrSplit = num.match(re);  //检查生日日期是否正确
				var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
				var bGoodDay; bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
				if (!bGoodDay) {
					return false;
				} else { //将15位身份证转成18位 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
					var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
					var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
					var nTemp = 0, i;
					num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
					for(i = 0; i < 17; i ++) {
						nTemp += num.substr(i, 1) * arrInt[i];
					}
					num += arrCh[nTemp % 11];
					return true;
				}
			}
			if (len == 18) {
				re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
				var arrSplit = num.match(re);  //检查生日日期是否正确
				var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
				var bGoodDay; bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
				if (!bGoodDay) {
					return false;
				} else { //检验18位身份证的校验码是否正确。 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
					var valnum;
					var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
					var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
					var nTemp = 0, i;
					for(i = 0; i < 17; i ++) {
						nTemp += num.substr(i, 1) * arrInt[i];
					}
					valnum = arrCh[nTemp % 11];
					if (valnum != num.substr(17, 1)) {
					 return false;
					 }
					return true;
				}
			}
			return false;
		},
		//正则匹配手机号
		checkPhone : function(phone) {
			if(!/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(phone)) {
				$(".tel").find(".errorTips").show();
				$(".tel input").attr("placeholder","");
				$(".tel input").val("");
				$(".tel").find(".errorTips").html("请输入有效手机号码");
				return false;
			}
			return true;
		}
		
	};
	// window._toDBC=validate.toDBC;
	// return validate;
	
