var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/59f17df94854b82732ff7b7b/default';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
})();

//Validation For User SignIn Form
$(document).ready(function () {
    if ($('form#signInForm').length) {

        $.fn.showSignInMessage = function(errorMessage, succMessage, userId) {
            if(errorMessage) {
                $("#errorMsg").html(errorMessage);
                $("#errorMsg").show();
                $('#userid').val(userId);
            }
            if(succMessage) {
                $("#successMsg").html(succMessage);
                $("#successMsg").show();
                $('#userid').val(userId);
            }
        };

        $.fn.validateSignInForm = function() {

            //Validation for Email:
            if ($('#userid').val() == "") {
                $('#errorMsg').html("Error: Please enter email address or user id");
                $('#errorMsg').css('display','block');
                $('#userid').focus();
                return false;
            } else {
                var userIdCheck = /[^A-Z0-9]/;
                var userid = $('#userid').val();
                if (userIdCheck.test(userid)) {
                    var email = $('#userid').val();
                    var mailformat = /^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z-]+\.)+[a-zA-Z]{2,15}$/i;
                    if(!email.match(mailformat)) {
                        $('#errorMsg').html("Error: Please enter a valid email address.");
                        $('#errorMsg').css('display','block');
                        $('#userid').focus();
                        $('#userid').select();
                        return false;
                    }
                } else {
                    if (userid.length != 10) {
                        $('#errorMsg').html("Error: Invalid user id");
                        $('#errorMsg').css('display','block');
                        $('#userid').focus();
                        return false;
                    }
                }
            }

            //Validation for Password:
            if ($('#password').val() == "") {
                $('#errorMsg').html("Error: Please enter Password");
                $('#errorMsg').css('display','block');
                $('#password').focus();
                return false;
            } else {
                var pass = $('#password').val();
                $('#userid').val(userid.trim());
                return true;
            }
        };
    }
});
