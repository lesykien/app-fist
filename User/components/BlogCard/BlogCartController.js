app.controller('BlogCartController' , function($scope , $rootScope, $http, $sce){
    $rootScope.siliderShow = false;
    let ListBlogCart = []
    $http.get(`https://localhost:7156/api/Blog/get-value`)
    .then(function (response) {
        for (let i = 0; i < response.data.length; i++) {
          const object = {
            contenet : $sce.trustAsHtml(response.data[i].contenet),
            datePush : moment(response.data[i].datePush).format('DD/MM/YYYY HH:mm'),
            image : response.data[i].image, 
            healine : response.data[i].healine,
            id : response.data[i].id
          }
          ListBlogCart.push(object);
        }
        $scope.ListBlog  = ListBlogCart
    })
    .catch(function (error) {
      console.error('Lỗi khi gọi API:', error);
    });
});