$(document).ready(function () {
    if(!localStorage.getItem("Id")){
        window.location = "login.html"
    }
    $("#userName").html(localStorage.getItem("Name"))
    $(".button-collapse").sideNav()

    $.ajax({
        url: "http://localhost:3000/api/expenses/view",
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000"
        },
        type: "POST",
        data: {
            id  : localStorage.getItem("Id"),
        },
        success: function(result){
            for(var i=0; i<result.length; i++){
                $("#expenses > .collection").append("<li class='collection-item avatar'>\
                <span class='title'> Spent Rs."+result[i].amount+" </span>\
                <p>" +" on "+ result[i].category + "(" + result[i].comment + ")"+ "<br>\
                " + result[i].timestamp+ "</p>\
              </li>")
            }
        },
        error: function(err){
            alert(err)
        }
    })

});