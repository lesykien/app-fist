app.controller('HomeController', function ($scope, $http, DataService, $rootScope) {
    let executed = false;
    // Hàm được gọi khi form được load
    function onLoadForm() {
        // Kiểm tra xem câu lệnh đã được thực thi hay chưa
        if (!executed) {
            // Thực thi câu lệnh chỉ một lần
            window.location.reload();

            // Đặt biến flag thành true để chỉ ra rằng câu lệnh đã được thực thi
            executed = true;
        }
    }
    $rootScope.siliderShow = true;
    // mặc định ẩn button cửa hàng
    $scope.see_shop = false;

    // Khai báo mảng chứa các sản phẩm được laod ra
    $scope.ListProduct = []
    $scope.page_now = 1;
    $http.get(`https://localhost:7272/*api/Product/get-product-home/=${1}`)
        .then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
                $scope.ListProduct.push(response.data[i])
            }
        })
        .catch(function (error) {
            console.error('Lỗi khi gọi API:', error);
        });
    $scope.see_more = (page_now) => {
        $scope.page_now = page_now + 1;
        if (page_now == 3) {
            // If page_now == 3 then button see_shop will be displayed
            $scope.see_shop = true;
        }
        else {
            // call api 
            $http.get(`https://localhost:7272/*api/Product/get-product-home/=${$scope.page_now}`)
                .then((response) => {
                    // push item enter array $scope.ListProduct
                    for (let i = 0; i < response.data.length; i++) {
                        $scope.ListProduct.push(response.data[i])
                    }
                })
                .catch((error) => {
                    console.error('Lỗi khi gọi API:', error);
                })
        }
    }
})