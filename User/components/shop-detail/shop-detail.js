
app.controller('ShopDetailController', function ($scope, $http, $rootScope, DataService, $routeParams) {
    // ẩn eml phóng to hình ảnh
    $scope.hideDiv = true;

    $rootScope.siliderShow = false;


    // mảng chứa link hình ảnh
    let ListLink = [];
    // gọi api để lấy tất cả hình ảnh
    $http.get(`https://localhost:7272/*api/Product/get-by-id/${$routeParams.id}`)
        .then(function (response) {
            $scope.ProductDetal = response.data
            for (let i = 0; i < response.data.images.length; i++) {
                let img = $scope.ProductDetal.images[i]
                ListLink.push(img)
            }
            $scope.link = ListLink[0];


            // lấy thông tin sản phẩm cho sự kiện thêm vào giỏ hàng
            let pro = {
                id: $routeParams.id,
                image: response.data.images[0],
                name: response.data.name,
                price: response.data.price,
                quantity: 1,
                total: 1 * response.data.price,
            }

            $scope.pro = pro

            // function chuyển img
            $scope.index = 0;
            const item_img = document.querySelector('.item_trastion_img');
            item_img.style.gridTemplateColumns = `repeat(${response.data.images.length}, 28rem)`

            const container_item_img = document.querySelector('.container_item_img');
            container_item_img.style.gridTemplateColumns = `repeat(${response.data.images.length}, 6.3rem)`

            let inSetInterval;
            function executeInterval() {
                inSetInterval = setInterval(() => {
                    let sum;
                    if ($scope.index == response.data.images.length - 1) {
                        let img = document.querySelector('.item_trastion_img');
                        $scope.index = 0;
                        sum = $scope.index * 28;
                        img.style.transform = `translateX(-${sum}rem)`;
                    } else {
                        let img = document.querySelector('.item_trastion_img');
                        $scope.index = $scope.index + 1;
                        sum = $scope.index * 28;
                        img.style.transform = `translateX(-${sum}rem)`;
                    }
                }, 4000);
            }

            function resetInterval() {
                clearInterval(inSetInterval);
                executeInterval();
            }

            executeInterval();

            $scope.tang_hinh = (index, type) => {
                let sum;
                let img = document.querySelector('.item_trastion_img');
                switch (type) {
                    // if type == 1 tăng hình
                    case 1:
                        if (index == response.data.images.length - 1) {
                            $scope.index = 0;
                            sum = $scope.index * 28
                            img.style.transform = `translateX(-${sum}rem)`;
                            clearInterval(inSetInterval)
                        }
                        else {
                            $scope.index = $scope.index + 1;
                            sum = $scope.index * 28
                            img.style.transform = `translateX(-${sum}rem)`;
                            clearInterval(inSetInterval)
                        }
                        break;
                    case 0:
                        if (index == 0) {
                            $scope.index = response.data.images.length - 1;
                            sum = $scope.index * 28
                            img.style.transform = `translateX(-${sum}rem)`;
                            clearInterval(inSetInterval)
                        }
                        else {
                            $scope.index = index - 1;
                            sum = $scope.index * 28
                            img.style.transform = `translateX(-${sum}rem)`;
                            clearInterval(inSetInterval)
                        }
                        break;
                }
                setTimeout(resetInterval, 3000);
            }

            // lấy sản phẩm tương ứng
            $scope.ProductTuongUng = DataService.getData().filter(a => a.id != response.data.id && a.idCategory == response.data.idCategory);
        })
        .catch(function (error) {
            console.error('Lỗi khi gọi API:', error);
        });


    // zoon hình ảnh
    $scope.ZoomImages = function (index) {
        $scope.hideDiv = false;
        const ListLink = $scope.ProductDetal.images;
        for (var i = 0; i < ListLink.length; i++) {
            if (i == index) {
                $scope.Link1 = ListLink[i]
            }
        }
        $scope.indexImg = index
    }

    // thoát zoom hình ảnh
    $scope.Thoat = function () {
        $scope.hideDiv = true;
    }
    // Chuyển hình ảnh
    $scope.NextImages = function (index, type) {
        let ListLink = $scope.ProductDetal.images;
        // nếu type == 1 thì index + 1
        if (type == 1) {
            if (index == ListLink.length - 1) {
                $scope.Link1 = ListLink[0]
                $scope.indexImg = 0;
            }
            else {
                $scope.indexImg = index + 1;
                $scope.Link1 = ListLink[$scope.indexImg];
            }
        }
        // nếu type != 1 thì index - 1
        else {
            if (index == 0) {
                $scope.indexImg = ListLink.length - 1;
                $scope.Link1 = ListLink[$scope.indexImg]
            }
            else {
                $scope.indexImg = index - 1;
                $scope.Link1 = ListLink[$scope.indexImg]
            }
        }
    }

    $scope.quantity = 1 ;
    
    // cập nhật số lương mua
    $scope.EditQuantity_shop = function(type){
        switch(type){
            case 1 :
                if($scope.quantity != 1){
                    $scope.quantity = $scope.quantity - 1 
                }
            break;
            case 2 :
                $scope.quantity = $scope.quantity + 1 
            break;
        }
    }
})

