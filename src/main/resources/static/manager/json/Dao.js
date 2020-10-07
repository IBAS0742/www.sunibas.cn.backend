class Description {
    static fromString(str) {
        let sd = new Description();
        if (str.substring(0,4) === "des#") {
            sd._str = str;
            str.substring(4).split('#').map(_ => _.trim())
                .filter(_ => _)
                .forEach(_ => {
                    let sp = _.split('@');
                    if (sp.length === 2) {
                        sd.kv[sp[0]] = sp[1];
                    }
                });
            return sd;
        } else {
            sd._str = str;
            return sd;
        }
    }
    static fromObject(obj) {
        return new Description(obj);
    }
    // 格式是 des#key@value#key@value
    constructor(kv) {
        // kv 是其他属性
        this.kv = kv || {};
        this._str = "";
    }
    get string() {
        let str = this.asString();
        if (!str && this._str) {
            return this._str;
        } else {
            return str;
        }
    }
    asString() {
        let str = `des`;
        for (let i in this.kv) {
            str += `#${i}@${this.kv[i]}`;
        }
        this._str = str;
        return str;
    }
}

let toParamString = function(obj) {
    return Object.keys(obj).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    }).join('&');
}

class Dao {
    static time = "2020-01-01T00:00:00.000Z"
    static getBingImg() {
        return fetch(scalaServer + 'jsons/bingPic.json').then(_ => _.text()).then(JSON.parse)
    }
    constructor(path) {
        this.ip = scalaServer;
        this._path = path;
        this.path = {delete:"",insert:"",update:"",list:""};
        if (typeof path === "object") {
            this.path = path;
        } else {
            this.path = {
                delete: path,insert: path,update: path,list: path
            };
        }
    }

    fetchJson(url,data) {
        return fetch(url,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            method: 'POST',
            body: toParamString(data || {})
        }).then(_ => _.text()).then(JSON.parse)
            .then(_ => {
                if (_.code === 200) {
                    return _;
                } else {
                    throw new Error(_.message);
                }
            });
    }
}