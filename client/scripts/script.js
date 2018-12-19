$(document).ready(function () {
    if(!localStorage.getItem("Id")){
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
            for(var i=0; i<result.length; i++){
                $("#friends > .collection").append("<li class='collection-item avatar'>\
                <img src = 'https://www.gravatar.com/avatar/" + result[i]['Id'] + "?d=robohash' style=\"background-color: white; \"' class='circle'>\
                <span class='title'>"+result[i].Name+" owes you </span>\
                <p>" + "Rs."+result[i]['currBalance']+ "\
                </p>\
              </li>")
            }
        },
        error: function(err){
            alert(err)
        }
    })

    $.ajax({
        url: "http://localhost:3000/api/user/transactions",
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000"
        },
        type: "POST",
        data: {
            id  : localStorage.getItem("Id"),
        },
        success: function(result){
            console.log(result)
            for(var i=0;i<result.length;i++){
                $("#transaction > .collection").append("<li class='collection-item avatar'>\
                <i class='material-icons circle green' style='font-size: 30px'></i>\
                <span class='title'></span>\
                <p>Rs."+result[i]['amount']+"<br>\
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