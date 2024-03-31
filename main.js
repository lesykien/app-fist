var app = angular.module('APP', ['ngRoute', 'ngSanitize']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', { templateUrl: "/User/components/Home/Home.html", controller: 'HomeController' })
    // trang chủ

    .when('/shop-detail/:id', { templateUrl: "./User/components/shop-detail/shop-detail.html", controller: 'ShopDetailController' })
    // Chỉ tiết sản phẩm

    .when('/blog/:id', { templateUrl: "./User/components/Blog/Blog.html", controller: 'BlogController' })
    // Bài viết chi tiết

    .when('/cart', { templateUrl: "/User/components/cart/cart.html", controller: 'CartController' })
    // Giỏ hàng

    .when('/checkout', { templateUrl: "/User/components/checkout/checkout.html", controller: 'CheckController' })
    // Đặt hàng 

    .when('/contact', { templateUrl: "/User/components/contact.html", controller: 'ContactController' })
    // Liên hệ

    .when('/shop/:idCategory/:numberPage', { templateUrl: "/User/components/shop/shop.html", controller: 'ShopController' })
    // Của hàng

    .when('/Account', { templateUrl: "/User/components/account/account.html", controller: 'AccountController' })
    // Thông tin tài khoản

    .when('/blog-cart', { templateUrl: "/User/components/BlogCard/BlogCard.html", controller: 'BlogCartController' })
    // Card blog

    .otherwise('/', { templateUrl: "/User/components/Home/Home.html" })
  // Trang chủ
});
app.run(function ($rootScope) {
  $rootScope.$on('$routeChangeStart', function () {
    $rootScope.Loading = true;
  });
  $rootScope.$on('$routeChangeSuccess', function () {
    $rootScope.Loading = false;
  });
  $rootScope.$on('$routeChangeError', function () {
    $rootScope.Loading = false;
    alert("lỗi không kết nối được")
  });
});

app.factory('loadingInterceptor', ['$q', function($q) {
  var loadingCount = 0;

  return {
    request: function(config) {
      loadingCount++;
      $rootScope.Loading = true;
      return config;
    },

    response: function(response) {
      loadingCount--;
      // Ẩn thanh loading nếu không còn yêu cầu nào đang được xử lý
      if (loadingCount === 0) {
        $rootScope.Loading = false;
      }
      return response;
    },

    responseError: function(response) {
      loadingCount--;
      // Ẩn thanh loading nếu không còn yêu cầu nào đang được xử lý
      if (loadingCount === 0) {
        $rootScope.Loading = false;
      }
      return $q.reject(response);
    }
  };
}]);

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
  $httpProvider.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
}]);

//Chi sẽ dữ liệu lấy từ api
app.service('DataService', function () {
  var data = null;
  return {
    setData: function (value) {
      data = value;
    },
    getData: function () {
      return data;
    }
  };
});

app.controller('MainController', function ($scope, $http, DataService, $rootScope, $location) {
  // hiển thị silider
  $rootScope.siliderShow = true;
  // đếm trong giỏ hàng có bao nhiêu sản phẩm
  var List = JSON.parse(localStorage.getItem('ListProduct'));
  if (List == undefined) {
    $rootScope.CountCart = 0;
  }
  else {
    $rootScope.CountCart = List.length
  }

  // test account when click button path go to my account 
  $scope.TestLogin = () => {
    let accountDetal = JSON.parse(localStorage.getItem("Account"))
    if (accountDetal) {
      $location.path('/Account')
    }
    else {
      window.location.href = "/Login/Login.html"
      localStorage.setItem('path', '/#!/Account')
    }
  }

  // Sự kiện active cho thanh nav
  var menu = document.querySelectorAll('nav.main-menu ul li');
  for (let index = 0; index < menu.length; index++) {
    menu[index].addEventListener('click', function () {
      for (j = 0; j < menu.length; j++) {
        menu[j].classList.remove('current-list-item');
      }
      this.classList.add('current-list-item');
    })
  }
  // Gọi Api load tất cả thông tin sản phẩm có trong csdl
  $http.get('https://localhost:7272/*api/Product/get-product')
    .then(function (response) {

      $rootScope.productsAll = response.data;

      DataService.setData(response.data);

      $rootScope.productsAll = response.data.filter(a => a.status == "sống");
      $rootScope.Count = $rootScope.productsAll.length

      // show new product in database
      $rootScope.NewPro = response.data.filter(a => a.status == "sống")[0];
    })
    .catch(function (error) {
      console.error('Lỗi khi gọi API:', error);
    });

  // Lấy tất cả thông tin của lại sản phẩm
  $http.get(`https://localhost:7272/*api/Category`)
    .then(function (response) {
      $rootScope.categorys = response.data.filter(a => a.count > 0);
    })
    .catch(function (error) {
      console.error('Lỗi khi gọi API:', error);
    });

  // thêm sản phẩm vào giỏ hàng
  $rootScope.AddToCart = function (item) {
    const ListLocal = localStorage.getItem('ListProduct');
    console.log(item);
    var Product = {
      id: item.id,
      name: item.name,
      link: item.image,
      price: item.price,
      quantity: 1,
      total: item.price * 1
    }

    let List = [];
    if (!ListLocal) {
      List.push(Product);
      localStorage.setItem('ListProduct', JSON.stringify(List))
    }
    else {
      List = JSON.parse(ListLocal);
      const pro = List.find(a => a.id == item.id);
      // Kiểm trả xem đã có sản phẩm này trong giỏ hàng hay chưa
      // Nếu chưa ==> Thêm item mới vào giỏ hàng
      if (!pro) {
        List.push(Product);
        localStorage.setItem('ListProduct', JSON.stringify(List))
      }
      else {
        var New = {
          id: item.id,
          name: item.name,
          link: item.image,
          price: item.price,
          quantity: pro.quantity + 1,
          total: item.price * (pro.quantity + 1)
        }

        for (var i = 0; i < List.length; i++) {
          if (List[i].id == item.id) {
            List[i] = New;
          }
        }
        localStorage.setItem('ListProduct', JSON.stringify(List))
      }
    }
    alert('Thêm sản phẩm thành công ')

    var List1 = JSON.parse(localStorage.getItem('ListProduct'));
    if (List1 == undefined) {
      $rootScope.CountCart = 0;
    }
    else {

      $rootScope.CountCart = List1.length
    }
  }

})

