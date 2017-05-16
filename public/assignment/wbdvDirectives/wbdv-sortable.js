
(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDirective);

    function sortableDirective() {
        function linkFunc(scope, element, attributes, controller) {
            element.sortable({
                axis: 'y',
                handle: '.widget-dragger',

                start: function (event, ui) {
                    var initial_index = ui.item.index();
                    ui.item.data('initial_index', initial_index);
                },

                update: function (event, ui) {
                    var initial_index = ui.item.data('initial_index');
                    var final_index = ui.item.index();
                    controller.UpdateWidgetPosition(initial_index, final_index);
                }
            });
        }

        function SortingController($routeParams, WidgetService) {
            this.UpdateWidgetPosition = UpdateWidgetPosition;

            function UpdateWidgetPosition(startIndex, finalIndex) {
                var pageId = $routeParams['pid'];
                WidgetService.UpdateWidgetPosition(startIndex, finalIndex, pageId);
            }
        }

        return {
            controller: SortingController,
            link: linkFunc
        };
    }


})();