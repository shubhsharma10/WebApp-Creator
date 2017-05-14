/**
 * Created by shubh on 11-05-2017.
 */

module.exports = function (app) {

    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findWidgetsByPageId);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);

    var widgets =
        [
            {_id: "123", widgetType: "HEADER",     pageId: "875" , size:2,         text: "GIZMODO"},
            {_id: "234", widgetType: "HEADER",     pageId: "875" , size:4,         text: "Lorem ipsum"},
            {_id: "345", widgetType: "IMAGE",       pageId: "875" , width:"25%",   url: "http://lorempixel.com/1600/900/people/"},
            {_id: "456", widgetType: "HTML",        pageId: "875" ,                 text: "<p> Lorem ipsum</p>"},
            {_id: "567", widgetType: "HEADER",     pageId: "983" , size:4,         text: "GIZMODO"},
            {_id: "678", widgetType: "YOUTUBE",     pageId: "983" , width:"25%",   url: "https://youtu.be/nO6Sy6rx49k"},
            {_id: "789", widgetType: "HTML",        pageId: "983" ,                 text: "<p> Lorem ipsum</p>"}
        ];

    function createWidget(req,res)
    {
       var pageId = req.params.pageId;
       var newWidget = req.body;
       newWidget._id = ((new Date()).getTime()).toString();
       newWidget.pageId = pageId;
       widgets.push(newWidget);
       res.sendStatus(200);
       return;
    }

    function findWidgetsByPageId(req,res)
    {
        var pageId = req.params.pageId;

        var widgetsForPageId = widgets.filter(function (u) {
            u.pageId == pageId;
        })

        if(widgetsForPageId)
            res.json(widgetsForPageId);
        else
            res.sendStatus(404);
    }

    function findWidgetById(req,res)
    {
        var widgetId = req.params.widgetId;

        var foundWidget = widgets.find(function (u) {
            u._id == widgetId;
        })
        if(foundWidget)
            res.json(foundWidget);
        else
            res.sendStatus(404);
    }

    function updateWidget(req, res)
    {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for (var i in widgets)
        {
            if (widgets[i]._id === widgetId)
            {
                switch (widgets[i].widgetType)
                {
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

    function deleteWidget(req,res)
    {
        var widgetId = req.params.widgetId;

        for(var i in widgets)
        {
            if(widgets[i]._id == widgetId)
            {
                widgets.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
        return;
    }
}