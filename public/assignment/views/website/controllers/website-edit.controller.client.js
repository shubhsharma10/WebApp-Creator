/**
 * Created by shubh on 01-05-2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController",EditWebsiteController)

    function EditWebsiteController($routeParams,WebsiteService,$location)
    {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsitesById(vm.websiteId);
        }

        init();

        function deleteWebsite()
        {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website");
        }

        function updateWebsite() {
            WebsiteService.updateWebsite(vm.websiteId,vm.website);
            $location.url("/user/"+vm.userId+"/website");
        }
    }
})();