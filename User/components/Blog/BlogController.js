app.controller('BlogController', function ($scope, $rootScope, $http, $sce, $routeParams) {
  $rootScope.siliderShow = false;
  // get information blog realte to
  let ListBlogCart = []
  $http.get(`https://localhost:7272/api/Blog/get-value`)
    .then(function (response) {
      let List = response.data.filter( a => a.id != $routeParams.id)
      for (let i = 0; i < 4; i++) {
        const object = {
          contenet: $sce.trustAsHtml(List[i].contenet),
          datePush: moment(List[i].datePush).format('DD/MM/YYYY'),
          image: List[i].image,
          healine: List[i].healine,
          id: List[i].id
        }
        ListBlogCart.push(object);
      }
      $scope.ListBlog = ListBlogCart
    })

  // get inforamtion blof follow id
  const item = document.getElementById('item');
  $http.get(`https://localhost:7272/api/Blog/get-id/=${$routeParams.id}`)
    .then(function (response) {
      const object = {
        contenet: $sce.trustAsHtml(response.data.contenet),
        datePush: moment(response.data.datePush).format('DD/MM/YYYY HH:MM'),
        image: response.data.image,
        healine: response.data.healine,
        id: response.data.id
      }
      $scope.Inforamtion = object
      // check content enter document item 
      item.innerHTML = object.contenet
    })

});