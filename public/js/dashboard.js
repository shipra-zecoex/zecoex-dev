var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/59f17df94854b82732ff7b7b/default';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
})();

$(document).ready(function () {

    $.fn.loadDashboard = function (fullName) {
        $('ul li#loggedInUserName').html(fullName);
    }

});