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

(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController",NewWidgetController)

    function NewWidgetController()
    {

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