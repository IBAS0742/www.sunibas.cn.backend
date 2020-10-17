class IndexPage {
    static defaultSetting = {
        title: "_clock_",
        imageSetting: {
            type: 'bing', // bing 必应图片 color 纯颜色
            color: '#2196f3'
        }
    }

    // doms = {navbox,body,bgbox,presetNavsArea}
    constructor(setting, doms,phone) {
        setting = setting || {};
        setting = typeof setting === 'object' ? setting : {};
        this.setting = Object.assign(setting, IndexPage.defaultSetting);
        this.bgImage = {};
        this.doms = doms;
        this.initBgImage();
        this.icons = {
            defaultIcon: 'icon-moban',
            init: false,
            currentSelect: 'inner',
            inner: [
                {
                    description: "切换背景图片",
                    filenam: "",
                    id: "bg_img",
                    image: "image:{ip}/images/background-image.png",
                    path: "function:changeBackImage",
                    tags: "pdf;",
                    title: "切换背景图片",
                    type: "inner",
                }
            ],
            outter: [],
            // self: [],
        };
        this.phoneIcons = {
            // 一页几行、几列、现在显示第几页
            pageRow: 0,
            pageCol: 0,
            pageIndex: 0,
            icons: [],
            pre: {
                description: "上一页",
                filenam: "",
                id: "bg_pre",
                image: "icon:icon-cs-jt-xz-1-1",
                path: "function:phone_pre",
                tags: "pdf;",
                title: "上一页",
                type: "inner",
            },
            next: {
                description: "下一页",
                filenam: "",
                id: "bg_next",
                image: "icon:icon-xiayishou",
                path: "function:phone_next",
                tags: "pdf;",
                title: "下一页",
                type: "inner",
            },
        };
        phone ? this.initIconsAsPhone(true) : this.initIcons();
    }

    // 初始化背景图片
    initBgImage() {
        if (this.setting.imageSetting.type === "color") {
            this.doms.bgbox.css({display: 'unset'});
            this.doms.bgbox[0].src = "";
            this.doms.navbox.css({backgroundColor: this.setting.imageSetting.color});
        } else if (this.setting.imageSetting.type === "bing") {
            if (this.setting.imageSetting.images) {
                this.setting.imageSetting.fromInd++;
                this.setting.imageSetting.fromInd = this.setting.imageSetting.fromInd % this.setting.imageSetting.images.length;
                this.doms.bgbox.css({display: 'unset'});
                this.doms.bgbox[0].src = this.setting.imageSetting.images[this.setting.imageSetting.fromInd].url;
                this.doms.navbox.css({backgroundColor: 'transparent'});
            } else {
                Dao.getBingImg().then(_ => {
                    this.setting.imageSetting.images = _;
                    let ind = parseInt(Math.random() * _.length);
                    this.setting.imageSetting.fromInd = ind;
                    this.doms.bgbox.css({display: 'unset'});
                    this.doms.bgbox[0].src = _[ind].url;
                    this.doms.navbox.css({backgroundColor: 'transparent'});
                });
            }
        }
    }

    _getIconDom(icon,style) {
        let _icon = ``;
        if (icon.image.startsWith('icon:')) {
            _icon = `<div class="cusNavIcon">
                    <svg style="width: 100%;height: 100%;padding: 10px;" class="icon" aria-hidden="true">
                    <use xlink:href="#${icon.image.substring('icon:'.length)}"></use>
                </svg></div>`;
        } else if (icon.image.startsWith('image:')) {
            _icon = `<div class="cusNavIcon">
                        <img src="${icon.image.substring('image:'.length).replace('{ip}',scalaServer)}" style="width: 100%;height: 100%;padding: 10px;"></img></div>`;
        } else {
            _icon = `<div class="cusNavIcon">
                    <svg style="width: 100%;height: 100%;padding: 10px;" class="icon" aria-hidden="true">
                    <use xlink:href="#${this.icons.defaultIcon}"></use>
                </svg></div>`;
        }
        return `<div id="${icon.id}" class="customNav shouldNotFade shouldNotSwitch added" style="background-color: #67ccfa6e;${style}">${_icon}
                <div class="cusNavTitle shouldNotFade shouldNotSwitch">${icon.title}</div>
            </div>`;
    }
    // 初始化图表
    initIcons() {
        let $this = this;
        if (this.icons.init) {
            let dom = ``;
            let color = this.icons.currentSelect === 'inner' ? '#67ccfa6e' : '#789578a6';
            this.icons[this.icons.currentSelect].forEach(icon => {
                dom += this._getIconDom(icon);
            });
            this.doms.presetNavsArea.html(dom);
            $('.customNav').on('mouseover',function () {
                let id = this.id;
                let desc = "";
                $this.icons[$this.icons.currentSelect].forEach(_ => {
                    if (_.id === id) {
                        desc = _.description;
                    }
                });
                $this.doms.appDetail.css({opacity: 1});
                $this.doms.appDetail.html(desc);
            });
            $('.customNav').on('mouseout',function () {
                $this.doms.appDetail.css({opacity: 0});
                $this.doms.appDetail.html("");
            });
            $('.customNav').on('click',function () {
                let id = this.id;
                let path = "";
                $this.icons[$this.icons.currentSelect].forEach(_ => {
                    if (_.id === id) {
                        path = _.path;
                    }
                });
                if (path.startsWith("http://") || path.startsWith("https://")) {
                    window.open(path);
                } else if (path.startsWith("function:")) {
                    let func = path.substring("function:".length);
                    $this.dearFunction(func);
                } else {
                    window.open(scalaServer + path);
                }
            });
            return;
        }
        PagesDao.listAll().then(_ => {
            _.data.forEach(icon => {
                this.icons[icon.type].push(icon);
            });
            this.icons.init = true;
            this.initIcons();
        });
        let selectOneTab = function (name) {
            $this.doms.outterTab.removeClass('selected');
            $this.doms.noteTab.removeClass('selected');
            $this.doms.innerTab.removeClass('selected');
            $this.doms.settingTab.removeClass('selected');
            $this.doms[`${name}Tab`].addClass('selected');
        }
        this.doms.innerTab.on('click',function () {
            if ($this.icons.currentSelect == 'inner') {
                return;
            }
            selectOneTab('inner');
            $this.icons.currentSelect = 'inner';
            $this.initIcons();
        });
        this.doms.outterTab.on('click',function () {
            if ($this.icons.currentSelect == 'outter') {
                return;
            }
            selectOneTab('outter');
            $this.icons.currentSelect = 'outter';
            $this.initIcons();
        });
        this.doms.settingTab.on('click',function () {
            if ($this.icons.currentSelect == 'setting') {
                return;
            }
            $this.icons.currentSelect = 'setting';
            selectOneTab('setting');
            $this.showSetting();
        });
        this.doms.noteTab.on('click',function () {
            if ($this.icons.currentSelect == 'note') {
                return;
            }
            $this.icons.currentSelect = 'note';
            selectOneTab('note');
            $this.showNote();
        });
        this._initStyle();
    }
    _initStyle() {
        document.head.innerHTML += `<style>
    .customNav:hover {
        width: 130px;
        height: 130px;
        margin: 0;
        background-color: white !important;
    }
    .customNav:hover .cusNavIcon {
        padding: 0 12px 25px;
    }
    .customNav:hover .cusNavTitle {
        bottom: 5px;
        color: black;
        font-size: medium;
        font-weight: bold;
    }
    .searchOpt:hover {
        background-color: rgba(32, 114, 255, 0.36);
        color: white;
    }
</style>`
    }
    initIconsAsPhone(firstTime) {
        if (!firstTime) {
            let time = 0;
            $('.customNav').each((inde,dom) => {
                setTimeout(_ => dom.style.opacity = 0,time);
                time += 20;
            });
            setTimeout(_ => {
                this.initIconsAsPhone(true);
            },20 * this.phoneIcons.pageRow * this.phoneIcons.pageCol);
            return;
        }
        if (this.icons.init) {
            let $this = this;
            let dom = ``;
            // 推定前一页放满得到起始索引
            let fromIndex = 0;
            let len = this.phoneIcons.pageRow * this.phoneIcons.pageCol - 2;
            var i = 0;
            for (i = 1;i < this.phoneIcons.pageIndex;i++) {
                fromIndex += len;
            }
            if (this.phoneIcons.pageIndex === 1) {
                len++;
            } else {
                fromIndex++;
                dom += this._getIconDom(this.phoneIcons.pre,"opacity: 0");
            }
            for (i = fromIndex;i < fromIndex + len && i < this.phoneIcons.icons.length;i++) {
                dom += this._getIconDom(this.phoneIcons.icons[i],"opacity: 0");
            }
            if (i < this.phoneIcons.icons.length) {
                dom += this._getIconDom(this.phoneIcons.next,"opacity: 0");
            }
            this.doms.presetNavsArea.html(dom);
            let time = 0;
            $('.customNav').toArray().reverse().forEach((dom) => {
                setTimeout(_ => dom.style.opacity = 1,time);
                time += 20;
            });
            $('.customNav').css({
                margin: '3px 3px 25px'
            });
            $('.customNav').on('click',function () {
                let id = this.id;
                let path = "";
                $this.phoneIcons.icons.forEach(_ => {
                    if (_.id === id) {
                        path = _.path;
                    }
                });
                if (!path) {
                    if (id === $this.phoneIcons.next.id) path = $this.phoneIcons.next.path;
                    if (id === $this.phoneIcons.pre.id) path = $this.phoneIcons.pre.path;
                }
                if (path.startsWith("http://") || path.startsWith("https://")) {
                    window.open(path);
                } else if (path.startsWith("function:")) {
                    let func = path.substring("function:".length);
                    $this.dearFunction(func);
                } else {
                    window.open(scalaServer + path);
                }
            });
            return;
        }
        this._initPhoneStyle();
        this.doms.innerTab.parent()[0].style.display = "none";
        PagesDao.listAll().then(_ => {
            _.data.forEach(icon => {
                this.icons[icon.type].push(icon);
            });
            this.icons.inner.forEach(inner => this.phoneIcons.icons.push(inner));
            this.icons.outter.forEach(outter => this.phoneIcons.icons.push(outter));
            this.phoneIcons.pageIndex = 1;
            this.phoneIcons.pageCol = parseInt((window.outerHeight - 70) / 107);
            this.phoneIcons.pageRow = parseInt(window.outerWidth / 86);
            this.icons.init = true;
            this.initIconsAsPhone(true);
        });
    }
    _initPhoneStyle() {
        jQuery('#title').css({
            width: '100vw',
            margin: 0,
            left: 0,
            top: 0
        });
        jQuery('#navbox').css({ height: '100vh' });
        jQuery('#navbox0').css({
            marginTop: '0',
            width: '100vw',
            height: '100vh',
            paddingTop: '70px',
            left: '0'
        });
        jQuery('#navbox1').css({ width: '100vw' });
        jQuery('#navboxCustom').css({
            width: '100vw',
            marginLeft: `${(document.body.offsetWidth % 86) / 2}px`
        });
    }

    // 菜单的 path=function:xxx 时，xxx 就是这里的 func
    // 例如 path=function:
    dearFunction(func) {
        switch (func) {
            case 'changeBackImage':
                this.initBgImage();
                break;
            case 'phone_pre':
                this.phoneIcons.pageIndex--;
                this.initIconsAsPhone();
                break
            case 'phone_next':
                this.phoneIcons.pageIndex++;
                this.initIconsAsPhone();
                break
        }
    }

    showNote() {
        let $this = this;
        UserDao.checkLogin(function () {
            if (UserDao.isLogin) {
                $this.doms.presetNavsArea.html(`<div style="width: 100%;height: 100%;color: white;">
                    <div style="font-size: 20px;text-align: center;padding-top: 20px;">功能还没写</div>
                </div>`);
            } else {
                $this.doms.presetNavsArea.html(`<div style="width: 100%;height: 100%;color: white;">
                    <div tar="toLogin" style="font-size: 20px;text-align: center;padding-top: 20px;">便签需要登录，但是我功能还没写</div>
                </div>`);
                $this.doms.presetNavsArea.find('[tar="toLogin"]').on('click',function () {
                    location.href = './../manager/login.html?from=./../web/index.html';
                });
            }
        });
    }

    showSetting() {
        let $this = this;
        UserDao.checkLogin(function () {
            if (UserDao.isLogin) {
                $this.doms.presetNavsArea.html(`<div style="width: 100%;height: 100%;color: white;">
                    <div style="font-size: 20px;text-align: center;padding-top: 20px;">功能还没写</div>
                </div>`);
            } else {
                $this.doms.presetNavsArea.html(`<div style="width: 100%;height: 100%;color: white;">
                    <div tar="toLogin" style="font-size: 20px;text-align: center;padding-top: 20px;">设置需要登录，但是我功能还没写</div>
                </div>`);
                $this.doms.presetNavsArea.find('[tar="toLogin"]').on('click',function () {
                    location.href = './../manager/login.html?from=./../web/index.html';
                });
            }
        });
    }
}