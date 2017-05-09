
// WidgetService
(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService() {
        var widgets =
            [
                {_id: "123", widgetType: "HEADING",     pageId: "875" , size:2,         text: "GIZMODO"},
                {_id: "234", widgetType: "HEADING",     pageId: "875" , size:4,         text: "Lorem ipsum"},
                {_id: "345", widgetType: "IMAGE",       pageId: "875" , width:"25%",   url: "http://lorempixel.com/1600/900/people/"},
                {_id: "456", widgetType: "HTML",        pageId: "875" ,                 text: "<p> Lorem ipsum</p>"},
                {_id: "567", widgetType: "HEADING",     pageId: "983" , size:4,         text: "GIZMODO"},
                {_id: "678", widgetType: "YOUTUBE",     pageId: "983" , width:"25%",   url: "https://youtu.be/nO6Sy6rx49k"},
                {_id: "789", widgetType: "HTML",        pageId: "983" ,                 text: "<p> Lorem ipsum</p>"}
            ];
        var api =
            {
                "createWidget": createWidget,
                "findWidgetsByPageId": findWidgetsByPageId,
                "findWidgetById": findWidgetById,
                "updateWidget": updateWidget,
                "deleteWidget": deleteWidget
            };
        return api;

        function createWidget(pageId,widget)
        {
            widget.pageId = pageId;
            widgets.push(widget);
        }

        function findWidgetsByPageId(pageId)
        {
            var widgetsFound = [];
            for(var i in widgets)
            {
                if(widgets[i].pageId == pageId)
                    widgetsFound.push(widgets[i]);
            }
            return widgetsFound;
        }

        function findWidgetById(widgetId)
        {
            for(var i in widgets)
            {
                if(widgets[i]._id == widgetId)
                    return widgets[i];
            }
            return null;
        }

        function updateWidget(widgetId,widget)
        {
            for(var i in widgets)
            {
                if(widgets[i]._id == widgetId)
                    widgets[i] = widget;
            }
            return widgets;
        }

        function deleteWidget(widgetId)
        {
            for(var i in widgets)
            {
                if(widgets[i]._id == widgetId)
                    widgets.splice(i,1);
            }
            return widgets;
        }
    }
})();
