
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


    return mol;
})();
$(document).ready(function () {
    Main.init();
});