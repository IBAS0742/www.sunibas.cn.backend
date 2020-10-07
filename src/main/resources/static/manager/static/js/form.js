// 这个脚本需要一个全局的 jQuery 对象，命名为 $
class FormItem {
    /**
     * @param label     标签
     * @param formName  提交表单的字段名
     */
    // 子类需要有一个 id 字段
    constructor(label,formName,placeholder) {
        this.label = label;
        this.formName = formName;
    }
    getDom(eleDom) {
        return `<div lay-filter="${this.id}" class="layui-form-item" style="border: 1px solid rgba(0,0,0,0);">
    <label class="layui-form-label">${this.label}</label> ${eleDom}
</div>`;
    }
}
class Input extends FormItem {
    constructor(label,formName,placeholder = "请输入",disabled,password) {
        super(label,formName,placeholder);
        this.id = null;
        disabled = disabled ? "disabled" : "";
        this.eleDom = `    <div class="layui-input-block">
        <input autocomplete="off" type="${password ? 'password' : 'text'}" name="${formName}" placeholder="${placeholder}" class="layui-input" ${disabled}>
    </div>`
    }

    getDom() {
        return super.getDom(this.eleDom);
    }
    check() {

    }
    get value() {
        return $(`[lay-filter="${this.id}"]`).find(`[name="${this.formName}"]`).val();
    }
    get valueMap() {
        return {
            [this.formName] :this.value
        };
    }
    setValue(val) {
        $(`[lay-filter="${this.id}"]`).find(`[name="${this.formName}"]`).val(val);
        return this;
    }
}
class Select extends FormItem {
    constructor(label,formName,placeholder = "请输入") {
        super(label,formName,placeholder);
        this.id = null;
        this.options = [];
        this.optionsDom = [];
        this.defaultSelectIndex = -1;
        this.eleDom = `    <div class="layui-input-block">
        <select name="${name}">
            <option value=""></option>
            $options$
        </select>
    </div>`
    }
    addOptions(value,label,selected) {
        this.options.push([value,label || value]);
        if (selected) {
            this.setSelected(this.options.length - 1);
        } else {
            this.optionsDom.push(`<option value="${value}">${label || value}</option>`);
        }
        return this;
    }
    setSelected(index) {
        if (this.defaultSelectIndex !== -1) {
            this.optionsDom[this.defaultSelectIndex] = `<option value="${this.options[this.defaultSelectIndex][0]}"}>${this.options[this.defaultSelectIndex][1]}</option>`;
        }
        this.defaultSelectIndex = index;this.optionsDom[this.defaultSelectIndex] = `<option selected value="${this.options[this.defaultSelectIndex][0]}" selected>${this.options[this.defaultSelectIndex][1]}</option>`;
        return this;
    }

