/**
 * Created by Administrator on 2016/9/30.
 */


/**
 * 替换指定字符串中的所有内容
 * @param origin 原字符串
 * @param target 被替换的内容
 * @param result 替换之后的内容
 * @returns {void|string|XML|*}
 */
const replaceAll = function(origin, target, result){
    return origin.replace(new RegExp(target, "gm"), result);
}

/**
 * 文件服务器工具方法
 * @type {{}}
 */
const upUtil = {};
(function () {
    var _this = this, _sLetters = [' ', '(', '!', '@', '#', '$', '%', '^', '&', '*', ';', ':', ')'];
    this.randKey = function () {//生成随机串
        var date = new Date();
        return '' + date.getFullYear() + (function () {
                var month = '' + (date.getMonth() + 1);
                return month.length > 1 ? month : '0' + month;
            })() + (function () {
                return date.getDate().length > 1 ? date.getDate() : '0' + date.getDate();
            })() + date.getHours() + date.getMinutes() + date.getSeconds() + upUtil.randomStr(18) + upUtil.uuid();
    };
    /**
     * 根据指定长度生成随机字符串
     * @param len 生成的字符串长度，默认为32
     * @returns {string} 随机字符串
     */
    this.randomStr = function (len) {
        len = len || 32;
        var $chars = 'ABCDEFGHIJKLMNOPQRSTWXYZ1234567890';
        /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*** */
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    };
    /**
     * 模拟生成uuid
     * @param len 长度
     * @param radix 种子
     * @returns {string}
     */
    this.uuid = function (len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''), uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            var r;
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    };
    /**
     * 设定记录日志开关
     * @type {boolean}
     */
    this.belog = false;

    /**
     * 记录日志
     * @param info
     */
    this.log = function (info) {
        if (_this.belog) {
            console.log(info)
        }
    };

    /**
     * 解析文件的大小
     * @param  {string} s
     * @returns {*}
     */
    this.special = function (s) {
        return clearString(replaceAll(s, ' ', ''));
    };

    /**
     * 解析文件的大小
     * @param size {string} 文件尺寸
     * @returns {*}
     */
    this.getFileSize = function (size) {
        const endChar1 = size.charAt(size.length - 1), endChar2 = size.charAt(size.length - 2), match1 = /[A-Za-z]/.test(endChar1), match2 = /[A-Za-z]/.test(endChar2);
        var endChar, hasChar, numSize, realSize;
        if (match1 && match2) {
            endChar = endChar2 + endChar1;
            numSize = parseInt(size.substring(0, size.length - 2));
            hasChar = true;
        } else if (match1) {
            endChar = endChar1;
            numSize = parseInt(size.substring(0, size.length - 1));
            hasChar = true;
        } else{
            hasChar = false;
        }
        switch (endChar) {
            case 'mb':
            case 'm':
                realSize = numSize * 1024 * 1024;
                break;
            case 'kb':
            case 'k':
                realSize = numSize * 1024;
                break;
            case 'b':
            default:
                realSize = numSize;
                break;
        }
        return realSize;
    };

    /**
     * 提取文件后缀
     * @param fileName
     * @returns {*}
     */
    this.getFileType = function (fileName) {
        const types = fileName.split('.');
        return '.' + types[types.length - 1];
    };

    /**
     * 获取文件名称，不带后缀
     * @param fileName
     * @return {string}
     */
    this.getFileName = function(fileName){
        const names = fileName.split('.');
        return names[0];
    };

    //-------------------------------
    // 用于生成随机串
    function randomStr(len) {
        len = len || 32;
        var $chars = 'ABCDEFGHIJKLMNOPQRSTWXYZ1234567890';
        /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*** */
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return uuid() + pwd;
    }

    // 用于生成UUID
    function uuid(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''), uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            var r;
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    }

    function clearString(s) {
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;|{}【】‘；：”“'。，、？]")
        var rs = "";
        for (var i = 0; i < s.length; i++) {
            rs = rs + s.substr(i, 1).replace(pattern, '');
        }
        return rs;
    }
}).call(upUtil);

/**
 * 上传状态
 * @type {{SUC: {code: number, info: string}, ERR: {code: number, info: string}, NOT_All_SUC: {code: number, info: string}, ERR_NO_FILES: {code: number, info: string}, ERR_NO_FILE: {code: number, info: string}, ERR_SIZE_OUT_OF_RANGE: {code: number, info: string}, throwErr: PalmgUpResult.throwErr}}
 */
const upResult = {
    SUC: {
        code: 1,
        info: '上传文件成功'
    },
    NOT_All_SUC: {
        code: 10002,
        info: '部分文件上传失败'
    },
    ERR: {
        code: -10000,
        info: '上传文件异常'
    },
    ERR_NO_FILES: {
        code: -10100,
        info: '传入的files列表为空'
    },
    ERR_NO_FILE: {
        code: -10200,
        info: '传入的file 为空'
    },
    ERR_TYPE: {
        code: -10300,
        info: '文件类型错误'
    },
    ERR_SIZE_OUT_OF_RANGE: {
        code: -10400,
        info: '上传的文件超过限制大小'
    },
    throwErr: function (code, info) {
        return {
            code: code,
            info: info
        }
    }
};

module.exports = {upUtil:upUtil, upResult:upResult}