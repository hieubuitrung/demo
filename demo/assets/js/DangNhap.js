var DangNhap = (function () {
    var mol = {}
    mol.init = function () {
        var B = $('body');
        var isKeyupEmail = 0, isKeyupPassword = 0;
        var isEmailOk = 0, isPasswordOk = 0;
        var regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        var regexPassword = /^[a-zA-Z0-9]{8,}$/


        B.delegate("#email", "blur", function () {
            if (!isKeyupEmail) {
                isEmailOk = checkInput(regexEmail, $(this));
                isKeyupEmail = 1;
            }
        })

        B.delegate("#email", "keyup", function () {
            if (isKeyupEmail) {
                isEmailOk = checkInput(regexEmail, $(this));
            }
        })

        B.delegate("#password", "blur", function () {
            isPasswordOk = checkInput(regexPassword, $(this));
            isKeyupPassword = 1;
        })

        B.delegate("#password", "keyup", function () {
            if (isKeyupPassword) {
                isPasswordOk = checkInput(regexPassword, $(this));
            }
        })

        B.delegate("#btn-login", "click", function () {
            let email = $("#email");
            let password = $("#password");
            isEmailOk = checkInput(regexEmail, email);
            isPasswordOk = checkInput(regexPassword, password);
            if (isEmailOk && isPasswordOk) {
                // đăng nhập nhưng không ghi nhớ tài khoản
                var isMemorizeLogin = $('#memorize-login').prop('checked');
                if (isMemorizeLogin) {
                    // đăng nhập nhưng ghi nhớ tài khoản
                    setCookie(email.attr('name'), email.val(), 30);
                    setCookie(password.attr('name'), password.val(), 30);
                } else {
                    // user bỏ checked ghi nhớ tài khoản
                    removeCookie(email.attr('name'));
                    removeCookie(password.attr('name'));
                }
            } 
        })


    };

    function checkInput(regex, element) {
        var test = regex.test(element.val());
        if (test) {
            element.css("border-color", "#519546");
            return 1;
        } else {
            element.css("border-color", "red");
            return 0;
        }
    }

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        // thêm dấu = để khi lấy value ko có dấu = đằng trước
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function removeCookie(cname) {
        let name = cname + "=";
        document.cookie = `${name}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    mol.rendAccInfo = function () {
        var email = getCookie($('#email').attr('name'));
        var password = getCookie($('#password').attr('name'));
        if (email && password) {
            $('#email').val(email);
            $('#password').val(password);
            $('#memorize-login').prop('checked', true);
        }
    }


    return mol;
})();
$(document).ready(function () {
    DangNhap.rendAccInfo();
    DangNhap.init();
});