    getDom() {
        return super.getDom(this.eleDom.replace("$options$",this.optionsDom.join('\r\n')));
    }
    get value() {
        return $(`[lay-filter="${this.id}"]`).find('input').val();
    }
    get valueMap() {
        return {
            [this.formName] : this.value
        };
    }
    // value 是提交服务器的值，对应 addOptions 的 value 参数
    setValue(value) {
        let label = null;
        for (let i = 0;i < this.options.length;i++) {
            if (this.options[i][0] === value) {
                label = this.options[i][1];
                break;
            }
        }
        if (!label) {
            throw new Error(`[Select.setValue]:找不到 ${value} 对应字段`)
        }
        let formItem = $(`[lay-filter="${this.id}"]`);
        formItem.find('input').val(label);
        formItem.find('select').val(value);
        formItem.find('dd[lay-value]').each((ind,dom) => {
            let value_ = dom.getAttribute('lay-value');
            if (value_ === value) {
                if (!dom.classList.contains('layui-this')) {
                    dom.classList.add('layui-this');
                }
            } else {
                dom.classList.remove('layui-this');
            }
        });
        return this;
    }
}
class CheckBox extends FormItem {
    constructor(label,formName,placeholder = "请输入") {
        super(label,formName,placeholder);
        this.id = null;
        this.options = [];
        this.optionsDom = [];
        this.eleDom = `    <div class="layui-input-block">
        $options$
    </div>`
    }
    addOptions(value,label,checked) {
        this.options.push([value,label || value]);
        this.optionsDom.push(`<input type="checkbox" name="${this.formName}" value="${value}" title="${label}" ${checked ? "checked" : ""}>`);
        return this;
    }
    setChecked(ind) {
        this.optionsDom[ind] = `<input type="checkbox" value="${this.options[i][0]}" name="${this.formName}" title="${this.options[i][1]}" checked>`;
    }
    getDom() {
        return super.getDom(this.eleDom.replace("$options$",this.optionsDom.join("\r\n")));
    }
    get value() {
        let formItem = $(`[lay-filter="${this.id}"]`);
        let vals = [];
        formItem.find('input[type="checkbox"]').each((_,inp) => {
            if (inp.checked) {
                vals.push(inp.value);
            }
        });
        return vals;
    }
    get valueMap() {
        return {
            [this.formName]: this.value
        };
    }
    // value 是提交服务器的值，对应 addOptions 的 value 参数
    setValue(value,checked) {
        let exist = false;
        let checkedClassName = 'layui-form-checked';
        for (let i = 0;i < this.options.length;i++) {
            if (this.options[i][0] === value) {
                exist = true;
                break;
            }
        }
        if (!exist) {
            throw new Error(`[Select.setValue]:找不到 ${value} 对应字段`)
        }
        let formItem = $(`[lay-filter="${this.id}"]`);
        formItem.find('input[type="checkbox"]').each((_,inp) => {
            if (inp.value === value && inp.checked !== checked) {
                inp.checked = checked;
                let div = inp.nextElementSibling;
                let hasChecked = div.classList.contains(checkedClassName);
                if (checked) {
                    //
                    if (!hasChecked) {
                        div.classList.add(checkedClassName);
                    }
                } else {
                    if (hasChecked) {
                        div.classList.remove(checkedClassName);
                    }
                }
            }
        });
        return this;
    }
}
class Switch extends FormItem {
    constructor(label,formName,placeholder = "请输入") {
        super(label,formName,placeholder);
        this.id = null;
        this.eleDom = `    <div class="layui-input-block">
      <input type="checkbox" name="${formName}" lay-skin="switch" openOrClose>
    </div>`
        this.open = false;
    }
    switch(open) {
        this.open = !!open;
    }
    getDom() {
        return super.getDom(this.eleDom.replace('openOrClose',this.open ? "checked" : ""));
    }
    get value() {
        return $(`[lay-filter="${this.id}"]`).find('input')[0].checked;
    }
    get valueMap() {
        return {
            [this.formName] : this.value
        };
    }
    // true or false 表示是否选中
    setValue(open) {
        let switchClassName = 'layui-form-onswitch';
        open = !!open;
        let formItem = $(`[lay-filter="${this.id}"]`);
        formItem.find('input')[0].checked = open;
        let sw = formItem.find('.layui-form-switch')[0];
        if (sw.classList.contains(switchClassName) !== open) {
            if (open) {
                sw.classList.add(switchClassName);
            } else {
                sw.classList.remove(switchClassName);
            }
        }
        if (open) {}
        return this;
    }
}
class Radio extends FormItem {
    constructor(label,formName,placeholder = "请输入") {
        super(label,formName,placeholder);
        this.id = null;
        this.options = [];
        this.optionsDom = [];
        this.defaultSelectIndex = -1;
        this.eleDom = `    <div class="layui-input-block">
        $options$
    </div>`
    }
    addOptions(value,label,selected) {
        this.options.push([value,label || value]);
        if (selected) {
            this.setSelected(this.options.length - 1);
        } else {
            this.optionsDom.push(`<input type="radio" name="${this.formName}" value="${value}" title="${label || value}">`);
        }
        return this;
    }
    setSelected(index) {
        if (this.defaultSelectIndex !== -1) {
            this.optionsDom[this.defaultSelectIndex] = `<option value="${this.options[this.defaultSelectIndex][0]}">${this.options[this.defaultSelectIndex][1]}</option>`;
        }
        this.defaultSelectIndex = index;this.optionsDom[this.defaultSelectIndex] = `<option selected value="${this.options[this.defaultSelectIndex][0]}" checked>${this.options[this.defaultSelectIndex][1]}</option>`;
        return this;
    }

