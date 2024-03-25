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
var priview = document.getElementById('priview');
const mytextarea = document.getElementById('mytextarea')

mytextarea.innerHTML = localStorage.getItem('item')

function get_editor_content() {
    // load thay đổi ra form
    priview.innerHTML = tinyMCE.activeEditor.getContent()
}
function luuThongTin() {
    var information = tinyMCE.activeEditor.getContent()
    localStorage.setItem('item', information);
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

//Thêm Blogs
var app = angular.module('APP', ['ngRoute']);
app.controller('FormTinyMceController', function ($scope, $http) {
    $scope.AddBlogs = function () {
        let file = document.getElementById('imageInputBlogs').files;
        $scope.ImagesBlogs = file;
        var content = document.getElementById('priview').innerHTML;
        $scope.ContentBlogs = content;
        const title = $scope.TitleBlogs;

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
                console.log(response);
            })
            .catch(function (error) {
                alert('Không thể thêm được sản phẩm')
            });

    }
})
