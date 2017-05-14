
// WidgetService
(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService($http) {

        var api =
            {
                "createWidget": createWidget,
                "findWidgetsByPageId": findWidgetsByPageId,
                "findWidgetById": findWidgetById,
                "updateWidget": updateWidget,
                "deleteWidget": deleteWidget,
                "getWidgetTypes": getWidgetTypes,
                "createTypedWidget": createTypedWidget
            };
        return api;

        var widgetTypes = ["HEADER", "IMAGE", "YOUTUBE"];

        
        function getWidgetTypes() {
            return ["HEADER", "IMAGE", "YOUTUBE"];
        }

        function createWidget(pageId,widget)
        {
            return $http.post("/api/page/"+pageId+"/widget",widget);
        }
        
        function createTypedWidget(pageId,widgetType)
        {

            var newWidgetData = {};
            switch (widgetType)
            {
                case "YOUTUBE":
                    newWidgetData = { _id: "", name: "YouTube Widget", widgetType: "YOUTUBE", pageId: "", width: "100%", url: "URL", text: "Text"};
                    break;
                case "IMAGE":
                    newWidgetData = { _id: "", name: "Image Widget", widgetType: "IMAGE", pageId: "", width: "100%", url: "URL", text:"Text"};
                    break;
                case "HEADER":
                    newWidgetData = { _id: "", name: "Header Widget", widgetType: "HEADER", pageId: "", size: 2, text: "Text"};
                    break;
                default:
                    console.log("Unknown Widget Type passed to createTypedWidget");
                    return null;
            }

            return createWidget(pageId, newWidgetData);
        }

        function findWidgetsByPageId(pageId)
        {
            return $http.get("/api/page/"+pageId+"/widget");
        }

        function findWidgetById(widgetId)
        {
            return $http.get("/api/widget/"+widgetId);
        }

        function updateWidget(widgetId,widget)
        {
            return $http.put("/api/widget/"+widgetId,widget);
        }

        function deleteWidget(widgetId)
        {
            return $http.delete("/api/widget/"+widgetId);
        }
    }
})();