    getDom() {
        return super.getDom(this.eleDom.replace("$options$",this.optionsDom.join('\r\n')));
    }
    get value() {
        let formItem = $(`[lay-filter="${this.id}"]`);
        let vals = [];
        formItem.find('input[type="radio"]').each((_,inp) => {
            if (inp.checked) {
                vals.push(inp.value);
            }
        });
        return vals;
    }
    get valueMap() {
        return {
            [this.formName]: this.value
        };
    }
    // value 是提交服务器的值，对应 addOptions 的 value 参数
    setValue(value,checked) {
        let exist = false;
        let checkedClassName = 'layui-form-radioed';
        let iconChart = ['','']
        for (let i = 0;i < this.options.length;i++) {
            if (this.options[i][0] === value) {
                exist = true;
                break;
            }
        }
        if (!exist) {
            throw new Error(`[Select.setValue]:找不到 ${value} 对应字段`)
        }
        let formItem = $(`[lay-filter="${this.id}"]`);
        formItem.find('input[type="radio"]').each((_,inp) => {
            if (inp.value === value) {
                if (inp.checked !== checked) {
                    inp.checked = checked;
                    let div = inp.nextElementSibling;
                    let hasChecked = div.classList.contains(checkedClassName);
                    if (checked) {
                        //
                        if (!hasChecked) {
                            div.classList.add(checkedClassName);
                            div.getElementsByTagName('i')[0].innerHTML = iconChart[1];
                        }
                    } else {
                        if (hasChecked) {
                            div.classList.remove(checkedClassName);
                            div.getElementsByTagName('i')[0].innerHTML = iconChart[0];
                        }
                    }
                }
            } else {
                inp.checked = false;
                let div = inp.nextElementSibling;
                let hasChecked = div.classList.contains(checkedClassName);
                if (hasChecked) {
                    div.classList.remove(checkedClassName);
                    div.getElementsByTagName('i')[0].innerHTML = iconChart[0];
                }
            }
        });
        return this;
    }
}
class TextArea extends Input {
    constructor(label,formName,placeholder = "请输入") {
        super(label,formName,placeholder);
        this.eleDom = `    <div class="layui-input-block">
        <textarea name="${formName}" placeholder="${placeholder}" class="layui-textarea"></textarea>
    </div>`
    }
}
class MapInput extends FormItem {
    constructor(label,formName,placeholder = "请输入") {
        super(label,formName,placeholder);
        this.id = null;
        this.type = "map";
        this.eleDom = `    <div class="layui-input-block">
        <div mapid="$mapid$">
            $mapDom$
        </div>
        <div><button tar="add" type="button" class="layui-btn layui-btn-fluid">添加</button></div>
    </div>`
        this.mapDom = ``;
        this.renderOver = false;
    }
    getDom() {
        return super.getDom(this.eleDom.replace('$mapid$',this.id).replace('$mapDom$',this.mapDom));
    }
    addKeyValue(key,value,cannotDelete) {
        let canDelete = !cannotDelete ? 'canDelete="yes"' : '';
        let kvDom = `<div tar="kv" style="padding-bottom: 5px;">
                <input actor="key" type="text" class="layui-input" style="width: calc(29% - 50px);float:left;margin-right:1%;" value="${key}">
                <input actor="value" type="text" class="layui-input" style="width: calc(69% - 50px);float:left;margin-right: 1%;" value="${value}">
                <button type="button" class="layui-btn ${canDelete ? 'layui-btn-danger' : 'layui-btn-disabled'}" style="width: 100px;" ${canDelete}>删除</button>
            </div>`;
        this.mapDom += kvDom;
        if (this.renderOver) {
            let mapDiv = $(`div[mapid="${this.id}"]`);
            mapDiv[0].innerHTML += kvDom;
            this.renderDeleteBtn();
        }
        return this;
    }
    renderDeleteBtn() {
        let mapDiv = $(`div[mapid="${this.id}"]`);
        mapDiv.find(`[tar="kv"]`)
            .each((_,kv) => {
                let btn = $(kv).find('button');
                if (btn.attr('canDelete') === "yes") {
                    btn.on('click',(function () {
                        kv.remove();
                    }).bind(null,kv));
                }
            });
    }
    render() {
        let $this = this;
        this.renderOver = true;
        let mapDiv = $(`div[mapid="${this.id}"]`);
        this.renderDeleteBtn();
        $(`[lay-filter="${this.id}"]`).find(`[tar="add"]`).on('click',function () {
            $this.addKeyValue("","");
        });
    }

