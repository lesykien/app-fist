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
function luuThongTin(){
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
app.controller('FormTinyMceController', function ($scope) {
    $scope.AddBlogs = function(){
        let file = document.getElementById('imageInputBlogs').files;
        $scope.DayBlogs = new Date();
        $scope.ImagesBlogs = file;
        var content = document.getElementById('priview').innerHTML;
        $scope.ContentBlogs = content;
        console.log($scope.DayBlogs);
        console.log($scope.ImagesBlogs);
        console.log($scope.TitleBlogs);
        console.log($scope.ContentBlogs);
        var form = new FormData();
        form.append('model.ImagesBlogs', $scope.ImagesBlogs)
        form.append('model.ImagesBlogs', $scope.DayBlogs)
        form.append('model.ImagesBlogs', $scope.TitleBlogs)
        form.append('model.ContenBlogs', $scope.ContentBlogs)
    }
})
