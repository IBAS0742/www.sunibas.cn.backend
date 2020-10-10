window.scalaServer = "http://localhost:8080/";
if (location.host.indexOf('sunibas.cn') + 1) {
    window.scalaServer = location.protocol + "//" + location.host + "/";
}
if (window.parent !== window) {
    window.loading = window.parent.loading;
}
