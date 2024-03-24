app.controller('BlogCartController' , function($scope , $rootScope, $http){
    $rootScope.siliderShow = false;
    $http.get(`https://localhost:7272/*api/Product/idCategory/0/page/1`)
    .then(function (response) {
        $scope.ListBlog  = response.data;
    })
    .catch(function (error) {
      console.error('Lỗi khi gọi API:', error);
    });
    $http.get(`https://localhost:7156/api/Blog`)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error('Lỗi khi gọi API:', error);
    });
});