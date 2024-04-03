app.controller('AccountController', function ($scope, $http, $rootScope, $location) {
    $rootScope.siliderShow = false;

    let accountDetal = JSON.parse(localStorage.getItem("Account"))

    LoadForm();
    function LoadForm() {
        // Kiểm tra đã đăng nhập hay chưa
        $scope.FullName = accountDetal.fullName
        $scope.Address = accountDetal.address
        $scope.Email = accountDetal.email
        $scope.Phone = accountDetal.phone

        $http.get(`https://localhost:7272/account/${accountDetal.id}/status/${1}`)
            .then(function (response) {
                $scope.Order = []
                for (var i = 0; i < response.data.length; i++) {
                    var Order = {
                        id: response.data[i].id,
                        idAccount: response.data[i].idAccount,
                        dateTime: moment(response.data[i].dateTime).format('DD/MM/YYYY HH:mm'),
                        totalAmount: response.data[i].totalAmount,
                        statusDelivery: response.data[i].statusDelivery,
                        detal: response.data[i].detal
                    }
                    $scope.Order.push(Order)
                }
            })
            .catch(function (error) {
                console.error('Lỗi khi gọi API:', error);
            });
    }


    // Sự kiện active cho thanh nav
    var menu = document.querySelectorAll('.btn_trangThai');
    for (let index = 0; index < menu.length; index++) {
        menu[index].addEventListener('click', function () {
            for (j = 0; j < menu.length; j++) {
                menu[j].classList.remove('activeButton');
            }
            this.classList.add('activeButton');
        })
    }

    $scope.OrderWithStatus = function (type) {
        switch (type) {
            case 1:
                $http.get(`https://localhost:7272/account/${accountDetal.id}/status/${type}`)
                    .then(function (response) {
                        $scope.Order = []
                        for (var i = 0; i < response.data.length; i++) {
                            var Order = {
                                id: response.data[i].id,
                                idAccount: response.data[i].idAccount,
                                dateTime: moment(response.data[i].dateTime).format('DD/MM/YYYY HH:mm'),
                                totalAmount: response.data[i].totalAmount,
                                statusDelivery: response.data[i].statusDelivery,
                                detal: response.data[i].detal
                            }
                            $scope.Order.push(Order)
                        }
                    })
                    .catch(function (error) {
                        console.error('Lỗi khi gọi API:', error);
                    });
                break
            case 2:
                $http.get(`https://localhost:7272/account/${accountDetal.id}/status/${type}`)
                    .then(function (response) {
                        $scope.Order = []
                        for (var i = 0; i < response.data.length; i++) {
                            var Order = {
                                id: response.data[i].id,
                                idAccount: response.data[i].idAccount,
                                dateTime: moment(response.data[i].dateTime).format('DD/MM/YYYY HH:mm'),
                                totalAmount: response.data[i].totalAmount,
                                statusDelivery: response.data[i].statusDelivery,
                                detal: response.data[i].detal
                            }
                            $scope.Order.push(Order)
                        }
                    })
                    .catch(function (error) {
                        console.error('Lỗi khi gọi API:', error);
                    });
                break;
            case 3:
                $http.get(`https://localhost:7272/account/${accountDetal.id}/status/${type}`)
                    .then(function (response) {
                        $scope.Order = []
                        for (var i = 0; i < response.data.length; i++) {
                            var Order = {
                                id: response.data[i].id,
                                idAccount: response.data[i].idAccount,
                                dateTime: moment(response.data[i].dateTime).format('DD/MM/YYYY HH:mm'),
                                totalAmount: response.data[i].totalAmount,
                                statusDelivery: response.data[i].statusDelivery,
                                detal: response.data[i].detal
                            }
                            $scope.Order.push(Order)
                        }
                    })
                    .catch(function (error) {
                        console.error('Lỗi khi gọi API:', error);
                    });
                break;
        }
    }



    $scope.LogOut = function () {
        localStorage.removeItem('Account');
        window.location.href = "./#!/";
        CountItem('ListProduct')
    }

    function CountItem(key) {
        var List = JSON.parse(localStorage.getItem(key));
        if (List == undefined) {
            $rootScope.CountCart = 0;
        }
        else {
            $rootScope.CountCart = List.length
        }
    }

    // đơn hàng chi tiết
    let listReason = [
        { id: 1, contnet: 'Không liên lạc được với khách hàng' },
        { id: 5, contnet: 'Sản phẩm hết hàng' },
        { id: 6, contnet: 'Khách hàng không nhận sản phẩm' }
    ]
    $scope.width = false
    $scope.OrderDetal = function (id) {
        $scope.width = true

        $http.get(`https://localhost:7272/*api/Orders/${id}`)
            .then(function (response) {
                // gắn lại giá trị cho json
                var acc = JSON.parse(localStorage.getItem(response.data[0].idAccount))
                var DetalOre = {
                    id: response.data[0].id,
                    dateTime: moment(response.data[0].dateTime).format('DD/MM/YYYY HH:mm'),
                    totalAmount: response.data[0].totalAmount,
                    statusDelivery: response.data[0].statusDelivery,
                    name: acc.FullName,
                    address: acc.Address,
                    phone: acc.Phone,
                    note: acc.Note
                }
                $scope.DetalOrderById = DetalOre;

                for (let i = 0; i < listReason.length; i++) {
                    if (listReason[i].id == response.data[0].statusOrder) {
                        $scope.reason = listReason[i].contnet;
                    }
                }

            })
            .catch(function (error) {
                console.error('Lỗi khi gọi API:', error);
            });

    }
    $scope.Close = function () {
        $scope.width = false
    }

    // Huỷ đơn hàng 
    $scope.RemoveOrder = function (id) {
        var mes = confirm('Bạn có muốn huỷ đơn hàng này không????')
        if (mes) {
            $http.put(`https://localhost:7272/type/${3}/id/${id}`)
                .then(function (response) {
                    alert("Huỷ đơn hàng thành công!!")
                    LoadForm();
                })
                .catch(function (error) {
                    alert('Không thể cập nhật được sản phẩm')
                })
        }
    }

    // Mua lại đơn hàng
    $scope.MuaLai = function (item) {
        const ListLocal = localStorage.getItem(`Oder/${accountDetal.id}`);
        let List = [];

        if (!ListLocal) {
            for (var i = 0; i < item.length; i++) {
                var Product = {
                    id: item[i].id,
                    name: item[i].name,
                    image: item[i].link[0].link,
                    price: item[i].price,
                    quantity: item[i].quantity,
                    total: item[i].price * item[i].quantity
                }
                List.push(Product);
            }
            localStorage.setItem(`Oder/${accountDetal.id}`, JSON.stringify(List))
            alert('Thêm vào giỏ hàng thành công!!')
        }
        else {
            List = JSON.parse(ListLocal);
            for (let i = 0; i < item.length; i++) {
                let pro = List.find(a => a.id == item[i].id);
                if (!pro) {
                    var Product = {
                        id: item[i].id,
                        name: item[i].name,
                        image: item[i].link[0].link,
                        price: item[i].price,
                        quantity: item[i].quantity,
                        total: item[i].price * item[i].quantity
                    }
                    List.push(Product);
                    localStorage.setItem(`Oder/${accountDetal.id}`, JSON.stringify(List))
                }
                else {
                    // Nếu đã có sản phẩm thì sẽ + thêm số lượng
                    var New = {
                        id: item[i].id,
                        name: item[i].name,
                        image: item[i].link[0].link,
                        price: item[i].price,
                        quantity: pro.quantity + item[i].quantity,
                        total: item[i].price * (pro.quantity + 1)
                    }
                    console.log(New);
                    for (let j = 0; j < List.length; j++) {
                        if (List[j].id == item[i].id) {
                            List[j] = New;
                        }
                    }
                    localStorage.setItem(`Oder/${accountDetal.id}`, JSON.stringify(List))
                }
            }
            alert('Thêm vào giỏ hàng thành công!!!')
        }
        CountItem(`Oder/${accountDetal.id}`)
    }

    // Hàm đếm số lượng
    function CountItem(key) {
        var List = JSON.parse(localStorage.getItem(key));
        if (List == undefined) {
            $rootScope.CountCart = 0;
            $rootScope.Total = 0;

        }
        else {
            $rootScope.CountCart = List.length
        }
    }
});

