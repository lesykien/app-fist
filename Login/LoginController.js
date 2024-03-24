var app = angular.module('APP', []);

app.controller('LoginController', function ($scope, $http) {
    $scope.Sumbit = function () {
        if ($scope.Login.$valid) {
            var form = new FormData();
            form.append("UserName", $scope.UserName)
            form.append("PassWord", $scope.password)

            $http.post(`https://localhost:7272/LogIn?UserName=${$scope.UserName}`, form, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
                .then(function (response) {
                    if (response.data == 0) {
                        alert("Kiểm tra lại tài khoản!!")
                    }
                    else {
                        if (response.data.accountType == true) {
                            location.href = '/Admin/index.html'
                        }
                        else {
                            location.href = '/User/index.html'
                        }
                        localStorage.setItem("Account", JSON.stringify(response.data))
                    }
                })
                .catch(function (error) {
                    console.log("Loi" + error);
                });



        }
    };
});





