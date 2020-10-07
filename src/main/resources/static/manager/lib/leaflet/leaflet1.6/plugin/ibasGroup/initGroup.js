/* eslint-disable no-undef */

window.ips = {
    api: {
        geoserver: "http://10.10.1.132:8080"
    }
}
const baseMap = {
    google: {
        type: 'layer',
        url: 'http://mt0.google.cn/vt/lyrs=m@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga'
    },
    '无': {
        type: 'layer',
        url: ''
    },
};

const overlap = {
};

// eslint-disable-next-line no-unused-vars
const buildLayerControl = (function(baseMap, overlap) {
    window.cache_geojson = (typeof window.cache_geojson === 'object') ? window.cache_geojson : {};
    /**
     * todo shp 未完成编写
     * @param layer
     * @return {*}
     */
    const getLayer = (layer,zIndex) => {
        let showGeoJson = function (geojson, weight, color1) {
            return L.geoJSON(geojson, {
                style: function () {
                    return {
                        color: color1,
                        weight: weight
                    };
                }
            });
        };
        if (layer.type === 'layer') {
            return L.tileLayer(layer.url);
        } else if (layer.type === 'wms') {
            return L.tileLayer.wms(layer.url, Object.assign({
                style: ''
            }, zIndex ? { zIndex } : {} ,layer.params));
        } else if (layer.type === 'shp') {
            if (layer.url in window.cache_geojson) {
                return new Promise(s => {
                    s(showGeoJson.bind(null, window.cache_geojson[layer.url]));
                });
            } else {
                return fetch(layer.url)
                    .then(_ => _.text())
                    .then(JSON.parse)
                    .then(__ => {
                        window.cache_geojson[layer.url] = __;
                        return showGeoJson.bind(null, __);
                    });
            }
        }
    };
    return function (map,fromIndex) {
        let baseLayers = {};
        let first = true;
        fromIndex = fromIndex ? fromIndex : 20;
        for (let i in baseMap) {
            baseLayers[i] = getLayer(baseMap[i]);
            if (first) {
                first = false;
                baseLayers[i].addTo(map);
            }
        }

        let overlayLayers = {};
        for (let i in overlap) {
            overlayLayers[i] = {};
            for (let j in overlap[i]) {
                overlayLayers[i][j] = getLayer(overlap[i][j], fromIndex++);
                overlap[i][j].show ? overlayLayers[i][j].addTo(map) : false;
                // overlayLayers[i][j].addTo(map);
            }
        }
        let controls = L.control.orderlayersIBASGroup(
            baseLayers,
            overlayLayers,
            {
                title: '图层管理'
            }
        );
        map.setMinZoom(4);
        controls.addTo(map);
        window.controls = controls;
        return controls;
    }
})(baseMap, overlap);

// eslint-disable-next-line no-unused-vars
const manageMapGroupInstance = function (mapGroup) {
    let toChecked = function(dom,checked) {
        if (dom.checked === checked) {
            return ;
        } else {
            dom.click();
        }
    }
    let forEach = function (tar,yesAction,noAction) {
        noAction = noAction || (() => {});
        let lr = mapGroup._form.getElementsByClassName('leaflet-row');
        for (let i = 0;i < lr.length;i++) {
            let dom = lr[i].getElementsByTagName('input')[0];
            if (dom) {
                if (tar.includes((lr[i].innerText.trim() || '').trim())) {
                    yesAction(dom);
                } else {
                    noAction(dom);
                }
            }
        }
    }
    return {
        open(tar) {
            if (!(tar instanceof Array)) {
                tar = [tar];
            }
            forEach(tar,function (dom) {
                toChecked(dom,true);
            },function (dom) {
                toChecked(dom,false);
            })
        },
        switch(tar) {
            if (!(tar instanceof Array)) {
                tar = [tar];
            }
            forEach(tar,function (dom) {
                toChecked(dom,!dom.checked);
            })
        }
    }
}
