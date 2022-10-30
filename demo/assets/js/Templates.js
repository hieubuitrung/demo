
var Templates = (function () {
    var mol = {}
    mol.init = function () {
        var B = $('body');
        var data = mol.getData();
        var dataFil = data;
        var name = '', language = '', topic = '';
        var show_per_page = 6;
        var pages = 3;
        var current_page = 0;
        var number_of_items = data.length;
        var number_of_pages = Math.ceil(number_of_items / show_per_page);

        rendView(data);
        mol.pagination(data, current_page, show_per_page, pages);

        B.delegate('#name-form', 'keydown', function (e) {
            name = e.target.value.trim().toLowerCase();
            // lấy code của phím enter
            var keycode = (e.keyCode ? e.keyCode : e.which);
            if (keycode == '13') {
                // dùng filter để lọc data
                dataFil = filData(data, name, language, topic);
                number_of_items = dataFil.length;
                rendView(dataFil);

                // phân trang
                current_page = 0;
                $('.page-item.next').removeClass('disabled');
                mol.pagination(dataFil, current_page, show_per_page, pages);
            }
        })

        B.delegate('#language', 'change', function (e) {
            
            language = e.target.value.trim().toLowerCase();
            dataFil = filData(data, name, language, topic);
            number_of_items = dataFil.length;
            rendView(dataFil);

            // phân trang
            current_page = 0;
            $('.page-item.next').removeClass('disabled');
            mol.pagination(dataFil, current_page, show_per_page, pages);
        })

        B.delegate('#topic', 'change', function (e) {
            topic = e.target.value.trim().toLowerCase();
            dataFil = filData(data, name, language, topic);
            number_of_items = dataFil.length;
            rendView(dataFil);

            // phân trang
            current_page = 0;
            $('.page-item.next').removeClass('disabled');
            mol.pagination(dataFil, current_page, show_per_page, pages)
        })

        B.delegate('.page-item.prev', 'click', function (e) {
            //number_of_pages = Math.ceil(number_of_items / show_per_page);

            if (current_page > 0) {
                current_page--;
                $('.page-item.next').removeClass('disabled');
                mol.pagination(dataFil, current_page, show_per_page, pages);
            } else {
                
            }
        })

        B.delegate('.page-item.next', 'click', function (e) {
            number_of_pages = Math.ceil(number_of_items / show_per_page);
            // xử lý chuyển trang
            if (current_page < number_of_pages - 1) {
                current_page++;
                $('.page-item.prev').removeClass('disabled');
                mol.pagination(dataFil, current_page, show_per_page, pages);
            } else {
               
            }
        })

        B.delegate('.page-item.page', 'click', function (e) {
            current_page = parseInt($(this).attr('value'));
            mol.pagination(dataFil, current_page, show_per_page, pages);
        })

    }

    mol.getData = function () {
        var data = '';
        $.ajax({
            async: false,
            type: 'GET',
            dataType: "json",
            url: "https://634388b23f83935a7854d4e6.mockapi.io/api/forms",
            success: function (d) {
                data = d;
            },
            error: function () {
                alert('error');
            }
        })
        return data;
    }

    // phân trang
    mol.pagination = function (data, current_page, show_per_page, pages) {
        var number_of_pages = Math.ceil(data.length / show_per_page);

        // css for item template
        $('.templates__forms__group--item').addClass('d-none').slice(current_page * show_per_page, (current_page + Math.floor(pages / 2)) * show_per_page).removeClass('d-none');

        var html_prev = `<li class="page-item prev">
                <button class="page-link" tabindex="-1">Previous</button>
            </li>`;
        var html_next = `<li class="page-item next">
                <button class="page-link">Next</button>
            </li>`;

        // rend number_page
        var html_pages = ``;
        for (var i = 0; i < number_of_pages; i++) {
            html_pages += `<li class="page-item page" value="${i}"><a class="page-link">${i + 1}</a></li>`;
        }
        $('#page_navigation').html(html_prev + html_pages + html_next);

        $('.page-item').removeClass('active d-none');

        // xử lý css cho pagination
        if (number_of_pages > 0) {

            $('.page-item.page').eq(current_page).addClass('active')


            if (number_of_pages <= pages) {
                // khi số trang <= pages
                $('.page-item.prev').addClass('d-none');
                $('.page-item.next').addClass('d-none');
            } else {
                // khi số trang > pages
                // css cho nút prev và next
                if (current_page == 0) {
                    $('.page-item.prev').addClass('disabled');
                    $('.page-item.page').addClass('d-none').slice(current_page, current_page + pages).removeClass('d-none');
                } else if (current_page >= number_of_pages - Math.floor(pages / 2)) {
                    $('.page-item.next').addClass('disabled');
                    $('.page-item.page').addClass('d-none').slice(current_page - Math.ceil(pages / 2), number_of_pages).removeClass('d-none');
                } else {
                    $('.page-item.page').addClass('d-none').slice(current_page - Math.floor(pages / 2), current_page + Math.ceil(pages / 2)).removeClass('d-none');
                }
            }
        } else {
            // nếu số page = 0 ẩn hết
            console.log('0');
            $('.page-item').addClass('d-none');
        }
        
        
    }

    return mol;
})();

function filData(data, name, language, topic) {
    var dataFil = data;
    if (name != '') {
        dataFil = data.filter(function (item) {
            return (item.name.toLowerCase().search(name) != -1 ? true : false);
        })
    }
    if (language != '') {
        dataFil = dataFil.filter(function (item) {
            return (item.language.toLowerCase().search(language) != -1 ? true : false);
        })
    }
    if (topic != '') {
        dataFil = dataFil.filter(function (item) {
            return (item.topic.toLowerCase().search(topic) != -1 ? true : false);
        })
    }
    console.log(dataFil);
    return dataFil;
}

function rendView(data) {
    var html = data.map(x => {
        // for (var item in x) alert(item + "==>" + x[item]);
        return `<div class="col-xl-4 templates__forms__group--item">
                    <div>
                        <div style="background-image: url('${x.image}')">
                            <div class="overlay">
                                <a class="preview" href="">
                                    <i class="fa-solid fa-eye"></i>
                                    Xem trước
                                </a>
                                <a class="use" href="">
                                    <i class="fa-solid fa-pen"></i>
                                    Dùng mẫu này
                                </a>
                            </div>
                        </div>
                        <a href="">${x.name}</a>
                    </div>
                </div>`;

    });
    $(".templates__forms__group").html(html.join(''));
}

$(document).ready(function () {
    Templates.init();
});