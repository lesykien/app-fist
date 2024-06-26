app.controller('HistoryController', function ($scope, $http, $routeParams) {

    // Đổi tiêu để
    $scope.lbl_TieuDe = "Danh sách lịch sử đơn hàng"

    $scope.label = 'Tất cả'

    var ListOrder = []

    let listReason = [
        { id: 1, contnet: 'Không liên lạc được với khách hàng' },
        { id: 5, contnet: 'Sản phẩm hết hàng' }, 
        { id: 6, contnet: 'Khách hàng không nhận sản phẩm' }
    ]

    function LoadFrom() {
        $http.get(`https://localhost:7272/type/${$routeParams.type}`)
            .then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var InformationOrder = {
                        id: response.data[i].id,
                        statusDelivery: response.data[i].statusDelivery,
                        phone: JSON.parse(localStorage.getItem(response.data[i].idAccount)).Phone,
                        dateTime: moment(response.data[i].dateTime).format('DD/MM/YYYY'),
                        totalAmount: response.data[i].totalAmount,
                        statusOrder: response.data[i].statusOrder,
                    }
                    ListOrder.push(InformationOrder)
                }
                // $rootScope.HistoryCount = response.data.length;
            })
        $scope.ListPending = ListOrder;

        // load reason for oder 
    }

    LoadFrom();

    // Hiển thông tin đơn hàng chi tiết
    $scope.DetalOrder = function (idOrdert) {
        $http.get(`https://localhost:7272/*api/Orders/${idOrdert}`)
            .then(function (response) {
                $scope.ListProductDetalOrder = response.data[0].detal
                $scope.InformationOder = response.data[0]

                $scope.DateTime = moment($scope.InformationOder.dateTime).format('DD/MM/YYYY HH:mm');

                $scope.InformationAccount = JSON.parse(localStorage.getItem($scope.InformationOder.idAccount))

                for (let i = 0; i < listReason.length; i++) {
                    if (listReason[i].id == response.data[0].statusOrder) {
                        $scope.reason = listReason[i].contnet;
                    }
                }
            })

    }

    $scope.LocDonHang = function (id) {
        if (id == 1) {
            $scope.label = 'Giao hàng thành công';
            $scope.ListPending = ListOrder.filter(a => a.statusDelivery === 3);
        }
        else if (id == 2) {
            $scope.label = 'Tất cả';
            $scope.ListPending = ListOrder;
        }
        else if (id == 3) {
            $scope.ListPending = ListOrder.filter(a => a.statusDelivery === 4 || a.statusDelivery === 5);
        }
    }
})