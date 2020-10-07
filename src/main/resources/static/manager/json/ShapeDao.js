// 下方的 geoJSON 参数格式如下
// geoJson = {
//     "type" : "Polygon",
//     "coordinates" : [[[1,1],[1,2],[2,2],[2,1],[1,1]]]
// }

// 对应 scala 中的定义在 src\main\scala\db\datamodel\Shape.scala
class ShapeDescription extends Description {}

const ShapeDao = new (class extends Dao {
    constructor() {
        super("api/shape");
    }
    descriptionToString(description) {
        if (description instanceof ShapeDescription) {
            description = description.string;
        } else if (typeof description === "object") {
            description = ShapeDescription.fromObject(description).string;
        }
        return description;
    }
    list(page, pageSize) {
        return super.list(page, pageSize).then(_ => {
            _.features.forEach((__,ind) => {
                _.features[ind].description = ShapeDescription.fromString(__.properties.description);
            });
            return _;
        });
    }

    delete(shapeId) {
        return super.delete(shapeId,false);
    }
    update(shapeId,geoJSON,name,description,modifiedAt,createdAt) {
        description = this.descriptionToString(description);
        if (typeof geoJSON === "string") {
            geoJSON = JSON.parse(geoJSON);
        }
        let updateShape = {
            "id" : shapeId,
            "geometry" : geoJSON,
            "properties" : {
                "name" : name || "",
                "description" : description || "",
                "modifiedAt" : modifiedAt || DateToTimestamp(),
                "createdAt" : createdAt || DateToTimestamp(),
            },
            "type" : "Feature"
        }
        return super.update(updateShape);
    }

    insert(geoJSON,name,description) {
        if (typeof geoJSON === "string") {
            geoJSON = JSON.parse(geoJSON);
        }
        let data = {
            "features" : [
                {
                    "geometry" : geoJSON,
                    /*{
                        "type" : "Polygon",
                        "coordinates" : [[[1,1],[1,2],[2,2],[2,1],[1,1]]]
                    },*/
                    "properties" : {
                        "name" : name,
                        "description" : this.descriptionToString(description)
                    }
                }
            ]
        };
        return super.insert(data);
    }
});

let checkIsGeoJSON = geoJSON => {
    if (typeof geoJSON === "string") {
        try {
            return checkIsGeoJSON(JSON.parse(geoJSON));
        } catch (e) {
            return e;
        }
    } else {
        if (`type` in geoJSON && `coordinates` in geoJSON) {
            return false;
        } else {
            return new Error(`需要有 type 和 coordinates 字段的对象或序列化字符串`);
        }
    }
};