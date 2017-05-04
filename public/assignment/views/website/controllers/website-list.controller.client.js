/**
 * Created by shubh on 01-05-2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController)

    function WebsiteListController($routeParams,WebsiteService)
    {
        var vm = this;
        vm.userId = $routeParams["uid"];

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();
    }
})();