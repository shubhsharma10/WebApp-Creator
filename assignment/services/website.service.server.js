/**
 * Created by shubham on 11-05-2017.
 */

module.exports = function (app) {

    app.post("/api/user/:userId/website",createWebsite);
    app.get("/api/user/:userId/website",findWebsitesByUser);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);


    var websites =
        [
            {_id: "123", name: "Facebook",      developerId: "456" , description: "Lorem" },
            {_id: "234", name: "Tweeter",       developerId: "456" , description: "Lorem" },
            {_id: "456", name: "Gizmodo",       developerId: "456" , description: "Lorem" },
            {_id: "567", name: "Tic Tac Toe",   developerId: "123" , description: "Lorem" },
            {_id: "678", name: "Checkers",      developerId: "123" , description: "Lorem" },
            {_id: "789", name: "Chess",         developerId: "234" , description: "Lorem" }
        ];

    function createWebsite(req,res)
    {
        var userId = req.params.userId;
        var newWebsite = req.body;

        newWebsite.developerId = userId;
        newWebsite._id = ((new Date()).getTime()).toString();
        websites.push(newWebsite);
        res.json(newWebsite);
        return;
    }

    function findWebsitesByUser(req,res)
    {
        var userId = req.params.userId;

        foundWebsites = websites.filter( function (u) {
            u.developerId == userId;
        })

        if(foundWebsites)
            res.json(foundWebsites);
        else
            res.sendStatus(404).send({message:"No website found"});
    }

    function findWebsiteById(req,res)
    {
        var websiteId = req.params.websiteId;
        var website = websites.find(function (u) {
            u._id == websiteId;
        });

        if(website)
            res.json(website);
        else
            res.sendStatus(404);
    }

    function updateWebsite(req,res)
    {
        var websiteId = req.params.websiteId;
        var website = req.body;
        for(var i in websites)
        {
            if (websites[i]._id == websiteId)
            {
                websites[i].name = website.name;
                websites[i].description = website.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
        return;
    }

    function deleteWebsite(req,res)
    {
        var websiteId = req.params.websiteId;

        for(var i in websites)
        {
            if(websites[i]._id == websiteId) {
                websites.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
        return;
    }


};