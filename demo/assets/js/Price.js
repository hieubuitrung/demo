
var Price = (function () {
    var mol = {}
    mol.init = function () {
        var B = $('body');
        var type = 1;
        var sort_by;
        var data = Templates.getData();
        var dataFil = data;
        rendTable(dataFil);

        B.delegate('.sort', 'click', function () {
            //thay doi trang thai sort
            type == 1 ? type = 0 : type = 1;

            sort_by = $(this).attr('v');
            $('.sort').attr('style', 'opacity: .5;');
            $(this).attr('style', 'opacity: 1;');
            dataFil = sort(dataFil, sort_by, type);
            rendTable(dataFil);

        })

        B.delegate('#btn-search', 'click', function () {
            var key_w = $('#key-word').val();
            console.log(key_w)
            dataFil = mol.searchData(data, key_w);
            dataFil = sort(dataFil, sort_by, type);
            rendTable(dataFil);
        })

    }

    mol.searchData = function(data, key_w) {
        var dataFil = data;
        if (key_w != '') {
            dataFil = data.filter(function (item) {
                return (item.name.toLowerCase().search(key_w) != -1 ? true : false);
            })
        }
        return dataFil;
    };

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
        return `<tr>
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