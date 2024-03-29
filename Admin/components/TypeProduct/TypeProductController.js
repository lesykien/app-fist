app.controller('TypeProductController', function ($scope, $http) {

    // Đổi tiêu để
    $scope.lbl_TieuDe = "Danh sách loại sản phẩm"
    LoadFrom()
    function LoadFrom() {
        // lấy thông tin category từ api
        $http.get(`https://apiserver.runasp.net/*api/Category`).then(function (response) {
            $scope.ListCategory = response.data;
        })
    }

    // xử lý sự kiện khi click vào button thêm
    $scope.Add = function () {
        $scope.label = 'Thêm loại sản phẩm'
        $scope.ShowButton = true;
    }
    // gửi tên sản phẩm về api 
    $scope.AddCategory = function () {
        var form = new FormData();
        form.append('name', $scope.Name)

        $http.post('https://localhost:7272/*api/Category', form, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
            .then(function (response) {
                alert('Thêm loại sản phẩm thành công')
            })
            .catch(function (error) {
                alert('Không thể thêm được sản phẩm')
            });

        LoadFrom()
    }


    // Xử lý sự kiện khi click vào button Sửa
    $scope.Edit = function (item) {
        $scope.label = 'Cập nhật loại sản phẩm';
        $scope.ShowButton = false;
        $scope.id = item.id
        $scope.Name = item.nameCategory
    }
    // Sử lý Sự kiện khi click vào button lưu
    $scope.SaveEdit = function (id) {
        var form = new FormData();
        form.append('newName', $scope.Name)
        // Gọi api
        $http.put(`https://localhost:7272/*api/Category/Update/${id}`,  form, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
            .then(function (response) {
                alert('Cập nhật sản phẩm thành công')
            })
            .catch(function (error) {
                alert('Không thể thêm được sản phẩm')
            });

        LoadFrom()
    }


    // Xử lý sự kiện khi click vào button close
    $scope.Close = function () {
        $scope.Name = "";
    }

    // Ẩn loại sản phảm
    $scope.Delete = function (id) {
        var test = confirm('Bạn có muốn xoá loại sản phẩm này không????')
        if (test) {
            $http.delete(`https://localhost:7272/*api/Category/delete/${id}`)
            .then((response) => {
                alert(response.data)
                LoadFrom()
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
})