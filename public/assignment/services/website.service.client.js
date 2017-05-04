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
            website._id = ((new Date()).getTime()).toString();
            website.developerId = userId;
            websites.push(website);
        }

        function findWebsitesByUser(userId)
        {
            var foundWebsites = [];
            for(var i in websites)
            {
                if(websites[i].developerId == userId)
                {
                    foundWebsites.push(websites[i]);
                }
            }
            return foundWebsites;
        }

        function findWebsitesById(websiteId)
        {
            for(var i in websites)
            {
                if(websites[i]._id == websiteId)
                    return angular.copy(websites[i]);
            }
            return null;
        }

        function updateWebsite(websiteId,website)
        {
            for(var i in websites) {
                if (websites[i]._id == websiteId)
                {
                    websites[i].name = website.name;
                    websites[i].description = website.description;

                }
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
