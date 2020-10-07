const layerPrompt = function (title,defaultVal,cb) {
    cb = cb || (_ => _);
    let lid = window.layer.open({
        id:1,
        type: 1,
        title: title,
        skin:'layui-layer-rim',
        area:['450px', 'auto'],
        content: `<div style="padding: 5px;"><input type="text" value="${defaultVal || ''}" class="layui-input"></div>`,
        btn:['确定'],
        btn1(layId) {
            let val = $(`.layui-layer[times=${layId}]`).find('input').val();
            cb(val);
            layer.close(layId);
        }
    });
}