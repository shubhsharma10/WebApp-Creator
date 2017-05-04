/**
 * Created by shubh on 01-05-2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController)

    function RegisterController($location,UserService)
    {
        var vm = this;
        vm.addUser = addUser;

        function addUser(user)
        {
            var newUser = UserService.createUser(user);
            $location.url("/user/"+newUser._id);
        }
    }
})();