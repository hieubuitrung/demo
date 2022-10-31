
var Main = (function () {
    var mol = {}
    mol.init = function () {
        mol.activeMenu();


    }

    mol.activeMenu = function () {
        let u = location.href.split('/');
        console.log(u);
        let page = u[3];
        if (page == "") page = "trang-chu";
        $(".header__menu li a").removeClass('header__menu--highlight');
        $(".header__menu li a[ref='" + page + "']").addClass('header__menu--highlight');
    }

    mol.searchData = function (data, key_w) {
        var dataFil = data;
        if (key_w != '') {
            dataFil = data.filter(function (item) {
                return (item.name.toLowerCase().search(key_w) != -1 ? true : false);
            })
        }
        return dataFil;
    };

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
                <button class="page-link" tabindex="-1">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
            </li>`;
        var html_next = `<li class="page-item next">
                <button class="page-link">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
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
            $('.page-item').addClass('d-none');
        }


    }
    return mol;
})();
$(document).ready(function () {
    Main.init();
});