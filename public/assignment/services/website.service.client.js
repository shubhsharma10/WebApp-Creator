/**
 * Created by shubh on 01-05-2017.
 */

// WebsiteService
(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService() {
        var websites =
            [
                {_id: "123", name: "Facebook",      developerId: "456" , description: "Lorem" },
                {_id: "234", name: "Tweeter",       developerId: "456" , description: "Lorem" },
                {_id: "456", name: "Gizmodo",       developerId: "456" , description: "Lorem" },
                {_id: "567", name: "Tic Tac Toe",   developerId: "123" , description: "Lorem" },
                {_id: "678", name: "Checkers",      developerId: "123" , description: "Lorem" },
                {_id: "789", name: "Chess",         developerId: "234" , description: "Lorem" }
            ];
        var api =
            {
                "createWebsite": createWebsite,
                "findWebsitesByUser": findWebsitesByUser,
                "findWebsitesById": findWebsitesById,
                "updateWebsite": updateWebsite,
                "deleteWebsite": deleteWebsite
            };
        return api;

        function createWebsite(userId,website)
        {
            website.developerId = userId;
            websites.push(website);
        }

        function findWebsitesByUser(userId)
        {
            for(var i in websites)
            {
                if(websites[i].developerId == userId)
                    return websites[i];
            }
            return null;
        }

        function findWebsitesById(websiteId)
        {
            for(var i in websites)
            {
                if(websites[i]._id == websiteId)
                    return websites[i];
            }
            return null;
        }

        function updateWebsite(websiteId,website)
        {
            for(var i in websites)
            {
                if(websites[i]._id == websiteId)
                    websites[i] = website;
            }
            return websites;
        }

        function deleteWebsite(websiteId)
        {
            for(var i in websites)
            {
                if(websites[i]._id == websiteId)
                    websites.splice(i,1);
            }
            return websites;
        }
    }
})();
