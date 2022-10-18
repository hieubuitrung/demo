
var TrangChu = (function () {
    var mol = {}
    mol.init = function () {
        //slick
        $('.multiple-items').slick({
            centerMode: true,
            centerPadding: '60px',
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            prevArrow: "<i class='slick-prev fa-solid fa-angle-left'></i>",
            nextArrow: "<i class='slick-next fa-solid fa-angle-right'></i>",
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    


    return mol;
})();
$(document).ready(function () {
    TrangChu.init();
});