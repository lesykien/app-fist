tinymce.init({
    selector: 'textarea',
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
        { value: 'First.Name', title: 'First Name' },
        { value: 'Email', title: 'Email' },
    ],
    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
});
const priview = document.getElementById('priview');
const mytextarea = document.getElementById('mytextarea')

function get_editor_content() {
    // load thay đổi ra form
    priview.innerHTML = tinyMCE.activeEditor.getContent()
}
function luuThongTin() {
    var information = tinyMCE.activeEditor.getContent()
}

//Hàm hiển thị ảnh Blogs đề mô
function previewImage(event) {
    var input = event.target;
    var reader = new FileReader();

    reader.onload = function () {
        var image = document.getElementById('preview');
        image.src = reader.result;
        image.style.display = 'block';
    };

    reader.readAsDataURL(input.files[0]);
}

// get id blog in sessionStorage
const id = sessionStorage.getItem('id');
//Thêm Blogs
var app = angular.module('APP', ['ngRoute']);

app.controller('FormTinyMceController', function ($scope, $http, $location) {

    var content = document.getElementById('priview').innerHTML;


    $scope.show_button = true;
    $scope.AddBlogs = function () {
        let file = document.getElementById('imageInputBlogs').files;
        $scope.ImagesBlogs = file;
        var content = document.getElementById('priview').innerHTML
        $scope.ContentBlogs = content;
        const title = $scope.TitleBlogs;
    
        console.log($scope.TitleBlogs);
        console.log($scope.ContentBlogs);
        console.log($scope.ImagesBlogs[0]);

        var form = new FormData();
        form.append('blogDtos.Healine', title)
        form.append('blogDtos.Contenet', $scope.ContentBlogs)
        form.append('blogDtos.formFile', $scope.ImagesBlogs[0])

        $http.post('https://localhost:7156/api/Blog/post-blog', form, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
            .then(function (response) {
                alert('Thêm Blogs thành công!')
                window.location.href = '/Admin/index.html#!/ListBlog'
            })
            .catch(function (error) {
                alert('Không thể thêm được sản phẩm')
            });
    }

    if (!id) $scope.show_button = true;
    else {
        // get blog with id in sessionStorage 
        $http.get(`https://localhost:7156/api/Blog/get-id/=${id}`)
            .then((response) => {
                mytextarea.innerHTML = response.data.contenet
                $scope.TitleBlogs = response.data.healine
                priview.innerHTML = response.data.contenet
                $scope.show_button = false;
            })
            .catch((error) => {
                console.log(error);
            })

    }

    $scope.Save = () => {
        const content_blog = tinyMCE.activeEditor.getContent()
        let file = document.getElementById('imageInputBlogs').files;
        if (file.length == 0) {
            let form = new FormData();
            form.append('blog.Healine', $scope.TitleBlogs);
            form.append('blog.Contenet', content_blog);
            $http.put(`https://localhost:7156/api/Blog/put-blog/${id}`, form, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
                .then(function (response) {
                    alert('Cập nhật bài viết thành công')
                    window.location.href = '/Admin/index.html#!/ListBlog'
                })
                .catch(function (error) {
                    alert('Không thể thêm được sản phẩm')
                });
        }
        else{
            let form = new FormData();
            form.append('blog.Healine', $scope.TitleBlogs);
            form.append('blog.Contenet', content_blog);
            form.append('image', file[0] );
            $http.put(`https://localhost:7156/api/Blog/put-blog/${id}`, form, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
                .then(function (response) {
                    alert(response.data)
                    window.location.href = '/Admin/index.html#!/ListBlog'
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        
    }

    $scope.Close = () => {
        sessionStorage.removeItem('id')
    }

})
