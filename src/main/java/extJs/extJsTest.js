var dyTable = function() {
    var table = $("<table><thead><tr><td>参数名</td><td>内容</td></tr></thead><tbody></tbody></table>");
    var tbody = table.find("tbody");
    tbody.append(dyTr(tbody));
    return table;
};

var dyTr = function(tbody) {
    var tr = $("<tr><td><input/></td><td><input/></td></tr>");
    tr.one("click",function(){
        tbody.append(dyTr(tbody));
    });
    var input = tr.find("input");
    input[0].onchange = function() {
        input[1].setAttribute("name",this.value);
    };
    return tr;
};


//var tds = [];
$('td.code').filter(function(i,j){
    return (j.innerText == "cond");
}).each(function(i,j){
    //tds.push(j.parentElement);
    $(j.parentElement).find("input").parent().html(dyTable());
});
