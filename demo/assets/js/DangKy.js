var DangKy = (function () {
    var mol = {}
    mol.init = function () {
        var B = $('body');
        var isKeyupName = 0, isKeyupEmail = 0, isKeyupPhone = 0, isKeyupCompany = 0, isKeyupAddress = 0;
        var isNameOk = 0, isEmailOk = 0, isPhoneOk = 0, isCompanyOk = 0, isAddressOk = 0;
        const regexName = /^([aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+(\s?))+$/
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const regexPhone = /(^(09|03|07|08|05)([0-9]{8})$)/g
        const regexCompany = /^([aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+(\s?))+$/
        const regexAddress = /^([aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+(\s?))+$/

        B.delegate("#sign-up__form--name", "blur", function () {
            if (!isKeyupName) {
                isNameOk = checkInput(regexName, $(this));
                isKeyupName = 1;
            }
        })

        B.delegate("#sign-up__form--name", "keyup", function () {
            if (isKeyupName) {
                isNameOk = checkInput(regexName, $(this));
            }
        })

        B.delegate("#sign-up__form--email", "blur", function () {
            isEmailOk = checkInput(regexEmail, $(this));
            isKeyupEmail = 1;
        })

        B.delegate("#sign-up__form--email", "keyup", function () {
            if (isKeyupEmail) {
                isEmailOk = checkInput(regexEmail, $(this));
            }
        })

        B.delegate("#sign-up__form--phone", "blur", function () {
            isPhoneOk = checkInput(regexPhone, $(this));
            isKeyupPhone = 1;
        })

        B.delegate("#sign-up__form--phone", "keyup", function () {
            if (isKeyupPhone) {
                isPhoneOk = checkInput(regexPhone, $(this));
            }
        })

        B.delegate("#sign-up__form--company", "blur", function () {
            isCompanyOk = checkInput(regexCompany, $(this));
            isKeyupCompany = 1;
        })

        B.delegate("#sign-up__form--company", "keyup", function () {
            if (isKeyupCompany) {
                isCompanyOk = checkInput(regexCompany, $(this));
            }
        })

        B.delegate("#sign-up__form--address", "blur", function () {
            isEmailOk = checkInput(regexAddress, $(this));
            isKeyupAddress = 1;
        })

        B.delegate("#sign-up__form--address", "keyup", function () {
            if (isKeyupAddress) {
                isEmailOk = checkInput(regexAddress, $(this));
            }
        })

        B.delegate("#btnDangKy", "click", function () {
            console.log("btn")
            let name = $("#sign-up__form--name");
            let email = $("#sign-up__form--email");
            let phone = $("#sign-up__form--phone");
            let company = $("#sign-up__form--company");
            let address = $("#sign-up__form--address");

            isNameOk = checkInput(regexName, name);
            isEmailOk = checkInput(regexEmail, email);
            isPhoneOk = checkInput(regexPhone, phone);
            isCompanyOk = checkInput(regexCompany, company);
            isAddressOk = checkInput(regexAddress, address);

            if (isNameOk && isEmailOk && isPhoneOk && isCompanyOk && isAddressOk) {
                // xu ly du lieu dang ky
                alert("Dang ky thanh cong");
            }
        })


    };

    function checkInput(regex, element) {
        var test = regex.test(element.val());
        if (test) {
            element.css("border-color", "transparent transparent #519546 transparent");
            return 1;
        } else {
            element.css("border-color", "transparent transparent red transparent");
            return 0;
        }
    }



    return mol;
})();
$(document).ready(function () {
    DangKy.init();
});