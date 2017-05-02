/**
 * Created by shubh on 01-05-2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController)

    function PageListController($routeParams,PageService)
    {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }

        init();
    }
})();

(function() {
    angular
        .module("WebAppMaker")
        .controller("NewPageController",NewPageController)

    function NewPageController()
    {
        var vm = this;
    }
})();

(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController",EditPageController)

    function EditPageController($routeParams,PageService)
    {
        var vm = this;
        vm.pageID = $routeParams.pid;

        function init() {
            vm.page = PageService.findPageById(vm.pageID);
        }

        init();
    }
})();