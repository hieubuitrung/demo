
var Price = (function () {
    var mol = {}
    mol.init = function () {
        var B = $('body');
        var type = 1;
        var sort_by;
        var data = Main.getData();
        var dataFil = data;

        var show_per_page = 3;
        var pages = 3;
        var current_page = 0;
        var number_of_items = data.length;
        var number_of_pages = Math.ceil(number_of_items / show_per_page);

        rendTable(dataFil);
        Main.pagination(data, current_page, show_per_page, pages);

        B.delegate('.sort', 'click', function () {
            //thay doi trang thai sort
            type == 1 ? type = 0 : type = 1;

            sort_by = $(this).attr('v');
            $('.sort').attr('style', 'opacity: .5;');
            $(this).attr('style', 'opacity: 1;');
            dataFil = sort(dataFil, sort_by, type);
            number_of_items = dataFil.length;
            rendTable(dataFil);

            // phân trang
            current_page = 0;
            $('.page-item.next').removeClass('disabled');
            Main.pagination(dataFil, current_page, show_per_page, pages);
        })

        B.delegate('#btn-search', 'click', function () {
            var key_w = $('#key-word').val();
            console.log(key_w)
            dataFil = Main.searchData(data, key_w);
            dataFil = sort(dataFil, sort_by, type);
            number_of_items = dataFil.length;
            rendTable(dataFil);

            // phân trang
            current_page = 0;
            $('.page-item.next').removeClass('disabled');
            Main.pagination(dataFil, current_page, show_per_page, pages)
        })

        B.delegate('.page-item.prev', 'click', function (e) {
            //number_of_pages = Math.ceil(number_of_items / show_per_page);

            if (current_page > 0) {
                current_page--;
                $('.page-item.next').removeClass('disabled');
                Main.pagination(dataFil, current_page, show_per_page, pages);
            } else {

            }
        })

        B.delegate('.page-item.next', 'click', function (e) {
            number_of_pages = Math.ceil(number_of_items / show_per_page);
            // xử lý chuyển trang
            if (current_page < number_of_pages - 1) {
                current_page++;
                $('.page-item.prev').removeClass('disabled');
                Main.pagination(dataFil, current_page, show_per_page, pages);
            } else {

            }
        })

        B.delegate('.page-item.page', 'click', function (e) {
            current_page = parseInt($(this).attr('value'));
            Main.pagination(dataFil, current_page, show_per_page, pages);
        })

    }

    

    return mol;
})();

//sắp xêp table 
function sort(data, sort_by, type = 0) {
    data.sort((a, b) => {
        if (type == 0) {
            if (sort_by == 'price') {
                return a.price - b.price;
            } else {
                return a.name.localeCompare(b.name);
            }
        } else {
            if (sort_by == 'price') {
                return b.price - a.price;
            } else {
                return b.name.localeCompare(a.name);
            }
        }
    });
    return data;
}


function rendTable(data) {
    var stt = 1;
    var html = data.map(x => {
        return `<tr class="templates__forms__group--item">
                    <th scope="row">${stt++}</th>
                    <td>
                        <img type="button" data-toggle="modal" data-target=".bd-example-modal-lg" src="${x.image}">
                    </td>
                    <td>${x.name}</td>
                    <td>${x.topic}</td>
                    <td>${x.price}</td>
                    <td>
                        <button class="btn">Mua</button>
                    </td>
                </tr>`;

    });
    $(".price__table tbody").html(html.join(''));
}

$(document).ready(function () {
    Price.init();
});