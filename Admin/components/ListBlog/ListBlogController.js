app.controller('ListBlogController', function ($scope, $http) {
    sessionStorage.removeItem('id')
    $scope.lbl_TieuDe = 'Danh sách bài viết'
    // Lấy thông tin blogs
    function LoadListBlogs(){
        let litsBlogs = []
        $http.get(`https://localhost:7272/api/Blog/get-value`).then(function (response) {
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
    }
    
    LoadListBlogs()
    // envent click enter button edit
    $scope.Edit = (id) => {
        sessionStorage.setItem('id' , id);
        // save id blog enter sessionStorage
        location.href = '/Admin/components/FormTinyMce/FormTinyMce.html'
    }

    $scope.DeleteBlogs = function (id){
        const confirmed = confirm('Bạn có muốn xóa Blogs này không?')
        if(confirmed){
            $http.delete(`https://localhost:7272/api/Blog/delete-blog/${id}`)
            .then(function (response) {
                alert('Xóa Blogs thành công!')
                LoadListBlogs()
            })
            .catch(function (error) {
                alert('Không thể xóa Blogs này!')
            })
        }
    }
})