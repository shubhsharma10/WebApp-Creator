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
        vm.pageId = $routeParams.pid;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
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

    function EditWidgetController()
    {
        var vm = this;
    }
})();