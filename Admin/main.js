var app = angular.module('APP', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        // Đường dẫn đến trang chủ
        .when('/Home', { templateUrl: "./components/Home/Home.html", controller: 'HomeController' })
        .when('/ListProduct', { templateUrl: "./components/ListProduct/ListProduct.html", controller: 'ListProductController' })
        .when('/Home', { templateUrl: "./components/Home/Home.html", controller: 'HomeController' })
        .when('/Pending/:type', { templateUrl: "./components/Pending/Pending.html", controller: 'PendingController' })
        .when('/Delivering/:type', { templateUrl: "./components/Delivering/Delivering.html", controller: 'DeliveringController' })
        .when('/History/:type', { templateUrl: "./components/History/History.html", controller: 'HistoryController' })
        .when('/TypeProduct', { templateUrl: "./components/TypeProduct/TypeProduct.html", controller: 'TypeProductController' })
        .when('/Account', { templateUrl: "./components/Account/Account.html", controller: 'AccountController' })
        .when('/ListBlog', { templateUrl: "./components/ListBlog/ListBlog.html", controller: 'ListBlogController' })
        .when('/ListImages/:id', { templateUrl: "./components/LitsImages/ListImages.html", controller: 'ImagesController' })
        .otherwise({ templateUrl: "./components/Home/Home.html", controller: 'HomeController' })
});

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    $httpProvider.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
  }]);

app.run(function ($rootScope) {
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.Loading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.Loading = false;
    });
    $rootScope.$on('$routeChangeError', function () {
        $rootScope.Loading = false;
    });
});

app.controller('MainController', function ($scope, $http, $rootScope) {
    $scope.Test = 1;
    // hightline menu active
    var Menu_Item = document.querySelectorAll('.menu-cha');
    for (let index = 0; index < Menu_Item.length; index++) {
        Menu_Item[index].addEventListener('click', function () {
            for (j = 0; j < Menu_Item.length; j++) {
                Menu_Item[j].classList.remove('active');
            }
            this.classList.add('active');
        })
    }

    // goi api
    $http.get(`https://localhost:7272/*api/Orders`).then(function (response) {
        $rootScope.PendingCount = response.data.filter(a => a.statusDelivery == 1).length;
        $rootScope.DeliveryCount = response.data.filter(a => a.statusDelivery == 2).length;
        $rootScope.HistoryCount = response.data.filter(a => a.statusDelivery == 3 || a.statusDelivery == 4 || a.statusDelivery == 5).length;
    })

    var Menu_Item_Active = document.querySelectorAll('.sub-menu-active');
    for (let index = 0; index < Menu_Item_Active.length; index++) {
        Menu_Item_Active[index].addEventListener('click', function () {
            for (j = 0; j < Menu_Item_Active.length; j++) {
                Menu_Item_Active[j].classList.remove('active');
            }
            this.classList.add('active');
        })
    }
    $scope.LogOut = function () {
        localStorage.removeItem('Account');
        window.location.href = "/#!/"
    }
})

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

