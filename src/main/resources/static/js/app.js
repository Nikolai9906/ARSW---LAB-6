var app = (function(){
    var name = "";
    var blueprints = []
    var mockdata = apimock.getMockdata()

    getAuthor = function(){
        name = $("#name").val()
        $("#authorTitle").text(name +"'s Blueprints")
        //console.log(name)
    }

    getBlueprints = function(){
        getAuthor();
        //console.log(name)
        //apimock.getBlueprintsByAuthor(name,(err, res) => {
                //console.log(mockdata[name][0]);
                for(let i = 0; i < mockdata[name].length; i++) {
                  var blueprint = {
                    name: mockdata[name][i].author,
                    size: mockdata[name][i].points.length
                }
                console.log(blueprint);
                blueprints.push(blueprint)
                
            }
            console.log(blueprints)
    }
    

    changeName = function(newName){
        name = newName
    }

    getNameAuthorBlueprints = function() {
            getAuthor();
            if (name !== "") {
                apimock.getBlueprintsByAuthor(name, (req, resp) => {
                    //console.log(resp)
                    getData(resp)
                });
            } else {
                alert("Debe ingresar algún nombre, vuelva a intentarlo")
            }
    }

    getData = function(resp){
        $("#tableBlueprints tbody").empty();

        if(resp !== undefined){
            getAuthor()
            var data = resp.map((info) => {
                return {
                    name: info.name,
                    points: info.points.length
                }
            })
            data.map((info) => {
                $("#tableBlueprints > tbody:last").append($("<tr><td>" + info.name +
                                                            "</td><td>" + info.points.toString() +
                                                            "</td><td>" + "button Open" +
                                                            "</td>"))
            })

            var total = data.reduce((value, {points}) =>
                value + points , 0
            )
            $("#userPoints").text(total)
        }
    }


    return{
        getAuthor : getAuthor,
        getBlueprints : getBlueprints,
        changeName: changeName,
        getNameAuthorBlueprints: getNameAuthorBlueprints
    }



})();