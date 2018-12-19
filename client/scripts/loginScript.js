var hashCode = function(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
}

$(document).ready(function(){
    if(localStorage.getItem("Id")){
        window.location = "index.html"
    } 
    else{
            $("#loginButton").on('click', function(e){
            e.preventDefault()
        
            // Store
            localStorage.setItem("Name", $("#name").val())
            localStorage.setItem("Id", hashCode($("#name").val()))
        
            $.ajax({
                url: "http://localhost:3000/api/user/new",
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000"
                },
                type: "POST",
                data: {
                    id  : localStorage.getItem("Id"),
                    name: localStorage.getItem("Name")
                },
                success: function(result){
                    $.ajax({
                        url: "http://localhost:3000/api/expenses/newUser",
                        headers: {
                            "Access-Control-Allow-Origin": "http://localhost:3000"
                        },
                        type: "POST",
                        data: {
                            id  : localStorage.getItem("Id"),
                            name: localStorage.getItem("Name")
                        },
                        success: function(result){
                            window.location= "index.html"
                        },
                        error: function(err){
                            alert(err)
                        }
                    })
                },
                error: function(err){
                    alert(err)
                }
            })
        })
    }
})