    get value() {
        let dic = {};
        $(`div[mapid="${this.id}"]`).find('[tar="kv"]').each((_,div) => {
            let inps = div.getElementsByTagName('input');
            if (inps.length === 2) {
                let keyInd = 0;
                if (inps[0].getAttribute("actor") === "value") keyInd = 1;
                let key = inps[keyInd].value;
                if (key) {
                    dic[key] = inps[1 - keyInd].value;
                }
            }
        });
        return dic;
    }
    get valueMap() {
        return {
            [this.formName]: this.value
        }
    }

    // dic = {key: {value: "",cannotDelete: false}}
    setValue(dic) {
        let mapDiv = $(`div[mapid="${this.id}"]`);
        mapDiv[0].innerHTML = "";
        this.mapDom = ``;
        for (let i in dic) {
            this.addKeyValue(i,dic[i].value,dic[i].cannotDelete);
        }
    }
}

// [{}]
class MapArrayInput extends FormItem {
    constructor(label,formName,placeholder = "请输入") {
        super(label,formName,placeholder = "请输入");
        this.id = null;
        this.layuiLayer = null;
        this.type = "mapArray";
        this.eleDom = `<div class="layui-input-block">
                <button tar="edit" type="button" class="layui-btn layui-btn-primary">编辑</button>
            </div>`;
        this.fields = [/*{label:'',vaule: ''}*/];
        this.datas = [/*{a:1,b:2}*/];
        this.editTable = new EditableTable();
        this.layerId = null;
        this.lastIndex = 0;
    }

    addField(key,label) {
        this.fields.push({key,label: label || key});
        this.editTable.addColumn(key,label);
        return this;
    }

    bindEvent() {
        let table = $(`.layui-layer[times=${this.layerId}]`).find('.layui-layer-content').find("div[tar='table']");
        let $this = this;
        table.find(`button[${this.editTable.editIconSelector}]`).on('click',function (e) {
            console.log(e);
            let target = e.target;
            if (target.tagName === "I") {
                target = target.parentElement;
            }
            let key = target.getAttribute('columnKey');
            let index = target.getAttribute('dataIndex');
            let span = table.find(`tr[dataIndex=${index}]>td[columnkey="${key}"]>span`);
            let lid = layer.open({
                id:1,
                type: 1,
                title:'请输入',
                skin:'layui-layer-rim',
                area:['450px', 'auto'],
                content: `<div style="padding: 5px;"><input type="text" class="layui-input"></div>`,
                btn:['确定'],
                btn1(layId) {
                    let val = $(`.layui-layer[times=${layId}]`).find('input').val();
                    span.text(val);
                    for (let i = 0;i < $this.datas.length;i++) {
                        if ($this.datas[i]._id_ === +index) {
                            $this.datas[i][key] = val;
                        }
                    }
                    layer.close(layId);
                }
            });
            setTimeout(() => {
                let inp = $(`.layui-layer[times=${lid}]`).find('input').focus().val(span.text());
                inp.focus();
            },200);
        });
        table.find(`button[${this.editTable.deleteIconSelector}]`).on('click',function (e) {
            console.log(e);
            let target = e.target;
            if (target.tagName === "I") {
                target = target.parentElement;
            }
            let index = target.getAttribute("dataIndex");
            table.find(`tr[dataIndex=${index}]`).remove();
            for (let i = 0;i < $this.datas.length;i++) {
                if ($this.datas[i]._id_ === +index) {
                    $this.datas[i]._delete_ = true;
                }
            }
        });
    }

