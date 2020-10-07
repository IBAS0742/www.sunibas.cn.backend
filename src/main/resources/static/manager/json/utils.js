Number.prototype.zeros = "000000000000000000000000000000000000000000";
Number.prototype.toLen = function(len) {
    let n = this.toString();
    if (n.length < len) {
        return this.zeros.substring(0,len - n.length) + n;
    }
    return n;
};
// "2020-09-20T10:02:50.735Z"
// "2020-09-20T18:09:19.955Z"
let DateToTimestamp = function (d) {
    if (d && d instanceof Date) {} else if (this instanceof Date) {} else {
        d = new Date();
    }
    return `${d.getFullYear()}-${(d.getMonth() + 1).toLen(2)}-${d.getDate().toLen(2)}T${d.getHours().toLen(2)}:${d.getMinutes().toLen(2)}:${d.getSeconds().toLen(2)}.${d.getMilliseconds().toLen(3)}Z`
}
Date.prototype.DateToTimestamp = DateToTimestamp;