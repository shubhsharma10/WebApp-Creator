/**
 * Created by shubh on 01-05-2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController)

    function WidgetListController($routeParams,WidgetService)
    {
        var vm = this;
        vm.pageId = $routeParams["pid"];
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        function init() {
            console.log("will find widgets now");
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
            console.log("number of widgets: "+vm.widgets.length);
        }

        init();
    }
})();

(function()
{
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController",NewWidgetController)

    function NewWidgetController($routeParams, WidgetService, $location)
    {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetTypes = WidgetService.getWidgetTypes();

        vm.createWidget = createWidget;
        function init()
        {
            console.log("widget types loaded"+vm.widgetTypes);
        }

        init();

        function createWidget(widgetType)
        {
            var newWidget = WidgetService.createTypedWidget(vm.pageId, widgetType);
            $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+ newWidget._id);
        }
    }
})();

(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController",EditWidgetController)

    function EditWidgetController($routeParams,$location,WidgetService)
    {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            console.log("came to edit controller:");
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }

        init();

        function updateWidget(widget) {
            WidgetService.updateWidget(vm.widgetId, widget);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget');
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget');
        }
    }
})();