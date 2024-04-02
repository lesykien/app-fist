app.controller('PendingController', function ($scope, $http, $routeParams, $rootScope) {

    // Đổi tiêu để
    $scope.lbl_TieuDe = "Danh sách đơn hàng chờ xác nhận"

    // List đơn hàng
    // Load form duyệt đơn hàng
    function LoadFrom() {
        var ListOrder = []
        $http.get(`https://localhost:7272/type/${$routeParams.type}`)
            .then(function (response) {
                var List = response.data;
                for (var i = 0; i < response.data.length; i++) {
                    var InformationOrder = {
                        id: response.data[i].id,
                        phone: JSON.parse(localStorage.getItem(response.data[i].idAccount)).Phone,
                        dateTime: moment(response.data[0].dateTime).format('DD/MM/YYYY'),
                        totalAmount: response.data[i].totalAmount
                    }
                    ListOrder.push(InformationOrder)
                }
                $scope.ListPending = ListOrder
                $rootScope.PendingCount = response.data.length;
            })

        $scope.ly_Do = 1;

        $scope.lyDo = [
            { id: 1, contnet: 'Không liên lạc được với khách hàng' },
            { id: 5, contnet: 'Sản phẩm hết hàng' }
        ]
    }

    LoadFrom();

    // Hiển thông tin đơn hàng chi tiết
    $scope.DetalOrder = function (idOrdert) {
        $http.get(`https://localhost:7272/*api/Orders/${idOrdert}`)
            .then(function (response) {
                $scope.ListProductDetalOrder = response.data[0].detal
                $scope.InformationOder = response.data[0]

                $scope.DateTime = moment($scope.InformationOder.dateTime).format('DD/MM/YYYY HH:mm'),

                    $scope.InformationAccount = JSON.parse(localStorage.getItem($scope.InformationOder.idAccount))
            })
    }

    $scope.Check = function (id) {
        var mes = confirm('Bạn có muốn duyệt đơn hàng này không')
        if (mes) {
            $http.put(`https://localhost:7272/type/${$routeParams.type}/id/${id}`)
                .then(function (response) {
                    alert("Duyệt đơn hàng thành công!!")
                    LoadFrom();
                })
                .catch(function (error) {
                    alert('Không thể cập nhật được sản phẩm')
                })
        }
        else {
            LoadFrom();
        }
    }
    $scope.Remove = function (id) {

        $http.put(`https://localhost:7272/type/3/id/${id}?reason=${$scope.ly_Do}`)
            .then(function (response) {
                alert("Hủy đơn hàng thành công !!!")
                LoadFrom();
            })
            .catch(function (error) {
                alert('Không thể cập nhật được sản phẩm')
            })
    }
})