
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function (website) {
                    vm.website = website.data;
                })
                .catch(function (error) {
                    vm.error = "Website not found";
                });
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

        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(vm.websiteId, website)
                .then(function (website) {
                    vm.message = "Website updated successfully";
                    $location.url('/user/' + vm.userId + '/website');
                })
                .catch(function (error) {
                    vm.error = "Unable to update the website";
                });
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(function (result) {
                    $location.url('/user/' + vm.userId + '/website');
                })
                .catch(function (error) {
                    vm.error = "Unable to delete website";
                });
        }
    }

})();