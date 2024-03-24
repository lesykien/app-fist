app.controller('ShopController', function ($scope, $http, DataService, $rootScope, $routeParams) {
  $rootScope.siliderShow = false;
  // lấy thông tin sản phẩm theo phân trang
  $http.get(`https://localhost:7272/*api/Product/idCategory/${$routeParams.idCategory}/page/${$routeParams.numberPage}`)
    .then(function (response) {
      $scope.products = response.data;
    })
    .catch(function (error) {
      console.error('Lỗi khi gọi API:', error);
    });



  // lấy trang hiện tại
  $scope.InPage = parseInt($routeParams.numberPage)

  // lấy loại sản phẩm hiện tại
  $scope.IdCategory = $routeParams.idCategory

  $scope.Next = function (InPage, type) {
    if (type == 1) {
      if (InPage == 1) {
        $scope.Luiitem = 1;
      }
      else {
        $scope.Luiitem = InPage - 1;
      }
    }
    else {
      // Lấy tổng số trang 
      var List = DataService.getData();
      // tính tổng số trang
      var itemMax = Math.ceil(List.length / 6);
      if (InPage == itemMax) {
        $scope.Luiitem = itemMax;
      }
      else {
        $scope.Luiitem = InPage + 1;
      }
    }
  }

  $scope.SortByPrice = function (type) {
    console.log(type);
  }

  // tạo sự kiện tìm kiếm
  const search = document.getElementById('search');
  search.addEventListener('input', function () {
    const container__goiY = document.querySelector('.container__goiY');
    let products = DataService.getData().filter(a => a.name == search.value);
    console.log(products);
    if(search.value.trim() == '' ){
      container__goiY.style.height = '0rem'
      container__goiY.style.border = 'none'
    }
    else{
      container__goiY.style.height = '20rem'
      container__goiY.style.border = '1px solid #888'
    }
  })
});




