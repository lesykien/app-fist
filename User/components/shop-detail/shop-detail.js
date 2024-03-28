app.controller('ShopDetailController', function ($scope, $http, $rootScope, DataService, $routeParams) {
    // ẩn eml phóng to hình ảnh
    $scope.hideDiv = true;

    $rootScope.siliderShow = false;


    // mảng chứa link hình ảnh
    let ListLink = [];

    // gọi api để lấy tất cả hình ảnh
    $http.get(`https://localhost:7272/*api/Product/${$routeParams.id}`)
        .then(function (response) {
            $scope.ProductDetal = response.data
            for (let i = 0; i < response.data[0].link.length; i++) {
                let img = $scope.ProductDetal[0].link[i]
                ListLink.push(img)
            }

            $scope.link = ListLink[0].link;
            $scope.index = 0

            // chuyển index hình ảnh
            $scope.tang_hinh = (index, type) => {
                switch (type) {
                    case 1:
                        if ($scope.index == ListLink.length - 1) {
                            $scope.link = ListLink[0].link;
                            $scope.index = 0;
                        }
                        else {
                            $scope.index = index + 1;
                            $scope.link = ListLink[$scope.index].link;
                        }
                        break;

                    case 0:
                        if ($scope.index == 0) {
                            $scope.link = ListLink[ListLink.length - 1].link;
                            $scope.index = ListLink.length - 1;
                        }
                        else {
                            $scope.index = index - 1;
                            $scope.link = ListLink[$scope.index].link;
                        }
                        break;
                }
            }
            // lấy sản phẩm tương ứng
            $scope.ProductTuongUng = DataService.getData().filter(a => a.idCategory == response.data[0].idCategory && a.id != response.data[0].id);
        })
        .catch(function (error) {
            console.error('Lỗi khi gọi API:', error);
        });


    // zoon hình ảnh
    $scope.ZoomImages = function (index) {
        $scope.hideDiv = false;
        const ListLink = $scope.ProductDetal[0].link;
        for (var i = 0; i < ListLink.length; i++) {
            if (i == index) {
                $scope.Link1 = ListLink[i].link
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
        let ListLink = $scope.ProductDetal[0].link;
        // nếu type == 1 thì index + 1
        if (type == 1) {
            if (index == ListLink.length - 1) {
                $scope.Link1 = ListLink[0].link
                $scope.indexImg = 0;
            }
            else {
                $scope.indexImg = index + 1;
                $scope.Link1 = ListLink[$scope.indexImg].link;
            }
        }
        // nếu type != 1 thì index - 1
        else {
            if (index == 0) {
                $scope.indexImg = ListLink.length - 1;
                $scope.Link1 = ListLink[$scope.indexImg].link
            }
            else {
                $scope.indexImg = index - 1;
                $scope.Link1 = ListLink[$scope.indexImg].link
            }
        }
    }

    //$scope.link = $scope.ListLink[0].link;

})

