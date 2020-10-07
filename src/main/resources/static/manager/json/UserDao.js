const UserDao = new (class extends Dao {
    constructor() {
        super("user");
        this.isLogin = false;
        this.userInfo = {};
    }

    login({password,username}) {
        return fetch(`${window.scalaServer}${this._path}/login?username=${username}&password=${password}`,{
            method: 'POST'
        })
            .then(_ => _.text())
            .then(JSON.parse)
            .then(_ => {
                if (_.code === 200) {
                    sessionStorage.setItem('token',_.data.id);
                    return _.data;
                } else {
                    throw new Error(_.message);
                }
            });
    }

    register({password,username}) {
        return fetch(`${window.scalaServer}${this._path}/register?username=${username}&password=${password}`,{
            method: 'POST'
        })
            .then(_ => _.text())
            .then(JSON.parse)
            .then(_ => {
                if (_.code === 200) {
                    return _.data;
                } else {
                    throw new Error(_.message);
                }
            });
    }

    info(token) {
        return fetch( `${window.scalaServer}${this._path}/info?token=` + token,{method: 'post'})
            .then(_ => _.text()).then(JSON.parse);
    }

    list({page,pageCount}) {}

    getAdminQuestion() {
        return fetch( `${window.scalaServer}utils/getAdminQuestion`,{method: 'post'})
            .then(_ => _.text()).then(JSON.parse);
    }

    checkQuestionAnswer(token,question,answer) {
        return fetch(`${window.scalaServer}utils/checkAdminQuestion?token=${token}&question=${question}&answer=${answer}`,{method: 'post'})
            .then(_ => _.text())
            .then(JSON.parse)
    }

    checkLogin(cb) {
        let token = sessionStorage.getItem("token");
        if (token) {

        } else {
            this.isLogin = false;
            UserDao.info(window.token).then(_ => {
                if (_.code === 200) {
                    this.userInfo = _.data;
                    this.isLogin = true;
                }
                cb(this);
            });
        }
    }
});