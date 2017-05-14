/**
 * Created by shubham on 11-05-2017.
 */

module.exports = function (app) {

    app.post("/api/user",createUser);
    app.get("/api/user/:userId",findUserById);
    app.get("/api/user?username=username",findUserByUsername);
    app.get("/api/user?username=username&password=password",
        findUserByCredentials);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);

    var users =
        [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

    function createUser(req,res)
    {
        var newUser = req.body;
        newUser._id = ((new Date()).getTime()).toString();
        users.push(newUser);
        res.json(newUser);
    }

    function findUserById(req,res)
    {
        var userId = req.params.userId;
        var user = users.find(function (u) {
            return u._id == userId;
        });
        if(user)
            res.json(user);
        else
            res.sendStatus(404);
    }

    function findUserByUsername(req,res)
    {
        var username = req.query.username;
        var user = users.find(function (u) {
            return u.username == username;
        });

        if(user)
            res.json(user);
        else
            res.sendStatus(404).send({message:'User not found'});
    }

    function findUserByCredentials(req,res)
    {
        var username = req.query.username;
        var password = req.query.password;
        var user = users.find(function (u) {
            return u.username == username && u.password == password;
        });

        if(user)
            res.json(user);
        else
            res.sendStatus(403);
    }

    function updateUser(req,res)
    {
        var userId = req.params.userId;
        var user = req.body;
        for(var i in users)
        {
            if(users[i]._id == userId)
            {
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                users[i].username = user.username;
                users[i].password = user.password;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
        return;
    }

    function deleteUser(req,res)
    {
        var userId = req.params.userId;
        for(var w in users)
        {
            if(users[w]._id == userId) {
                users.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
        return;
    }
}