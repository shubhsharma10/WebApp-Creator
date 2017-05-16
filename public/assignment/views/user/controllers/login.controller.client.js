
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function (user) {
                    $location.url("/user/" + user.data._id);
                })
                .catch(function (error) {
                    vm.error = "Unable to login";
                })
        }
    }
})();