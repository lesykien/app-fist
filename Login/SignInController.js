var app = angular.module('APP' , []); 

app.controller('SignInController' , function($scope , $http){
    $scope.Sumbit = function(){
        if ($scope.Login.$valid){
            $http.get(`https://localhost:7203/api/Account/Get?Email=${$scope.email}`)
                .then(function (response) {
                    if ( response.data == 2 ){
                        alert('Email đã được đăng kí')
                    }
                    else{
                        location.href = '/Admin/SignIn/PassWord.html'
                        localStorage.setItem('Email' , $scope.email)
                    }
                })
                .catch(function (error) {
                    console.log("Loi" + error);
                });
        }
    }; 
}); 

app.controller('PassWord' , function($scope , $http){
    $scope.Sumbit = function(){
        if ($scope.Login.$valid){
            var Email = localStorage.getItem('Email'); 
            var Account = {
                Email : Email, 
                Passwork : $scope.password
            }
            var formData = new FormData();
            formData.append('Acc', JSON.stringify(Account));

            $http.post(`https://localhost:7203/api/Account/SignIn`, formData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
                .then(function (response) {
                    if ( response.data == 0 ){
                        alert('Không thể đăng kí !!!')
                    }
                    else{
                        localStorage.removeItem('Email'); 
                        location.href = '/index.html'
                        localStorage.setItem('test' , Email)
                    }
                })
                .catch(function (error) {
                    console.log("Loi" + error);
                });
        }
    }; 
})