/**
 * Created by shubh on 01-05-2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController)

    function LoginController($location,UserService)
    {
        var vm = this;
        vm.login = loginUser;

        function loginUser(user)
        {
            vm.user = UserService.findUserByCredentials(user.username,user.password);
            if(vm.user)
            {
                $location.url("/user/"+vm.user._id);
            }
            else
                vm.alert = "Unable to login"
        }
    }
})();