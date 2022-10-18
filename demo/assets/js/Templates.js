var Templates = (function () {
    var mol = {}
    mol.init = function () {
        var B = $('body');
        var current_page = 1;
        var record_per_page = 3;
        var dt = mol.getData();
        var data = mol.getDataPagination(current_page, record_per_page);
        var dtFil = dt;

        rendView(data);
        showPages(dt, current_page, record_per_page);

        B.delegate('#name-form', 'keydown', function (e) {
            //var dtFilter = [];
            var val = e.target.value.trim().toLowerCase();
            // lấy code của phím enter
            var keycode = (e.keyCode ? e.keyCode : e.which);
            if (keycode == '13') {
                // dùng filter để lọc data
                dtFil = dtFil.filter(function (item) {
                    return (item.name.toLowerCase().search(val) != -1 ? true : false);
                })
                data = mol.getDataPagination(current_page, record_per_page);
                rendView(data);
                showPages(dtFil, current_page, record_per_page);
            }
        })

        B.delegate('#language', 'change', function (e) {
            //var dtFilter = [];
            var val = e.target.value.trim().toLowerCase();
            if (val.length === 0) {
                dtFil = dt;
            } else {
                dtFil = dt.filter(function (item) {
                    return (item.language.toLowerCase().search(val) != -1 ? true : false);
                })
            }

            data = mol.getDataPagination(current_page, record_per_page);
            rendView(data);
            showPages(dtFil, current_page, record_per_page);
        })

        B.delegate('#topic', 'change', function (e) {
            //var dtFilter = [];
            var val = e.target.value.trim().toLowerCase();
            if (val.length === 0) {
                dtFil = dt;
            } else {
                dtFil = dtFil.filter(function (item) {
                    return (item.topic.toLowerCase().search(val) != -1 ? true : false);
                })
            }
            console.log(val);

            data = mol.getDataPagination(current_page, record_per_page);
            rendView(data);
            showPages(dtFil, current_page, record_per_page);
        })

        B.delegate('li.prev', 'click', function () {
            if (current_page > 1) {
                current_page = current_page-- > 0 ? current_page-- : 1;
                data = mol.getDataPagination(current_page, record_per_page);
                rendView(data);
                showPages(dtFil, current_page, record_per_page);
                
            }
        })

        B.delegate('li.next', 'click', function () {
            if (current_page < Math.ceil(dtFil.length / record_per_page)) {
                current_page = current_page++ < dtFil.length ? current_page++ : current_page;
                data = mol.getDataPagination(current_page, record_per_page);
                rendView(data);
                showPages(dtFil, current_page, record_per_page);
            }
        })

        B.delegate('.pagination li[class=page-item]', 'click', function () {
            current_page = parseInt($(this).attr('value'));
            data = mol.getDataPagination(current_page, record_per_page);
            rendView(data);
            showPages(dtFil, current_page, record_per_page);
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

    // lấy data giới hạn theo page
    mol.getDataPagination = function (page, limit) {
        var data = '';
        $.ajax({
            async: false,
            type: 'GET',
            dataType: "json",
            url: `https://634388b23f83935a7854d4e6.mockapi.io/api/forms?page=${page}&limit=${limit}`,
            success: function (d) {
                console.log(d);
                data = d;
            },
            error: function () {
                alert('error');
            }
        })
        return data;
    }
})();


function showPages(dt, current_page, record_per_page) {
    var num_pages = Math.ceil(dt.length / record_per_page);
    var items = 3;
    var li_tag = '';
    var html = '';
    if (current_page <= Math.ceil(items / 2)) {
        for (var i = 1; i <= items; i++) {
            li_tag += `<li class="page-item" value="${i}">
                        <a class="page-link">${i}</a>
                    </li>`;
        }
    } else if (current_page > num_pages - Math.floor(items / 2)) {
        for (var i = current_page - Math.ceil(items / 2); i <= num_pages; i++) {
            li_tag += `<li class="page-item" value="${i}">
                        <a class="page-link">${i}</a>
                    </li>`;
        }
        
    } else {
        for (var i = current_page - Math.floor(items / 2); i <= current_page + Math.floor(items / 2); i++) {
            li_tag += `<li class="page-item" value="${i}">
                        <a class="page-link">${i}</a>
                    </li>`;
        }
    }
    html = `<li class="page-item prev">
                <span class="page-link" tabindex="-1">Previous</span>
            </li>`
        + li_tag +
        `<li class="page-item next">
                <span class="page-link">Next</span>
            </li>`;
    $(".pagination").html(html);

    //xử lý add class active
    var pages = $(".pagination li[class=page-item]");
    pages.each(function () {
        if ($(this).attr('value') == current_page) {
            $(this).addClass('active');
        }
    })

    //add class disabled
    if (current_page === 1 && current_page === num_pages) {
        $('.prev').addClass('disabled');
        $('.next').addClass('disabled');
    } else if (current_page === 1) {
        $('.prev').addClass('disabled');
        $('.next').removeClass('disabled');
    } else if (current_page === num_pages) {
        $('.prev').removeClass('disabled');
        $('.next').addClass('disabled');
    }

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