    showTable() {
        if (this.layuiLayer) {
            let layerDom = $(`.layui-layer[times=${this.layerId}]`);
            if (layerDom.length) {
                let contentDom = layerDom.find('.layui-layer-content');
                let table = contentDom.find("div[tar='table']");
                table.html(this.editTable.getTable(this.datas.filter(_ => !_._delete_)));
                table[0].innerHTML = table[0].innerHTML.replace(/[,]{2,}/g,'');
                this.bindEvent();
            } else {
                let $this = this;
                this.layerId = this.layuiLayer.open({
                    closeBtn: 1,
                    btn: [],
                    area: ['100%','100%'],
                    title: this.label,
                    content: `<button tar="add" type="button" class="layui-btn layui-btn-normal">添加</button><div tar="table">${this.editTable.getTable(this.datas.filter(_ => !_._delete_))}</div>`
                });
                let contentDom = $(`.layui-layer[times=${this.layerId}]`).find('.layui-layer-content');
                let table = contentDom.find("div[tar='table']");
                // table[0].innerHTML = table[0].innerHTML.replace(/[,]{2,}/g,'');
                contentDom.find("button[tar='add']").on('click',function () {
                    let obj = {};
                    $this.fields.forEach(_ => obj[_.key] = "");
                    obj._delete_ = false;
                    obj._id_ = $this.lastIndex;
                    $this.lastIndex++;
                    $this.datas.push(obj);
                    $this.showTable();
                });
                $this.showTable();
            }
        } else {
            throw new Error("找不到 layer");
        }
    }

    render() {
        let $this = this;
        $(`[lay-filter="${this.id}"]`).find(`button[tar="edit"]`).on('click',function() {
            $this.showTable();
        });
    }
    getDom() {
        return super.getDom(this.eleDom);
    }

    get value() {
        return this.datas.filter(_ => !_.delete_);
    }
    get valueMap() {
        return {
            [this.formName]: this.value
        }
    }

    setValue(datas) {
        datas.forEach(d => {
            let obj = {};
            this.fields.forEach(_ => obj[_.key] = d[_.key]);
            obj._delete_ = false;
            obj._id_ = this.lastIndex;
            this.lastIndex++;
            this.datas.push(obj);
        });
    }
}

// 这个表单项不符合其他表单项的规范
class UploadInput extends FormItem {
    constructor(label,formName,onChange) {
        super(label,formName,"");
        this.onChange = onChange;
        this.type = "upload";
        this.eleDom = `    <div class="layui-input-block">
        <input style="line-height: 38px;" type="file" name="${formName}" class="layui-input">
    </div>`
    }
    getDom() {
        return super.getDom(this.eleDom);
    }
    getFile() {
        let inp = $(`[lay-filter="${this.id}"]`).find(`[name="${this.formName}"]`)[0];
        return inp.files;
    }

    render() {
        let inp = $(`[lay-filter="${this.id}"]`).find(`[name="${this.formName}"]`)[0];
        inp.onchange = this.onChange;
    }
}
/**
 * 上面对象中 value valueMap setValue 需要在 render 结束后才能调用，不然有些对象会有问题
 * */
class Form {
    static checkDatasMethods = {
        required() {
            return v => (!v ? new Error("不能为空") : null)
        },
        requiredLength(len) {
            return (function (len,v) {
                if (v instanceof Array) {
                    return v.length < len ? new Error(`至少要选中 ${len} 个`) : null;
                } else {
                    return v.toString().length < len ? new Error(`长度不能小于 ${len}`) : null;
                }
            }).bind(null,len);
        }
    };
    static ToString(obj) {
        if (typeof obj === "string") {
            return obj;
        } else {
            return JSON.stringify(obj);
        }
    }
    constructor(parentId,layuiForm,layuiLayer,submitMethod,btnText) {
        this.formItem = [];
        this.toString = [];
        this.checkDatas = {};
        // 用于渲染表单
        this.layuiForm = layuiForm;
        // 用于渲染 弹窗
        this.layuiLayer = layuiLayer;
        this.submitMethod = submitMethod;
        this.parent = document.getElementById(parentId);
        this.filterId = "_form_" + (new Date()).getTime();
        this.dom = `<div form-id="${this.filterId}"><form class="layui-form" lay-filter="${this.filterId}">$dom$$otherDom$</form>$btnDom$</div>`;
        this.btnText = btnText || "立即提交";
    }

