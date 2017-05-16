
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;

        function init() {
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .then(function (pages) {
                    vm.pages = pages.data;
                })
                .catch(function (error) {
                    vm.error = "No pages found"
                });
        }

        init();
    }

    function NewPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.pageId = $routeParams.pid;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.newPage = newPage;

        function init() {
            PageService
                .findPageById(vm.pageId)
                .then(function (page) {
                    vm.page = page.data;
                })
                .catch(function (error) {
                    vm.error = "Unable to find page";
                });
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .then(function (pages) {
                    vm.pages = pages.data;
                })
                .catch(function (error) {
                    vm.error = "Unable to find pages"
                });
        }

        init();

        function newPage(page) {
            PageService
                .createPage(vm.websiteId, page)
                .then(function (page) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                .catch(function (error) {
                    vm.error = "Unable to create page";
                })
        }
    }

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.pageId = $routeParams.pid;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService
                .findPageById(vm.pageId)
                .then(function (page) {
                    vm.page = page.data;
                })
                .catch(function (error) {
                    vm.error = "Unable to find page";
                });
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .then(function (pages) {
                    vm.pages = pages.data;
                })
                .catch(function (error) {
                    vm.error = "Unable to find pages"
                });
        }

        init();

        function updatePage(page) {
            PageService
                .updatePage(vm.pageId, page)
                .then(function (page) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                .catch(function (error) {
                    vm.error = "Unable to update page";
                });
        }

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .then(function (result) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                .catch(function (error) {
                    vm.error = "Unable to delete page";
                });
        }
    }
})();