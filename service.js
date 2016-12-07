angular.module("addItemsApp").service("mainService", mainService);

    function mainService() {

        var storedItems = [];

        this.getItemList = function() {
            if (localStorage.getItem("items")) {
                storedItems = JSON.parse(localStorage.getItem("items"));
                return storedItems;
            } else {
                return [];
            }
        }

        this.addNewItem = function (newItem) {
            var itemObj = {
                id: makeId(),
                value: newItem,
                comments: []
            };

            if(newItem){
                storedItems.push(itemObj);
                this.updateLocalStorage(storedItems);
            }
            return storedItems;
        }

        this.deleteItem = function(index) {
            storedItems.splice(index, 1);
            this.updateLocalStorage(storedItems);
            return storedItems;
        }

        this.addNewComment = function (newComment) {
            newComment.id = makeId();
            // random color to simulate different avatars of users
            newComment.colorAvatar = createRandomColor();
            return newComment;
        }

        this.updateLocalStorage = function(items) {
            localStorage.setItem("items", JSON.stringify(items));
        }

        // create random HEX color
        function createRandomColor() {
            return "#" + Math.random().toString(16).slice(2, 8);
        }

        // create random id
        function makeId() {
           var text = "";
           var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

           for( var i=0; i < 5; i++ ){
               text += possible.charAt(Math.floor(Math.random() * possible.length));
           }
           return text;
        }
    }
