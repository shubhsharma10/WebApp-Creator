/**
 * Created by shubh on 01-05-2017.
 */

// PageService
(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService() {
        var pages =
            [
                {_id: "321", name: "Post 1",    websiteId: "456" , description: "Lorem" },
                {_id: "432", name: "Post 2",    websiteId: "456" , description: "Lorem" },
                {_id: "543", name: "Post 3",    websiteId: "456" , description: "Lorem" },
                {_id: "875", name: "Post 4",    websiteId: "567" , description: "Lorem" },
                {_id: "983", name: "Post 5",    websiteId: "567" , description: "Lorem" }
            ];
        var api =
            {
                "createPage": createPage,
                "findPagesByWebsiteId": findPagesByWebsiteId,
                "findPageById": findPageById,
                "updatePage": updatePage,
                "deletePage": deletePage
            };
        return api;

        function createPage(websiteId,page)
        {
            page._id = ((new Date()).getTime()).toString();
            page.websiteId = websiteId;
            pages.push(page);
        }

        function findPagesByWebsiteId(websiteId)
        {
            var webPages = [];
            for(var i in pages)
            {
                if(pages[i].websiteId == websiteId)
                    webPages.push(pages[i]);
            }
            return webPages;
        }

        function findPageById(pageId)
        {
            for(var i in pages)
            {
                if(pages[i]._id == pageId)
                    return angular.copy(pages[i]);
            }
            return null;
        }

        function updatePage(pageId,page)
        {
            for(var i in pages)
            {
                if(pages[i]._id == pageId)
                {
                    pages[i].name = page.name;
                    pages[i].description = page.description;
                }
            }
            return pages;
        }

        function deletePage(pageId)
        {
            for(var i in pages)
            {
                if(pages[i]._id == pageId)
                    pages.splice(i,1);
            }
            return pages;
        }
    }
})();
