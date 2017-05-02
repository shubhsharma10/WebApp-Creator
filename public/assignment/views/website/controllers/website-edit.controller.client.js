/**
 * Created by shubh on 01-05-2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController",EditWebsiteController)

    function EditWebsiteController($routeParams,WebsiteService)
    {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        //vm.userId = $routeParams.uid;

        function init() {
            vm.website = WebsiteService.findWebsitesById(vm.websiteId);
        }

        init();
    }
})();