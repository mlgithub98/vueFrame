
/**
 * 10000 => "10,000"
 * @param {*} num
 */
export function formatCount(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
/**
 * aaaaaaaaaaaaaaaa.zip=>aa...aaaa.zip
 * @param {string} value 
 */

export function formatFileName(val) {
  if(val.length>20){
    var subStr1 = val.substr(0,10);
    var subStr2 = val.substr(val.length-8,8);
    var subStr = subStr1 + "..." + subStr2 ;
    return subStr;
  }else{
    return val
  }
}

/**
 * 1024byte=>1K
 * @param {number} value 
 */


export const formatFileSize = (value) => {
    if (value) {
      var num = 1024.00; //byte
      if (value==0)
          return value;
      if (value < num)
          return value + "B";
      if (value < Math.pow(num, 2))
          return (value / num).toFixed(2) + "K"; //kb
      if (value < Math.pow(num, 3))
          return (value / Math.pow(num, 2)).toFixed(2) + "M"; //M
      if (value < Math.pow(num, 4))
          return (value / Math.pow(num, 3)).toFixed(2) + "G"; //G
      return (value / Math.pow(num, 4)).toFixed(2) + "T"; //T
    }
  
  };

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * Upper case first char
 * world=>World
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}



/**
 * rmb and two decimal places
 * @param {*} value 
 */
export const formatRMBPrice2 = (value) => {
    if (value) {
      value = Number(value);
      return '￥ ' + value.toFixed(2);
    }
  };
  
  export const cardSpace4 = (value) => {
    if (value) {
      let postV = value.replace(/\D/g, '').replace(/....(?!$)/g, '$& ');
      return postV;
    }
  };

  
  export const datetime = (value) => {
    if (value) {
      value = Number(value);
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  };
  export const date = (value) => {
    if (value) {
      value = Number(value);
      return moment(value).format('YYYY-MM-DD')
    }
  };
  export const time = (value) => {
    if (value) {
      value = Number(value);
      return moment(value).format('HH:mm:ss')
    }
  };
  export const formatSecond = (value) => {
    if (value) {
      value = Number(value);
      return `${(Math.floor(value / (60 * 60)) + 100).toString().substr(1)}:${(Math.floor(value / 60) + 100).toString().substr(1)}:${(value % 60 + 100).toString().substr(1)}`
    }
  };
  