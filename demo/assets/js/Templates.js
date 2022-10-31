
var Templates = (function () {
    var mol = {}
    mol.init = function () {
        var B = $('body');
        var data = Main.getData();
        var dataFil = data;
        var name = '', language = '', topic = '';
        var show_per_page = 3;
        var pages = 3;
        var current_page = 0;
        var number_of_items = data.length;
        var number_of_pages = Math.ceil(number_of_items / show_per_page);

        rendView(data);
        Main.pagination(data, current_page, show_per_page, pages);

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
                Main.pagination(dataFil, current_page, show_per_page, pages);
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
            Main.pagination(dataFil, current_page, show_per_page, pages);
        })

        B.delegate('#topic', 'change', function (e) {
            topic = e.target.value.trim().toLowerCase();
            dataFil = filData(data, name, language, topic);
            number_of_items = dataFil.length;
            rendView(dataFil);

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