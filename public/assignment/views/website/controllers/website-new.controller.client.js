
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.newWebsite = newWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (websites) {
                    vm.websites = websites.data;
                })
                .catch(function (error) {
                    vm.error = "Websites not found";
                })
        }

        init();

        function newWebsite(website) {
            WebsiteService.createWebsite(vm.userId, website);
            $location.url('/user/' + vm.userId + '/website');
        }
    }
})();