
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.getTrustedYouTubeUrl = getTrustedYouTubeUrl;
        vm.getTrustedHtml = getTrustedHtml;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function (widgets) {
                    vm.widgets = widgets.data;
                });
        }

        init();

        function getTrustedYouTubeUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }
    }

    function NewWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetTypes = WidgetService.getWidgetTypes();
        vm.createWidget = createWidget;

        function createWidget(widgetType) {
            WidgetService
                .createTypedWidget(vm.pageId, widgetType)
                .then(function (widget) {
                    var newWidget = widget.data;
                    $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget/' + newWidget._id);
                })
                .catch(function (error) {
                    vm.error = "Unable to create widget";
                })
        }
    }

    function EditWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (widget) {
                    vm.widget = widget.data;
                });
        }

        init();

        function updateWidget(widget) {
            WidgetService
                .updateWidget(vm.widgetId, widget)
                .then(function (result) {
                    $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget');
                })
                .catch(function (error) {
                    vm.error = "Unable to update widget";
                });
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function (result) {
                    $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget');
                })
                .catch(function (error) {
                    vm.error = "Unable to delete widget";
                });
        }
    }
})();