module.exports = function (app) {

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages =
        [
            {"_id": "321", "name": "Japanese Art", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"},
            {"_id": "323", "name": "Japanese Art", "websiteId": "567", "description": "Lorem"},
            {"_id": "324", "name": "Indian Art", "websiteId": "567", "description": "Lorem"},
            {"_id": "325", "name": "Chinese Art", "websiteId": "567", "description": "Lorem"},
        ];

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var newPage = req.body;
        newPage._id = (Date.now()).toString();
        newPage.websiteId = websiteId;
        pages.push(newPage);
        res.json(newPage);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var allPagesForWebsite = pages.filter(function (p) {
            return p.websiteId == websiteId;
        });

        if (allPagesForWebsite) {
            res.json(allPagesForWebsite);
        } else {
            res.sendStatus(404).send({message: 'No Pages found'});
        }
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        var page = pages.find(function (p) {
            return p._id == pageId;
        });
        if (page) {
            res.json(page);
        } else {
            res.sendStatus(404).send({message: 'Page not found'});
        }
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        for (var p in pages) {
            if (pages[p]._id == pageId) {
                pages[p].name = newPage.name;
                pages[p].description = newPage.description;
                res.json(pages[p]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for (var p in pages) {
            if (pages[p]._id == pageId) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};