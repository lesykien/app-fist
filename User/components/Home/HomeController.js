app.controller('HomeController', function ($scope, $http, DataService, $rootScope) { 
    $rootScope.siliderShow = true;

    $scope.ListProduct = []
    $http.get('https://localhost:7272/*api/Product')
    .then(function (response) {
        var list = response.data.filter(a => a.stauts == "sống")
        for (let i = 1; i <= 8 ; i++) {
            $scope.ListProduct.push(list[i])
        }
        $scope.NewPro = list[0];
    })
    .catch(function (error) {
      console.error('Lỗi khi gọi API:', error);
    });
})