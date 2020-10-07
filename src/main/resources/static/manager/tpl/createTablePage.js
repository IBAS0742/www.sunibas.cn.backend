const fs = require('fs');
const path = require('path');

const pagePath = "pages"
const tplPath = "tpl";

const locate = (() => {
    const currentPage = process.cwd();
    const projectPath = ['GISDB','views','Show'].join(path.sep);
    return currentPage.substring(0,currentPage.indexOf(projectPath) + projectPath.length);
})();

const createTablePage = (htmlName,pageTitle,daoName) => {
    if (!fs.existsSync(path.join(locate,pagePath,htmlName))) {
        let tablePage = fs.readFileSync(path.join(locate,tplPath,'tablePage.html'),'utf-8');
        tablePage = tablePage.replace(/##page_title##/g,pageTitle).replace(/##dao_name##/g,daoName);
        fs.writeFileSync(path.join(locate,pagePath,htmlName),tablePage,'utf-8');
        console.log("需要修改的地方都已经加上 TODO : 标记");
    } else {
        console.log(`页面 ${path.join(locate,pagePath,htmlName)} 已存在`);
        console.log(`请手动删除后再生成，这一步操作是防止错误覆盖`);
    }
}

createTablePage("dataSource.html","数据集管理","DataSource")