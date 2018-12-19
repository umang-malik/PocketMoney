$(document).ready(function () {
    if(!localStorage.getItem("Id")){
        window.location = "login.html"
    }
    else{
        $('#friendInput').keyup(function(e){
            if(e.keyCode == 13)
            {
                var text = $("#friendInput").val()
                if(!text){
                    $("#friendInput").val("")
                } else{
                    $.ajax({
                        url: "http://localhost:3000/api/user/addFriend",
                        headers: {
                            "Access-Control-Allow-Origin": "http://localhost"
                        },
                        type: "POST",
                        data: {
                            friendName: text,
                            id  : localStorage.getItem("Id")
                        },
                        success: function(result){
                            location.reload(true)
                        },
                        error: function(err){
                            alert(err)
                        }
                    })
                }
            }
          })
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
                    if(result[i]['paidBy'] === localStorage.getItem("Id")){
                        $("#transaction > .collection").append("<li class='collection-item avatar'>\
                        <i class='material-icons circle green' style='font-size: 30px'></i>\
                        <span class='title'>You paid </span>\
                        <p>Rs."+ result[i]['amount']+"<br>\
                        to " + result[i]['paidFor'].join() + " \
                        </p>\
                        </li>")
                    }
                    else {
                        $("#transaction > .collection").append("<li class='collection-item avatar'>\
                        <i class='material-icons circle green' style='font-size: 30px'></i>\
                        <span class='title'>You received </span>\
                        <p>Rs."+result[i]['amount']+"<br>\
                        from " + result[i]['paidBy'] + " \
                        </p>\
                        </li>")
                    }
                }
            },
            error: function(err){
                alert(err)
            }
        })
        }
});