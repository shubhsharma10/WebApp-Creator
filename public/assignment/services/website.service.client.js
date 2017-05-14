/**
 * Created by shubh on 01-05-2017.
 */

// WebsiteService
(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService($http) {

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
            return $http.post("/api/user/:"+userId+"/website",website);
        }

        function findWebsitesByUser(userId)
        {
            return $http.get("/api/user/"+userId+"/website");
        }

        function findWebsitesById(websiteId)
        {
            return $http.get("/api/website/"+websiteId);
        }

        function updateWebsite(websiteId,website)
        {
            return $http.put("/api/website/"+websiteId,website);
        }

        function deleteWebsite(websiteId)
        {
            return $http.del("/api/website/"+websiteId);
        }
    }
})();
