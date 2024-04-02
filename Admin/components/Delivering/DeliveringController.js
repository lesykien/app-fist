app.controller('DeliveringController', function ($scope, $http, $routeParams, $rootScope) {
    // Đổi tiêu để
    $scope.lbl_TieuDe = "Danh sách đơn hàng đang giao"

    // List đơn hàng
    // Load form duyệt đơn hàng
    function LoadFrom() {
        var ListOrder = []
        $http.get(`https://localhost:7272/type/${$routeParams.type}`)
            .then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var InformationOrder = {
                        id: response.data[i].id,
                        phone: JSON.parse(localStorage.getItem(response.data[i].idAccount)).Phone,
                        dateTime: moment(response.data[0].dateTime).format('DD/MM/YYYY'),
                        totalAmount: response.data[i].totalAmount
                    }
                    ListOrder.push(InformationOrder)
                }
                $rootScope.DeliveryCount = response.data.length;
            })
        $scope.ListPending = ListOrder;

        $scope.ly_Do = 1;

        $scope.lyDo = [
            { id: 1, contnet: 'Không liên lạc được với khách hàng' },
            { id: 6, contnet: 'Khách hàng không nhận sản phẩm' }
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

    // cập nhật trạng thái giao hàng
    $scope.Check = function (id) {
        var mes = confirm('Bạn đã giao đơn hàng này chưa');
        if (mes) {
            $http.put(`https://localhost:7272/type/${$routeParams.type}/id/${id}`)
                .then(function (response) {
                    alert("Giao đơn hàng thành công!!")
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

    // Huỷ đơn hàng
    $scope.Remove = function (id) {
        $http.put(`https://localhost:7272/type/${4}/id/${id}?reason=${$scope.ly_Do}`)
            .then(function (response) {
                alert("Huỷ đơn hàng thành công!!")
                LoadFrom();
            })
            .catch(function (error) {
                alert('Không thể cập nhật được sản phẩm')
            })
    }
})