    // checkDatas 返回内容为 Error，如果是 false 表示没有错误，默认不检查
    // checkDatas 的参数是对应字段的 值
    // checkDatas 可以是一个数组，例如
    // [
    //     _ => {
    //         if (!_) {
    //             return new Error('不能为空')
    //         }
    //     },
    //     _ => {
    //         if (_.length < 10) {
    //             return new Error('长度不能小于 5');
    //         }
    //     }
    // ]
    addFormItem(item,checkDatas,toString) {
        if (item.type === "mapArray") {
            item.layuiLayer = this.layuiLayer;
        }
        this.toString.push(toString || Form.ToString);
        this.formItem.push(item);
        if (checkDatas) {
            if (checkDatas instanceof Array) {} else {
                checkDatas = [checkDatas];
            }
        } else {
            checkDatas = [(_ => false)]
        }
        this.checkDatas[item.formName] = checkDatas;
        item.id = `filter_id_${this.formItem.length}_${parseInt(Math.random() * 100)}`
        return this;
    }

    // index 可以是 item 的顺序例如 0，1
    // 也可以是 formName，例如 id、name
    getFormItem(index) {
        if (typeof index === 'number') {
            return this.formItem[index];
        } else {
            index = index.toString();
            let i = 0;
            for (;i < this.formItem.length;i++) {
                if (this.formItem[i].formName === index) {
                    return this.formItem[i];
                }
            }
        }
    }

    setValue(formName,value) {
        for (let i = 0;i < this.formItem.length;i++) {
            if (this.formItem[i].formName === formName) {
                this.formItem[i].setValue(value);
                break;
            }
        }
        return this;
    }

    get value() {
        let errMessage = [];
        let values = {};
        this.formItem.forEach((item,ind) => {
            let val = item.value;
            values = {
                ...values,
                ...{
                    [item.formName]: val
                },
            };
            let em = "";
            this.checkDatas[item.formName].forEach(cd => {
                let err = cd(val);
                if (err) {
                    em += "\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + err.message;
                }
            });
            if (em.length) {
                errMessage.push(`字段[${item.label}(${item.formName})]：${em}`);
                $(`[lay-filter="${item.id}"]`).css({
                    border: "1px solid red"
                });
            } else {
                $(`[lay-filter="${item.id}"]`).css({
                    border: "1px solid rgba(0,0,0,0)"
                });
            }
        });
        if (errMessage.length)
            this.layuiLayer.open({
                content: `<div>${errMessage.join('<br/>').replace(/\n/g,'<br/>')}</div>`
            });
        return {
            err: (errMessage.length ? new Error(errMessage.join('\r\n')) : null),
            values
        }
    }

    render(otherDom) {
        let dom = "";
        let renders = [];
        this.formItem.forEach(item => {
            dom += item.getDom() + "\r\n";
            if (item.type === "map") {
                renders.push(item.render.bind(item));
            }
            if (item.type === "mapArray") {
                renders.push(item.render.bind(item));
            }
            if (item.type === "upload") {
                renders.push(item.render.bind(item));
            }
        });
        this.parent.innerHTML = this.dom.replace("$dom$",dom).replace('$btnDom$',`<div class="layui-form-item">
    <div class="layui-input-block">
      <button style="width: 100%" class="layui-btn layui-btn-normal" tar="_submit_">${this.btnText}</button>
    </div>
  </div>`)
            .replace('$otherDom$',otherDom || '');
        this.layuiForm.render('select');
        this.layuiForm.render('radio');
        this.layuiForm.render('checkbox');
        renders.forEach(_ => _());
        setTimeout(() => {
            $(`[form-id="${this.filterId}"]`).find(`button[tar="_submit_"]`).on('click',(function () {
                let val = this.value;
                if (val.err) {} else {
                    this.submitMethod(val.values);
                }
            }).bind(this));
        },1000);
        return this;
    }
}
