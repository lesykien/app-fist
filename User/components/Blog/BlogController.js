app.controller('BlogController' , function($scope , $rootScope, $http){
    $rootScope.siliderShow = false;
    $http.get(`https://localhost:7272/*api/Product/idCategory/0/page/1`)
    .then(function (response) {
        $scope.BlogLienQuan  = response.data;
    })
    .catch(function (error) {
      console.error('Lỗi khi gọi API:', error);
    });

    
    const informaiton = localStorage.getItem('item');
    const item = document.getElementById('item'); 
    item.innerHTML = informaiton
});