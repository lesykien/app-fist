app.controller('CheckController', function ($scope, $http, $rootScope, $location) {
    $rootScope.siliderShow = false;
    $scope.Cart = []
    var Acc = JSON.parse(localStorage.getItem('Account'))
    LoadCart();
    function LoadCart() {
        $scope.btn_ordering = true
        $scope.Cart = JSON.parse(localStorage.getItem('ListProduct'))
        let Total = 0;
        if ($scope.Cart == undefined) {
            $scope.Cart = []
            $scope.Total = 0
        }
        else {
            $scope.Cart.forEach(function (item) {
                Total += item.total;
            })
            $scope.Total = Total;
            if (Acc == undefined) {
                location.href = "/Login/Login.html"
            }
            else {
                $location.path('/checkout')
                $scope.FullName = Acc.fullName
                $scope.Address = Acc.address
                $scope.Email = Acc.email
                $scope.Phone = Acc.phone
            }
        }
    }

    // thanh toán trực tuyến
    $scope.PayBank = function () {
        $scope.btn_ordering = false
        var idAccount = 2;
        console.log(JSON.parse(localStorage.getItem(idAccount)));
    }

    // Hàm xử lý thanh toán trực tuyến
    $scope.Banking = function () {
        if ($scope.FormBanking.$valid) {
            console.log(2);
        }
        else {
            alert('Bạn chưa nhập thông tin nhận hàng')
        }
    }

    // Thanh toán khi nhận hàng
    $scope.CheckOut = function () {
        $scope.btn_ordering = true
    }
    // chép thông tin sản phẩm vào mảng chỉ lấy id và số lượng mua
    var ListCart = []
    for (var i = 0; i < $scope.Cart.length; i++) {
        var New = {
            idProduct: $scope.Cart[i].id,
            quantity: $scope.Cart[i].quantity
        }
        ListCart.push(New)
    }
    // hàm xử lý thanh toán khi nhận hàng
    $scope.Ordering = function () {
        if ($scope.FormBanking.$valid) {
            // chép thông tin giao hàng đến localStorage khác
            var informationDelivery = {
                FullName: Acc.fullName,
                Address: $scope.Address,
                Email: Acc.email,
                Phone: $scope.Phone,
                Note: $scope.Note,
            }
            localStorage.setItem(Acc.id, JSON.stringify(informationDelivery))
            var orderDto = {
                idAccount: Acc.id,
                totalAmount: $scope.Total,
                dateTime: "2024-03-18T07:49:03.262Z",
                statusPayment: true,
                statusOrder: 0,
                statusDelivery: 1,
                methodPayment: 1,
                orderItems: ListCart
            }
            // Gửi thông tin về đơn hàng về api
            $http.post('https://localhost:7272/*api/Orders/orders', orderDto, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(function (response) {
                    alert('Đặt hàng thành công!!!')
                    localStorage.removeItem('ListProduct')
                    $location.path('/Account')
                    $rootScope.CountCart = 0;
                })
                .catch(function (error) {
                    alert('Không thể thêm được sản phẩm')
                });

        }
        else {
            alert('Bạn chưa nhập thông tin nhận hàng')
        }
    }

})