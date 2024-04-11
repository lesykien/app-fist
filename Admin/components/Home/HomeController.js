app.controller('HomeController', function ($scope, $http) {
    $scope.lbl_TieuDe = 'Trang chủ'
    // get date now
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    // function get number day in month
    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    let days = [];

    // function lọc thông tin trả về từ sever
    function ListOrderByMonth(List, days) {
        let listOrder = [];
        let listOrderBydate = [];

        // kiểm tra nếu trùng ngày với nhau thì cộng tổng tiền với nhau
        for (let i = 0; i < List.length; i++) {
            const order = listOrder.find(a => a.date == moment(List[i].dateTime).format('D'));
            if (!order) {
                let item = {
                    date: moment(List[i].dateTime).format('D'),
                    totalOrder: List[i].totalAmount,
                }
                listOrder.push(item)
            }
            else {
                let item = {
                    date: moment(List[i].dateTime).format('D'),
                    totalOrder: List[i].totalAmount + order.totalOrder,
                }
                for (let j = 0; j < listOrder.length; j++) {
                    if (listOrder[j].date == moment(List[i].dateTime).format('D')) {
                        listOrder[j] = item;
                    }
                }
            }
        }

        // lấy tổng tiền đơn hàng theo ngày trong tháng
        for (let i = 1; i <= days.length; i++) {
            const item = listOrder.find(a => a.date == i);
            if (item) {
                listOrderBydate.push(item.totalOrder)
            }
            else {
                listOrderBydate.push(0)
            }
        }
        return listOrderBydate
    }
    // get day in month
    const dayInMonth = daysInMonth(mm, yyyy);
    for (let i = 1; i <= dayInMonth; i++) {
        const day = `ngày ${i}`
        days.push(day)
    }

    // get information order
    $http.get(`https://localhost:7272/get-by-date`).then(function (response) {
        let order = ListOrderByMonth(response.data, days)

        // vẽ biểu đồ tổng doanh thu theo tháng
        chartBar(order);
    });

    // vẽ biểu đồ tỉ lệ đơn hàng theo thán
    $http.get(`https://localhost:7272/get-by-month`).then(function (response) {

        const giaoThanhCong = response.data.filter(a => a.statusDelivery == 3).length;
        const huyDon = response.data.filter(a => a.statusDelivery == 5).length;
        const chuaXacNhan = response.data.filter(a => a.statusDelivery == 4).length;

        chartPie(huyDon, giaoThanhCong, chuaXacNhan)
    })

    // lấy thông tin sản phẩm 

    $http.get(`https://localhost:7272/*api/Product/get-pro-oder`).then(function (response) {
        $scope.hotPro = response.data;
    })



    //-------------------------------------------
    // get moth now
    $scope.moth = mm;
    $scope.today = today;
    // draw chart
    function chartBar(data) {
        const ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: days,
                datasets: [{
                    label: `Doanh thu tháng ${mm}`,
                    backgroundColor: 'rgba(95, 184, 47, 0.73)',
                    data: data,
                    borderWidth: 1,
                    borderColor: ' rgb(105, 122, 141)',
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function chartPie(huyDon, giaoThanhCong, chuaXacNhan) {
        Highcharts.chart('container', {
            chart: {
                type: 'pie',
            },
            title: {
                text: `Đơn hàng trong tháng ${mm}`
            },
            plotOptions: {
                series: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: [{
                        enabled: true,
                        distance: 20
                    }, {
                        enabled: true,
                        distance: -40,
                        format: '{point.percentage:.1f}%',
                        style: {
                            fontSize: '1.2em',
                            textOutline: 'none',
                            opacity: 0.7,
                            color: "white",
                            fontSize: '12px'
                        },
                        filter: {
                            operator: '>',
                            property: 'percentage',
                            value: 10,
                        }
                    }]
                }
            },
            series: [
                {
                    name: 'Số lượng đơn',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'Giao không thành công',
                            y: huyDon,
                            color: 'rgb(255, 62, 29)'
                        },
                        {
                            name: 'Xác nhận không thành công',
                            y: chuaXacNhan,
                            color: 'rgb(255, 171, 0)'
                        },
                        {
                            name: 'Giao thành công',
                            y: giaoThanhCong,
                            color: '#5fb82fba',
                        },
                    ]
                }
            ]
        });
    }
});