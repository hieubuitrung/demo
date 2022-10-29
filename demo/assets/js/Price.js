
var Price = (function () {
    var mol = {}
    mol.init = function () {
        var B = $('body');
        var type = 1;
        var data = Templates.getData();
         
        data = sort(data, 'name');
        rendTable(data);

        B.delegate('.sort', 'click', function () {
            var by = $(this).attr('v');
            $('.sort').attr('style', 'opacity: .5;');
            $(this).attr('style', 'opacity: 1;');
            data = sort(data, by, type);
            rendTable(data);
            type == 1 ? type = 0 : type = 1;
        })

    }

    return mol;
})();

function sort(data, by, type = 0) {
    data.sort((a, b) => {
        if (type == 0) {
            if (by == 'price') {
                return a.price - b.price;
            } else {
                return a.name.localeCompare(b.name);
            }
        } else {
            if (by == 'price') {
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