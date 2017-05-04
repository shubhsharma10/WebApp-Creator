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
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        
        function init() {
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
        }

        init();
    }
})();

(function() {
    angular
        .module("WebAppMaker")
        .controller("NewPageController",NewPageController)

    function NewPageController($routeParams,PageService,$location)
    {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.createPage = createPage;
        function init() {
        }

        init();

        function createPage() {
            PageService.createPage(vm.websiteId,vm.page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");
        }
    }
})();

(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController",EditPageController)

    function EditPageController($routeParams,PageService,$location)
    {
        var vm = this;
        vm.pageID = $routeParams["pid"];
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.page = PageService.findPageById(vm.pageID);
        }

        init();

        function updatePage()
        {
            PageService.updatePage(vm.pageID,vm.page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        function deletePage()
        {
            PageService.deletePage(vm.pageID);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }
    }
})();