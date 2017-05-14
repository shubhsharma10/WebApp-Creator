/**
 * Created by shubham on 11-05-2017.
 */

module.exports = function (app) {
    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/website/:websiteId/page",findPagesByWebsiteId);
    app.get("/api/page/:pageId",findPageById);
    app.put("/api/page/:pageId",updatePage);
    app.put("/api/page/:pageId",deletePage);

    var pages =
        [
            {_id: "321", name: "Post 1",    websiteId: "456" , description: "Lorem" },
            {_id: "432", name: "Post 2",    websiteId: "456" , description: "Lorem" },
            {_id: "543", name: "Post 3",    websiteId: "456" , description: "Lorem" },
            {_id: "875", name: "Post 4",    websiteId: "567" , description: "Lorem" },
            {_id: "983", name: "Post 5",    websiteId: "567" , description: "Lorem" }
        ];

    function createPage(req,res)
    {
        var websiteId = req.params.websiteId;
        var newPage = req.body;

        newPage._id = ((new Date()).getTime()).toString();
        newPage.websiteId = websiteId;
        pages.push(newPage);
        res.json(newPage);
    }

    function findPagesByWebsiteId(req,res)
    {
        var websiteId = req.params.websiteId;

        var webPagesforWebId = pages.filter( function (u) {
            u.websiteId == websiteId;
        });

        if(webPagesforWebId)
            res.json(webPagesforWebId);
        else
            res.sendStatus(404);
    }

    function findPageById(req,res)
    {
        var pageId = req.params.pageId;

        var foundPage = pages.find(function (u) {
            u._id == pageId;
        });

        if(foundPage)
            res.json(foundPage);
        else
            res.sendStatus(404);
    }

    function updatePage(req,res)
    {
        var pageId = req.params.pageId;
        var newPage = req.body;

        for(var i in pages)
        {
            if(pages[i]._id == pageId)
            {
                pages[i].name = newPage.name;
                pages[i].description = newPage.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
        return;
    }

    function deletePage(req,res)
    {
        var pageId = req.params.pageId;

        for(var i in pages)
        {
            if(pages[i]._id == pageId) {
                pages.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
}