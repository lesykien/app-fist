app.controller('CartController', function ($scope, $http, $rootScope , $location) {
    $rootScope.siliderShow = false;

    $scope.Cart = []
    LoadCart();
    function LoadCart() {
        let acc = JSON.parse(localStorage.getItem('Account')); 
        if(acc){
            LoadListOrder(`Oder/${acc.id}`)
        }
        else{
            LoadListOrder('ListProduct')
        }

    }

    function LoadListOrder(key) {
        var listOrder = JSON.parse(localStorage.getItem(key))
        if (listOrder == undefined) {
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
            let acc = JSON.parse(localStorage.getItem('Account')); 
            if(acc){
                RemoveItemInList(`Oder/${acc.id}` , index)
            }
            else{
                RemoveItemInList('ListProduct' , index)
            }
        }
        else {
            LoadCart();
        }
    }

    // hàm xóa item trong giỏ hàng theo key là tham số truyền vào
    function RemoveItemInList(key , index) {
        let list = [];
        const item = localStorage.getItem(key);
        list = JSON.parse(item)
        list.splice(index, 1)
        localStorage.setItem(key, JSON.stringify(list));
        LoadCart();

        var List1 = JSON.parse(localStorage.getItem(key));
        $rootScope.CountCart = List1.length
    }

    // Update quantity for item in card
    $scope.UpdateQuantity = function (item, type, index) {
        if (type == 1) {
            if (item.quantity == 1) {

            }
            else {
                const ListLocal = JSON.parse(localStorage.getItem('ListProduct'));
                var NewProduct = {
                    id: item.id,
                    name: item.name,
                    image: item.image,
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
                image: item.image,
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
        let account = localStorage.getItem('Account')
        console.log(account);
        if (account)$location.path('/checkout')
        else {
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
        
    }
})