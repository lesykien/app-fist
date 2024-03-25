app.controller('ListBlogController', function ($scope, $http) {
    $scope.lbl_TieuDe = 'Danh sách bài viết'
    let litsBlogs = []
    // Lấy thông tin blogs
    $http.get(`https://localhost:7156/api/Blog/get-value`).then(function (response) {
           
           for (let i = 0; i < response.data.length; i++){
            const object = {
                datePush : moment(response.data[i].dataPush).format('DD/MM/YYYY'),
                image : response.data[i].image,
                healine : response.data[i].healine,
                id : response.data[i].id
            }
            litsBlogs.push(object)
           }
            $scope.ListBlogs = litsBlogs
            console.log($scope.ListBlogs)
        })
})