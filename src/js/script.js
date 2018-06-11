window.onload = function() {
    $.ajax({
        url: "/data",
        success: function(str) {
            console.log(str);
        }
    })
}