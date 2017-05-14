/**
 * Created by shubh on 01-05-2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController);

    function LoginController($location,UserService)
    {
        var vm = this;
        vm.login = loginUser;

        function loginUser(user)
        {
            UserService
                .findUserByCredentials(user.username,user.password)
                .then(function (user) {
                    $location.url("/user/" + user.data._id);
                })
                .catch(function (error) {
                    vm.error = "Unable to login";
                });
        }
    }
})();