/**
 * Created by shubh on 01-05-2017.
 */

// WidgetService
(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService() {
        var widgets =
            [
                {_id: "123", widgetType: "HEADING",     pageId: "321" , size:2,         text: "GIZMODO"},
                {_id: "234", widgetType: "HEADING",     pageId: "321" , size:4,         text: "Lorem ipsum"},
                {_id: "345", widgetType: "IMAGE",       pageId: "321" , width:"100%",   url: ""},
                {_id: "456", widgetType: "HTML",        pageId: "321" ,                 text: "<p> Lorem ipsum</p>"},
                {_id: "567", widgetType: "HEADING",     pageId: "321" , size:4,         text: "GIZMODO"},
                {_id: "678", widgetType: "YOUTUBE",     pageId: "321" , width:"100%",   url: ""},
                {_id: "789", widgetType: "HTML",        pageId: "321" ,                 text: "<p> Lorem ipsum</p>"}
            ];
        var api =
            {
                "createWidget": createWidget,
                "findWidgetByPageId": findWidgetByPageId,
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

        function findWidgetByPageId(pageId)
        {
            for(var i in widgets)
            {
                if(widgets[i].pageId == pageId)
                    return widgets[i];
            }
            return null;
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
