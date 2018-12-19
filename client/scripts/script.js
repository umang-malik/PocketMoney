$(document).ready(function () {
    if(localStorage.getItem("Id").length == 0){
        window.location = "login.html"
    }
    $("#userName").html(localStorage.getItem("Name"))
    $(".button-collapse").sideNav()

    $.ajax({
        url: "http://localhost:3000/api/user/friends",
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000"
        },
        type: "POST",
        data: {
            id  : localStorage.getItem("Id"),
        },
        success: function(result){
            for(friend in result){
                $("#friends > .collection").append("<li class='collection-item avatar'>\
                <img src = 'https://www.gravatar.com/avatar/" + friend['Id'] + "?d=robohash' style=\"background-color: white; \">' class='circle'>\
                <span class='title'>Title</span>\
                <p>First Line <br>\
                   Second Line\
                </p>\
              </li>")
            }
        },
        error: function(err){
            alert(err)
        }
    })
});