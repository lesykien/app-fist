app.controller('ImagesController', function ($scope, $routeParams, $http) {
    function LoadForm() {
        $scope.lbl_TieuDe = "Danh sách hình ảnh"
        // get all image by id product
        $http.get(`https://localhost:7272/api/get-image-by-${$routeParams.id}`)
            .then((response) => {
                $scope.ListImage = response.data.filter(a => a.isPriamry == false)
                $scope.ImageAvatar = response.data.filter(a => a.isPriamry == true)[0]
            })
            .catch((err) => {
                console.log(err);
            })

        // get information product not image
        $http.get(`https://localhost:7272/*api/Product/get-pro-not-img-${$routeParams.id}`)
            .then((response) => {
                $scope.data = response.data
            })
            .catch((err) => {
                console.log(err);
            })

        // get product
        $http.get(`https://localhost:7272/*api/Category`)
            .then(function (response) {
                $scope.ListCategory = response.data;
            })
    }
    LoadForm();

    // Remove_Img
    $scope.Remove_Img = function (id) {
        const mes = confirm('Bạn có muốn xóa hình này không ??');
        if (mes) {
            $http.delete(`https://localhost:7272/delete-img-${id}`)
                .then((response) => {
                    LoadForm();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            LoadForm();
        }
    }

    // add img 
    $scope.add_img = function () {
        let file = document.getElementById('file').files;
        if (file.length == 0) alert('Bạn chưa chọn file hình ảnh!!!!');
        else {
            var form = new FormData();
            for (var i = 0; i < file.length; i++) {
                form.append('files', file[i]);
            }

            $http.post(`https://localhost:7272/add-img-?id=${$routeParams.id}`, form, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
                .then(function (response) {
                    alert('Thêm sản phẩm thành công !!!')
                    LoadForm();
                    file.length == 0;
                })
                .catch(function (error) {
                    alert('Không thể thêm được sản phẩm')
                });
        }
    }

    // post img avartar
    $scope.Avartar = function (id) {
        const mes = confirm('Bạn có muốn đổi ảnh đại diện không ??');
        if (mes) {
            $http.put(`https://localhost:7272/change-avatar-id?id=${id}`)
                .then((response) => {
                    alert(response.data);
                    LoadForm();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            LoadForm();
        }
    }

    // edit status
    $scope.Edit_Status = function (id) {
        const mes = confirm('Bạn có muốn thay đổi trạng thái của sản phẩm này không')
        if (mes) {
            $http.put(`https://localhost:7272/*api/Product/status/${id}`)
                .then(function (response) {
                    LoadForm();
                })
                .catch(function (error) {
                    alert('Không thể cập nhật được sản phẩm')
                })
        }
        else {
            LoadForm();
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

    // open popup edit product
    $scope.Edit = function (item) {
        $scope.Lable = 'Cập nhật thông tin sản phẩm'
        $scope.ShowButton = false;
        $scope.Name = item.name
        $scope.Price = item.price
        $scope.Brands = item.brands
        $scope.Stock = item.stock
        $scope.Describe = item.description
        $scope.Category = item.idCategory
        $scope.id = item.id
    }

    // save new information product enter database
    $scope.EditSave = function(id){
        let newPro = {
            id: id,
            name: $scope.Name ,
            price: $scope.Price,
            brands: $scope.Brands,
            stock: $scope.Stock,
            status: " ",
            description: $scope.Describe,
            idCategory: $scope.Category
        }

        $http.put(`https://localhost:7272/*api/Product/update-not-img-?id=${id}`, newPro)
        .then(function (response) {
            alert(response.data)
            LoadForm();
        })
        .catch(function (error) {
            alert('Không thể cập nhật được sản phẩm')
        })

    }
}) 