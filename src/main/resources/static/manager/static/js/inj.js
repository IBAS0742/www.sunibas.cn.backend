const insertDomToHead = (domType,doFn,onload) => {
    return new Promise(function (s) {
        let dom = document.createElement(domType);
        doFn(dom);
        document.head.append(dom);
        if (onload) {
            dom.onload = function () {
                s();
            }
        } else {
            s();
        }
    })
}
const insertJSFile = (link) => {
    return insertDomToHead('script',function (script) {
        script.src = link;
    },true);
};
const insertCSSFile = (link) => {
    return insertDomToHead('link',function (dom) {
        dom.setAttribute('rel','stylesheet');
        dom.href = link;
    },false);
};
const insertJSandCSS = (cb,files) => {
    let task = [];
    files.forEach(file => {
        if (file.split('?')[0].endsWith('.js')) {
            task.push(insertJSFile.bind(null,file));
        } else if (file.split('?')[0].endsWith('.css')) {
            task.push(insertCSSFile.bind(null,file));
        }
    })
    function doIt() {
        if (task.length) {
            task.shift()().then(doIt);
        } else {
            setTimeout(cb,200);
        }
    }
    setTimeout(function () {
        doIt();
    });
}