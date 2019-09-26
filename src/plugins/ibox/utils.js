// 正则匹配
let Pattern = {
  isEmpty: /(^\s*)|(\s*$)/g,
  isMobile: /^1[3|4|5|6|7|8][0-9]{9}$/,
  isCnAndEn: /^[\u4E00-\u9FA5]+$/,
  isCnAndEnAndNum: /^[\u4e00-\u9fa5-a-zA-Z0-9]+$/,
  isUserName: /^[(\u4e00-\u9fa5)a-zA-Z]+$/,
  isPassword: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
  isAuthCode: /^[0-9]{6}$/,
  isTelAndMobile: /^(1[3|4|5|7|8][\d]{9}|0[\d]{2,3}-[\d]{7,8}|400[-]?[\d]{3}[-]?[\d]{4})$/
}

const validator = {
  /**
   * 执行正则表达式
   * @param pattern 校验的正则表达式
   * @param strValue 校验的值
   * @returns {boolean}
   */
  executeExp: function (pattern, strValue) {
    return pattern.test(strValue)
  },
  /**
   * 判断字符串是否为空
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isEmpty: function (strValue) {
    strValue = strValue.replace(Pattern.isEmpty, '')
    return strValue.length === 0
  },
  /**
   * 判断字符串是否非空
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isNotEmpty: function (strValue) {
    return !this.isEmpty(strValue)
  },
  /**
   * 判断是否为中文
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isCnAndEn: function (strValue) {
    if (this.isEmpty(strValue)) {
      return false
    }

    return this.executeExp(Pattern.isCnAndEn, strValue)
  },
  /**
   * 判断是否为中英文、数字及'-'
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isCnAndEnAndNum: function (strValue) {
    if (this.isEmpty(strValue)) {
      return false
    }

    return this.executeExp(Pattern.isCnAndEnAndNum, strValue)
  },
  /**
   * 判断是否为用户名
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isUserName: function (strValue) {
    if (this.isEmpty(strValue)) {
      return false
    }

    return this.executeExp(Pattern.isUserName, strValue)
  },
  /**
   * 判断验证码格式
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isAuthCode: function (strValue) {
    if (this.isEmpty(strValue)) {
      return false
    }
    return this.executeExp(Pattern.isAuthCode, strValue)
  },
  /**
   * 判断是否为手机号码
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isMobile: function (strValue) {
    if (this.isEmpty(strValue)) {
      return false
    }
    return this.executeExp(Pattern.isMobile, strValue)
  },
  /**
   * 判断是否为手机或电话号码
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isTelAndMobile: function (strValue) {
    if (this.isEmpty(strValue)) {
      return false
    }
    return this.executeExp(Pattern.isTelAndMobile, strValue)
  },
  /**
   * 判断是否符合密码规则
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isPassword: function (strValue) {
    if (this.isEmpty(strValue)) {
      return false
    }
    return this.executeExp(Pattern.isPassword, strValue)
  },
  /**
   * 对象是否为空
   * @param obj 检验对象
   * @returns {boolean}
   */
  isEmptyObj: (obj) => {
    return Object.keys(obj).length === 0
  },
  /**
   * 是否在范围长度内
   * @param 范围数组 [1, 10] 长度在1-10内
   * @returns {boolean}
   */
  isLenRange: (strValue, lenArr) => {
    return strValue.length >= lenArr[0] && strValue.length <= lenArr[1]
  },
  /**
   * 是否在数值范围内
   * @param 范围数组 [1, 10] 数值在1-10内
   * @returns {boolean}
   */
  isNumRange: (numValue, numArr) => {
    return numValue >= numArr[0] && numValue <= numArr[1]
  }

}

// 监听元素自身以外的事件，Vue自定义指定
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
};

// 适配底部公共组件的位置
function setMinH(that, headerH = 49, footerH = 213, key) {
  that[key] = document.documentElement.clientHeight - (headerH + footerH) - 43
  window.onresize = () => {
    that[key] = document.documentElement.clientHeight - (headerH + footerH) - 43
  }
}

// 时间戳格式转换
function add0(m) {
  return m < 10 ? '0' + m : m
}

// 完整格式
function timeFormat(timestamp, type) {
  //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
  var time = new Date(timestamp);
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var date = time.getDate();
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();
  if (type == "yy-mm") {
    return year + '-' + add0(month)
  } else if (type == "年月") {
    return year + '年' + add0(month) + '月'
  } else if (type == "年月日") {
    return year + '-' + add0(month) + '-' + add0(date)
  } else if (type == "年.月") {
    return year + '.' + add0(month)
  } else {
    return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes);
  }
}

// 字符串拼接
function getTextByJs(arr, key, f) {
  var str = ''
  var val = ''
  for (var i = 0; i < arr.length; i++) {
    str += (val = key ? arr[i][key] : arr[i]) + f;
  }
  //去掉最后一个逗号(如果不需要去掉，就不用写)
  if (str.length > 0) {
    str = str.substr(0, str.length - 1);
  }
  return str;
}

