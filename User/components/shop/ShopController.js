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


  //lấy thông tin tất cả sản phẩm
  let ListPro = [];
  let paginatedList = [];

  $http.get('https://localhost:7272/*api/Product/get-product')
    .then(function (response) {
      if ($routeParams.idCategory == 0) {
        ListPro = response.data.filter(a => a.status == "sống");
      }
      else {
        ListPro = response.data.filter(a => a.idCategory == $routeParams.idCategory && a.status == "sống");
      }
      // tính số trang
      paginatedList = numberPage(ListPro)
      $rootScope.item = paginatedList
    })
    .catch(function (error) {
      console.error('Lỗi khi gọi API:', error);
    });

  $scope.IdCategory = $routeParams.idCategory;
  // hàm tính số trang
  function numberPage(List) {
    let ListItem = []
    const linmit = 12
    const item = Math.ceil(List.length / linmit);
    let e ;
    for (let i = 1; i <= item; i++) {
      if ( i == $routeParams.numberPage){
        e = {
          id: i,
          isSelected: true
        }
      }
      else{
        e = {
          id: i,
          isSelected: false
        }
      }

      ListItem.push(e)
    }
    return ListItem;
  }

  $scope.toggleColor = function (item) {
    // Đảm bảo rằng chỉ có một phần tử được chọn
    angular.forEach($scope.categorys, function (category) {
      category.isSelected = false;
    });
    // Đặt item hiện tại là được chọn
    item.isSelected = true;
  };

  // tạo sự kiện tìm kiếm
  const search = document.getElementById('search');
  search.addEventListener('input', function () {
    const container__goiY = document.querySelector('.container__goiY');
    let products = DataService.getData().filter(a => a.name == search.value);
    if (search.value.trim() == '') {
      container__goiY.style.height = '0rem'
      container__goiY.style.border = 'none'
    }
    else {
      container__goiY.style.height = '20rem'
      container__goiY.style.border = '1px solid #888'
    }
  })
  $scope.title_btn = 'Giảm dần'
  $scope.show_btn_price = false;
  // drop down sort
  const drop_down_sort = document.getElementById('drop-down-sort');
  const position_group_btn = document.querySelector('.position-group-btn');
  drop_down_sort.addEventListener('click', () => {
    position_group_btn.style.height = "auto"
    drop_down_sort.classList.add('activi-drop-down')
  })

  // function sort product by price
  $scope.sort_price = (type) => {
    if (type == 1) {
      // if type == 1 product decrease by price
      $scope.title_btn = 'Giảm dần';
      $scope.show_btn_price = false;
      position_group_btn.style.height = "0px"
      $scope.sort = '-price'
    }
    else {
      // if type != 1 product ascending by price
      $scope.title_btn = 'Tăng dần';
      $scope.show_btn_price = true;
      position_group_btn.style.height = "0px"
      $scope.sort = '+price'
    }
  }

  // Function search product
  $scope.Search = function () {
    const container__goiY = document.querySelector('.container__goiY');
    let searchEncode = encodeURIComponent($scope.search)
    $http.get(`https://localhost:7272/*api/Product/get-by-name-?namePro=${searchEncode}`)
      .then((response) => {
        $scope.products = response.data;
        container__goiY.style.height = '0rem'
        container__goiY.style.border = 'none'
      })
      .catch((err) => {
        console.log(err);
      })
  }

});




