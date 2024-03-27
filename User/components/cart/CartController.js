app.controller('CartController', function ($scope, $http, $rootScope) {
    $rootScope.siliderShow = false;

    $scope.Cart = []
    LoadCart();
    function LoadCart() {
        var listOrder = JSON.parse(localStorage.getItem('ListProduct'))
        if (listOrder.length == 0) {
            $scope.Cart = []
            $scope.Total = 0;
            $rootScope.CountCart = 0;
            $scope.ShowButtonCart = false
        }
        else {
            $scope.ShowButtonCart = true
            $scope.Cart = listOrder;
            let Total = 0;
            $scope.Cart.forEach(function (item) {
                Total += item.total;
            })
            $scope.Total = Total;
        }

    }
    $scope.Remove = function (index) {
        if (confirm('Bạn có muốn xoá sản phẩm này khỏi giỏ hàng không???')) {
            let list = [];
            const item = localStorage.getItem('ListProduct');
            list = JSON.parse(item)
            list.splice(index, 1)
            localStorage.setItem('ListProduct', JSON.stringify(list));
            LoadCart();

            var List1 = JSON.parse(localStorage.getItem('ListProduct'));
            $rootScope.CountCart = List.length
        }
        else {
            LoadCart();
        }
    }
    $scope.UpdateQuantity = function (item, type, index) {
        if (type == 1) {
            if (item.quantity == 1) {
                console.log(item.quantity);
            }
            else {
                const ListLocal = JSON.parse(localStorage.getItem('ListProduct'));
                var NewProduct = {
                    id: item.id,
                    name: item.name,
                    link: item.link,
                    price: item.price,
                    quantity: item.quantity - 1,
                    total: item.price * (item.quantity - 1)
                }
                ListLocal[index] = NewProduct;
                localStorage.setItem('ListProduct', JSON.stringify(ListLocal))
                LoadCart();
            }
        }
        else {
            const ListLocal = JSON.parse(localStorage.getItem('ListProduct'));
            var NewProduct = {
                id: item.id,
                name: item.name,
                link: item.link,
                price: item.price,
                quantity: item.quantity + 1,
                total: item.price * (item.quantity + 1)
            }
            ListLocal[index] = NewProduct;
            localStorage.setItem('ListProduct', JSON.stringify(ListLocal))
            LoadCart();
        }
    }

    // test account when click button path go to my account 
    $scope.Test_LogIn = () => {
        let test = confirm('Bạn có muốn đăng nhập để đặt hàng không???');
        if (test) {
            let accountDetal = JSON.parse(localStorage.getItem("Account"))
            if (accountDetal) {
                $location.path('/Account')
            }
            else {
                window.location.href = "/Login/Login.html"
                localStorage.setItem('path', '/#!/checkout')
            }
        }
    }
})