// 字符串以指定符号分割
// function getTextByJs(arr, key, f) {
//   var str, val;
//   for (var i = 0; i < arr.length; i++) {
//     str += (val = key ? arr[i][key] : arr[i]) + f;
//   }
//   //去掉最后一个逗号(如果不需要去掉，就不用写)
//   if (str.length > 0) {
//     str = str.substr(0, str.length - 1);
//   }
//   return str;
// }
// 数组对象排序
function sortBy(key) {
  return function (a, b) {
    return a[key] - b[key];
  }
}


// 把一个数组按照一定长度分割成若干数组
function group(array, subGroupLength) { //原来数组，长度
  let index = 0;
  let newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength));
  }
  return newArray;
}

// 计算两个日期之前相差的天数或者年
function datedifference(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式  
  var dateSpan,
    tempDate,
    iDays,
    iYeah;
  // sDate1 = Date.parse(sDate1);
  // sDate2 = Date.parse(sDate2);
  dateSpan = sDate2 - sDate1;
  dateSpan = Math.abs(dateSpan);
  iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
  iYeah = Math.floor(iDays / 354)
  return iYeah
};

// 数组中对象去重 reduce 用法
function ArraySet(data) {
  let obj = {};
  return data.reduce((cur, next) => {
    obj[next.name] ? "" : obj[next.name] = true && cur.push(next);
    return cur;
  }, [])
}

// 数组中对象去重 reduce 用法
function ArraySets(data, key) {
  let obj = {};
  return data.reduce((cur, next) => {
    obj[next[key]] ? "" : obj[next[key]] = true && cur.push(next);
    return cur;
  }, [])
}

// 时间戳计算
function getAge(birthday) {
  //出生时间 毫秒
  var birthDayTime = new Date(birthday).getTime();
  //当前时间 毫秒
  var nowTime = new Date().getTime();
  //一年毫秒数(365 * 86400000 = 31536000000)
  return Math.ceil((nowTime - birthDayTime) / 31536000000);
}

// 防抖函数
export function debounce(func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// textarea值转换 /n 转换成 br
function textareaValConversion(val, type) {
  var str = "";
  var outVal = new RegExp("<br/>", "g"); //打印
  var saveVal = new RegExp("\r\n", "g"); //保存
  var saveVal2 = new RegExp("\n", "g"); //保存
  if (type == 1) {
    str = val.replace(outVal, "\n").replace(/&nbsp\;/g, ' ')
  } else if (type == 2) {
    str = val.replace(saveVal, "<br/>>").replace(saveVal2, '<br/>').replace(/\s/g, '&nbsp;')
  }
  return str;
}

// 解析地址栏参数对象
function getUrlkey(url) {
  var params = {};
  var query = [];
  var urls = url.split("?");
  if (urls.length == 2) {
    query = urls[1]
  } else if (urls.length == 1) {
    query = urls[0]
  }
  var arr = query.split("&");
  for (var i = 0, l = arr.length; i < l; i++) {
    var a = arr[i].split("=");
    params[a[0]] = a[1];
  }
  return params;
}

// text为传入的文本  num为单行显示的字节长度
function textByteLength(text, num) {
  let strLength = 0; // text byte length
  let rows = 1;
  let str = 0;
  let arr = [];
  for (let j = 0; j < text.length; j++) {
    if (text.charCodeAt(j) > 255) {
      strLength += 2;
      if (strLength > rows * num) {
        strLength++;
        arr.push(text.slice(str, j));
        str = j;
        rows++;
      }
    } else {
      strLength++;
      if (strLength > rows * num) {
        arr.push(text.slice(str, j));
        str = j;
        rows++;
      }
    }
  }
  arr.push(text.slice(str, text.length));
  return [strLength, arr, rows] //  [处理文字的总字节长度，每行显示内容的数组，行数]
}

//判断浏览器
function browserType() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isOpera = false;
  if (userAgent.indexOf('Edge') > -1) {
    return "Edge";
  }
  if (userAgent.indexOf('.NET') > -1) {
    return "IE";
  }
  if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    isOpera = true;
    return "Opera"
  }; //判断是否Opera浏览器
  if (userAgent.indexOf("Firefox") > -1) {
    return "FF";
  } //判断是否Firefox浏览器
  if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  }
  if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  } //判断是否Safari浏览器
  if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
    return "IE";
  }; //判断是否IE浏览器
}

// base64解码
function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

export default {
  validator,
  clickoutside,
  group,
  timeFormat,
  getTextByJs,
  datedifference,
  textareaValConversion,
  setMinH,
  getUrlkey,
  textByteLength,
  ArraySet,
  browserType,
  b64DecodeUnicode,
  getAge,
  ArraySets,
  sortBy
}