/**
 * Created by shubh on 01-05-2017.
 */

// UserService
(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService($http) {
        var users =
            [
                {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
                {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
                {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
            ];
        var api =
            {
                "createUser": createUser,
                "findUserById": findUserById,
                "findUserByUsername": findUserByUsername,
                "findUserByCredentials": findUserByCredentials,
                "updateUser": updateUser,
                "deleteUser": deleteUser
            };
        return api;

        function createUser(user)
        {
            return $http.post("/api/user");
            /*user._id = (new Date()).getTime();
            users.push(user);
            return angular.copy(user);*/
        }

        function findUserById(userId)
        {
            return $http.get("/api/user/:"+userId);
            /*for(var i in users)
            {
                if(users[i]._id == id)
                    return angular.copy(users[i]);
            }
            return null;*/
        }

        function findUserByUsername(username)
        {
            return $http.get("/api/user?username="+username);
            /*for(var i in users)
            {
                if(users[i].username == username)
                    return users[i];
            }
            return null;*/
        }

        function findUserByCredentials(username,password)
        {
            return $http.get("/api/user?username="+username+"&password="+password);
            /*
            for(var i in users)
            {
                if(users[i].username == username && users[i].password == password) {
                    return angular.copy(users[i]);
                }
            }
            return null;*/
        }

        function updateUser(userId,user)
        {
            return $http.put("/api/user/:"+userId,user);
            /*for(var i in users)
            {
                if(users[i]._id == userId)
                {
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    users[i].username = user.username;
                    users[i].password = user.password;
                }
            }
            return users;*/
        }

        function deleteUser(userId)
        {
            return $http.delete("/api/user/:"+userId);
            /*
            for(var i in users)
            {
                if(users[i]._id == userId)
                    users.splice(i,1);
            }
            return users;*/
        }
    }
})();
