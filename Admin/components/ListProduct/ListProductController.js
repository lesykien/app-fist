
app.controller('ListProductController', function ($scope, DataService, $http) {

    // Kiểm tra đã đăng nhập hay chưa
    let thongTinAcc = JSON.parse(localStorage.getItem('Account'))
    if (thongTinAcc == null) {
        location.href = "/Login/Login.html"
    }
    else {
        location.href = "./index.html#!/ListProduct"
    }


    $scope.lbl_BoLoc = 'Tất cả';
    // Lấy thông tin sản phẩm
    function LoadListProduct() {
        $http.get(`https://localhost:7272/*api/Product/get-product`).then(function (response) {
            $scope.ListProduct = response.data;
            DataService.setData($scope.ListProduct)
        })
        $scope.Category = 1;
        $scope.Describe = " "
        $scope.lbl_TieuDe = "Danh sách sản phẩm"
    }
    LoadListProduct()
    // Thêm thông tin sản phẩm
    $http.get(`https://localhost:7272/*api/Category`)
        .then(function (response) {
            $scope.ListCategory = response.data;
        })

    $scope.Images = [];

    $scope.Add = function () {
        $scope.Lable = 'Thêm thông tin sản phẩm';
        $scope.ShowButton = true;
    }

    $scope.AddProduct = function () {
        // Xử lý thêm nhiều hình ảnh
        let files = document.getElementById('imageInput').files;
        console.log(files.length);
        for (var i = 0; i < files.length; i++) {
            let file = files[i];
            $scope.Images.push(file);
        }

        var form = new FormData();

        form.append('model.Name', $scope.Name);
        form.append('model.Price', $scope.Price)
        form.append('model.Brands', $scope.Brands)
        form.append('model.Status', "Còn sống")
        form.append('model.Stock', $scope.Stock)
        form.append('model.Description', $scope.Describe)
        form.append('model.IdCategory', $scope.Category)
        // thêm nhiều hình vào form data
        for (var i = 0; i < $scope.Images.length; i++) {
            form.append('model.Images', $scope.Images[i])
        }

        $http.post('https://localhost:7272/*api/Product', form, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
            .then(function (response) {
                alert('Thêm sản phẩm thành công !!!')
                LoadListProduct()
            })
            .catch(function (error) {
                alert('Không thể thêm được sản phẩm')
            });


    }
    // Cập nhật thông tin sản phẩm


    $scope.Edit = function (item) {
        $scope.Lable = 'Cập nhật thông tin sản phẩm'
        $scope.ShowButton = false;
        $scope.Name = item.name
        $scope.Price = item.price
        $scope.Brands = item.brands
        $scope.Stock = item.stock
        $scope.Describe = item.description
        $scope.Category = item.idCategory
        $scope.Id = item.id
    }

    // Lưu thông tin cập nhật về csdl
    $scope.EditSave = function (id) {
        // gắn giá trị thay đổi lại cho form data
        var form = new FormData();

        var files = document.getElementById('imageInput').files;
        for (var i = 0; i < files.length; i++) {
            const file = files[i];
            form.append('model.Images', files[i])
        }
        form.append('model.Name', $scope.Name);
        form.append('model.Price', $scope.Price)
        form.append('model.Brands', $scope.Brands)
        form.append('model.Status', "Còn sống")
        form.append('model.Stock', $scope.Stock)
        form.append('model.Description', $scope.Describe)
        form.append('model.IdCategory', $scope.Category)
        form.append('productId', id)

        $http.put(`https://localhost:7272/*api/Product/product/${id}`, form, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
            .then(function (response) {
                alert('Cập nhật thông tin sản phẩm thành công !!!')
                LoadListProduct()
                $scope.Close()
            })
            .catch(function (error) {
                alert('Không thể cập nhật được sản phẩm')
            });
    }

    // Lọc sản phẩm theo id
    $scope.LocSanPham = function (id) {
        if (id == 1) {
            $scope.lbl_BoLoc = "Còn hàng"
            const ListProduct = DataService.getData();
            $scope.ListProduct = ListProduct.filter(a => a.status === "sống");
        }
        else if (id == 2) {
            $scope.lbl_BoLoc = "Tất cả";
            LoadListProduct();
        }
        else if (id == 3) {
            $scope.lbl_BoLoc = "Hết hàng";
            const ListProduct = DataService.getData();
            $scope.ListProduct = ListProduct.filter(a => a.status === "Không");
        }
    }
    // Xoá dữ liệu khi close
    $scope.Close = function () {
        $scope.Name = '';
        $scope.Price = ''
        $scope.Brands = ''
        $scope.Stock = ''
        $scope.Describe = ''
        $scope.Category = ''
        $scope.Id = ''
    }

    // Cập nhật trạng thái sản phẩm
    $scope.Edit_Status = function (id) {
        const mes = confirm('Bạn có muốn thay đổi trạng thái của sản phẩm này không')
        if (mes) {
            $http.put(`https://localhost:7272/*api/Product/status/${id}`)
                .then(function (response) {
                    LoadListProduct()
                })
                .catch(function (error) {
                    alert('Không thể cập nhật được sản phẩm')
                })

            LoadListProduct()
        }
        else {
            LoadListProduct()
        }

    }
})