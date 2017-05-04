/**
 * Created by shubh on 01-05-2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController",NewWebsiteController)

    function NewWebsiteController($routeParams,WebsiteService,$location)
    {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();

        function createWebsite()
        {
            WebsiteService.createWebsite(vm.userId,vm.website);
            $location.url("/user/"+vm.userId+"/website");
        }
    }
})();