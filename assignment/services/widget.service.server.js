
module.exports = function (app) {

    var multer = require('multer');
    var fs = require('fs');
    var uploadsFolderPath = __dirname + '/../../public/uploads';
    var upload = multer({dest: uploadsFolderPath});

    app.post("/api/page/:pageId/widget", createWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/page/:pageId/widget", updateWidgetPosition);
    app.delete("/api/widget/:widgetId", deleteWidget);

    var widgets =
        [
            {
                _id: "234",
                name: "Header Widget",
                pageId: "321",
                size: 4,
                text: "The Great Wave off Kanagawa",
                widgetType: "HEADER"
            },
            {
                _id: "234",
                name: "Header Widget",
                pageId: "323",
                size: 4,
                text: "The Great Wave off Kanagawa",
                widgetType: "HEADER"
            },
            {
                _id: "456",
                name: "HTML Widget",
                pageId: "321",
                text: "<p>The Great Wave off Kanagawa (神奈川沖浪裏 Kanagawa-oki nami ura?, 'Under a wave off Kanagawa'), also known as The Great Wave or simply The Wave, is a woodblock print by the Japanese ukiyo-e artist Hokusai. It was published sometime between 1830 and 1833[1] in the late Edo period as the first print in Hokusai's series Thirty-six Views of Mount Fuji. It is Hokusai's most famous work, and one of the most recognizable works of Japanese art in the world. The image depicts an enormous wave threatening boats off the coast of the prefecture of Kanagawa. While sometimes assumed to be a tsunami, the wave is more likely to be a large rogue wave.[2] As in all the prints in the series, it depicts the area around Mount Fuji under particular conditions, and the mountain itself appears in the background.</p>",
                widgetType: "HTML"
            },
            {
                _id: "456",
                name: "HTML Widget",
                pageId: "323",
                text: "<p>The Great Wave off Kanagawa (神奈川沖浪裏 Kanagawa-oki nami ura?, 'Under a wave off Kanagawa'), also known as The Great Wave or simply The Wave, is a woodblock print by the Japanese ukiyo-e artist Hokusai. It was published sometime between 1830 and 1833[1] in the late Edo period as the first print in Hokusai's series Thirty-six Views of Mount Fuji. It is Hokusai's most famous work, and one of the most recognizable works of Japanese art in the world. The image depicts an enormous wave threatening boats off the coast of the prefecture of Kanagawa. While sometimes assumed to be a tsunami, the wave is more likely to be a large rogue wave.[2] As in all the prints in the series, it depicts the area around Mount Fuji under particular conditions, and the mountain itself appears in the background.</p>",
                widgetType: "HTML"
            },
            {
                "_id": "345", "name": "Image Widget", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "", "text": ""
            },
            {
                _id: "123",
                name: "Header Widget",
                pageId: "321",
                size: 2,
                text: "The Eye of Hokusai",
                widgetType: "HEADER"
            },
            {
                _id: "678",
                name: "YouTube Widget",
                pageId: "321",
                text: "",
                url: "https://youtu.be/5GW3GJIV8uI",
                widgetType: "YOUTUBE",
                width: "100%"
            },
            {
                _id: "678",
                name: "YouTube Widget",
                pageId: "323",
                text: "",
                url: "https://youtu.be/5GW3GJIV8uI",
                widgetType: "YOUTUBE",
                width: "100%"
            },
            {
                _id: "567",
                name: "Header Widget",
                pageId: "321",
                size: 4,
                text: "Katsushika Hokusai",
                widgetType: "HEADER"
            },
            {
                _id: "789",
                name: "HTML Widget",
                pageId: "321",
                text: "<p>Japanese artist, ukiyo-e painter and printmaker of the Edo period.[1] He was influenced by Sesshū Tōyō and other styles of Chinese painting.[2] Born in Edo (now Tokyo), Hokusai is best known as author of the woodblock print series Thirty-six Views of Mount Fuji (富嶽三十六景 Fugaku Sanjūroku-kei?, c. 1831) which includes the internationally iconic print, The Great Wave off Kanagawa. Hokusai created the ' Thirty-Six Views' both as a response to a domestic travel boom and as part of a personal obsession with Mount Fuji.[3] It was this series, specifically The Great Wave print and Fine Wind, Clear Morning, that secured Hokusai’s fame both in Japan and overseas. As historian Richard Lane concludes, 'Indeed, if there is one work that made Hokusai's name, both in Japan and abroad, it must be this monumental print-series'.[4] While Hokusai's work prior to this series is certainly important, it was not until this series that he gained broad recognition.</p>",
                widgetType: "HTML"
            }
        ];

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var newWidget = req.body;
        newWidget._id = (Date.now()).toString();
        newWidget.pageId = pageId;
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var allWidgetsForPage = widgets.filter(function (w) {
            return w.pageId == pageId;
        });

        if (allWidgetsForPage) {
            res.json(allWidgetsForPage);
        } else {
            res.sendStatus(404).send({message: 'No Widgets found'});
        }
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        var widget = widgets.find(function (w) {
            return w._id == widgetId;
        });
        if (widget) {
            res.json(widget);
        } else {
            res.sendStatus(404).send({message: 'Widget not found'});
        }
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                switch (widgets[i].widgetType) {
                    case "YOUTUBE":
                    case "IMAGE":
                        widgets[i].width = widget.width;
                        widgets[i].url = widget.url;
                        widgets[i].text = widget.text;
                        widgets[i].name = widget.name;
                        break;
                    case "HEADER":
                        widgets[i].size = widget.size;
                        widgets[i].text = widget.text;
                        widgets[i].name = widget.name;
                        break;
                    case "HTML":
                        widgets[i].text = widget.text;
                        widgets[i].name = widget.name;
                        break;
                    default:
                        res.sendStatus(404).send({message: "Reached default case in update widget"});
                        return;
                }
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWidgetPosition(req, res) {
        var pageId = req.params.pageId;
        var initial_index = parseInt(req.query.initial);
        var final_index = parseInt(req.query.final);

        var allWidgetsForPage = widgets.filter(function (w) {
            return w.pageId == pageId;
        });

        widgets = widgets.filter(function (w) {
            return allWidgetsForPage.indexOf(w) < 0;
        });

        var elem_at_initial_pos = allWidgetsForPage[initial_index];
        allWidgetsForPage.splice(initial_index, 1);
        allWidgetsForPage.splice(final_index, 0, elem_at_initial_pos);

        widgets = widgets.concat(allWidgetsForPage);
        res.sendStatus(200);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id == widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var uid = req.body.uid;
        var wid = req.body.wid;
        var myFile = req.file;

        imgWidget = widgets.find(function (i) {
            return i._id == widgetId;
        });

        // Replace existing image.
        if (imgWidget.url) {
            fs.unlink(uploadsFolderPath + "/" + imgWidget["fileName"], function () {
            });
        }

        imgWidget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

        // Store off filename for easy retrieval during unlinking.
        imgWidget["fileName"] = myFile.filename;

        res.redirect(req.get('referrer') + "#/user/" + uid + "/website/" + wid + "/page/" + imgWidget.pageId + "/widget");
    }
};