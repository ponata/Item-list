angular.module("addItemsApp", [])
    .controller("mainController", mainController);

    function mainController($scope, mainService) {
        // localStorage.clear();

        $scope.items = mainService.getItemList();
        $scope.newComment = {};

        $scope.addNewItem = function (newItem) {
            $scope.items = mainService.addNewItem(newItem);
            $scope.newItem = null;
        }

        $scope.deleteItem = function(event, index, item) {
            event.stopPropagation();
            $scope.items = mainService.deleteItem(index);

            // hide comments block if selected item was deleted
            if ($scope.selectedItem && item.id === $scope.selectedItem.id) {
                $scope.selectedItem = null;
            }
        }

        $scope.addNewComment = function (newComment) {
            if ($scope.newComment.value) {
                newComment = mainService.addNewComment(newComment);
                $scope.selectedItem.comments.push(newComment);
                mainService.updateLocalStorage($scope.items);
            }
            $scope.newComment = {};
        }

        $scope.selectItem = function(item, index) {
            $scope.selectedItem = item;
            $scope.selectedCommentsIndex = index + 1;
            $scope.newComment = {};
        }

    };
