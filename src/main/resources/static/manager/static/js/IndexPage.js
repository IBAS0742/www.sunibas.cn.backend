class IndexPage {
    static defaultSetting = {
        title: "_clock_",
        imageSetting: {
            type: 'bing', // bing 必应图片 color 纯颜色
            color: '#2196f3'
        }
    }

    // doms = {navbox,body,bgbox,presetNavsArea}
    constructor(setting, doms) {
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
            inner: [],
            outter: [],
            // self: [],
        };
        this.initIcons();
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

    // 初始化图表
    initIcons() {
        let $this = this;
        if (this.icons.init) {
            let dom = ``;
            let color = this.icons.currentSelect === 'inner' ? '#67ccfa6e' : '#789578a6';
            this.icons[this.icons.currentSelect].forEach(icon => {
                let _icon = ``;
                if (icon.image.startsWith('icon:')) {
                    _icon = `<svg class="icon cusNavIcon" aria-hidden="true">
                    <use xlink:href="#${icon.image.substring('icon:'.length)}"></use>
                </svg>`;
                } else if (icon.image.startsWith('image:')) {
                    _icon = `<div class="cusNavIcon" style="margin: 0px !important;top: 0;left: 0;width: 100%;height: 100%;">
                        <img src="${icon.image.substring('image:'.length)}" style="width: 100%;height: 100%;padding: 10px;"></img></div>`;
                } else {
                    _icon = `<svg class="icon cusNavIcon" aria-hidden="true">
                    <use xlink:href="#${this.icons.defaultIcon}"></use>
                </svg>`;
                }
                dom += `<div class="customNav shouldNotFade shouldNotSwitch added" style="background-color: ${color}">${_icon}
                <div class="cusNavTitle shouldNotFade shouldNotSwitch">${icon.title}</div>
            </div>`;
            });
            this.doms.presetNavsArea.html(dom);
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
    }

    showNote() {
        let $this = this;
        UserDao.checkLogin(function () {
            if (UserDao.isLogin) {
            } else {
                $this.doms.presetNavsArea.html(`<div style="width: 100%;height: 100%;color: white;">
                    <div tar="toLogin" style="font-size: 20px;text-align: center;padding-top: 20px;">便签需要登录，但是我功能还没写</div>
                </div>`);
                $this.doms.presetNavsArea.find('[tar="toLogin"]').on('click',function () {
                    location.href = 'login.html?from=index.html';
                });
            }
        });
    }

    showSetting() {
        let $this = this;
        UserDao.checkLogin(function () {
            if (UserDao.isLogin) {
            } else {
                $this.doms.presetNavsArea.html(`<div style="width: 100%;height: 100%;color: white;">
                    <div tar="toLogin" style="font-size: 20px;text-align: center;padding-top: 20px;">设置需要登录，但是我功能还没写</div>
                </div>`);
                $this.doms.presetNavsArea.find('[tar="toLogin"]').on('click',function () {
                    location.href = 'login.html?from=index.html';
                });
            }
        });
    }
}