module.exports = function (app) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    function createUser(req, res) {
        var newUser = req.body;
        newUser._id = ((new Date()).getTime()).toString();
        users.push(newUser);
        res.json(newUser);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        var user = users.find(function (u) {
            return u.username == username;
        });
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404).send({message: 'User not found'});
        }
    }

    function findUserByCredentials(req, res)
    {
        var username = req.query.username;
        var password = req.query.password;
        var user = users.find(function (u) {
            return u.username == username && u.password == password;
        });
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }

    function findUserById(req, res)
    {
        var userId = req.params.userId;
        var user = users.find(function (u) {
            return u._id == userId;
        });
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }

    function updateUser(req, res)
    {
        var userId = req.params.userId;
        var newUser = req.body;
        for (var u in users) {
            if (users[u]._id == userId) {
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                res.json(users[u]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteUser(req, res)
    {
        var userId = req.params.userId;
        for (var u in users) {
            if (users[u]._id === userId) {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

}

