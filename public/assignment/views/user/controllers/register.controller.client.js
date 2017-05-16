
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = registerUser;

        function registerUser(user) {
            UserService
                .createUser(user)
                .then(function (user) {
                    $location.url("/user/" + user.data._id);
                })
                .catch(function (error) {
                    vm.error = "User already exists"
                });
        }
    }

})();