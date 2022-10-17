"use strict";
//https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage
//https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

//tRY TO MAKE SURE 1 IMAGE PER AREA
//I could also make sure the 

function randomInt(min, max){
    min=Math.ceil(min);
    max=Math.floor(max);
    if (min<0 || max<0){
        FinalMath=Math.ceil(Math.random()*(max-min-1))+min;
    }
    else {
        FinalMath=Math.floor(Math.random()*(max-min+1))+min
    }
    return FinalMath;
}

function uploadImage(uploadedImageArea, endImageArea){
    /*for (var i=0; i<document.getElementById(uploadedImageArea).files.length; i++){
        var file=document.getElementById(uploadedImageArea).files[i]
        if (file){
            var filereader=new FileReader();
            filereader.readAsDataURL(file)
            filereader.addEventListener("load", function() {
                var img='<img src='+filereader.result+' style="max-width:100%;max-height:100%;">'
                console.log(endImageArea)
                document.getElementById(endImageArea).innerHTML+=img
            }, false);
        }
    }*/
    //console.log(uploadedImageArea, endImageArea)
    var file=document.getElementById(uploadedImageArea).files[0] 
    if (file){
        var filereader=new FileReader();
        filereader.readAsDataURL(file)
        filereader.addEventListener("load", function() {
            console.log(document.getElementById(uploadedImageArea))
            if (uploadedImageArea!==36){
            var img='<img src='+filereader.result+' class="image">'
            }
            else{
            var img='<img src='+filereader.result+' class="image" style="height: calc(100vw*.1);">'
            }
            //console.log(endImageArea)
            endImageArea.style.height="100%"
            endImageArea.innerHTML+=img
        }, false);
    }
}

function signIn(username, password, message){
    var username=document.getElementById(username).value
    var password=document.getElementById(password).value
    if (localStorage.getItem(username)==password){
        send("coolfinaltest.html")
    }
    else{
        document.getElementById(message).innerHTML='<span style="color: red;">Incorrect username and password.<span>'
    }
}

function signUp(firstname, lastname, username, password, message, email){
    var firstname=document.getElementById(firstname).value
    var lastname=document.getElementById(lastname).value
    var username=document.getElementById(username).value
    var password=document.getElementById(password).value
    var email=document.getElementById(email).value
    document.getElementById(message).innerHTML=""
    if (username.trim()!=="" && password.trim()!=="" && firstname.trim()!=="" && lastname.trim()!==""){
        if (email.includes("a")){
            if (localStorage.getItem(username)==null){
                localStorage.setItem(username, password);
                send("coolfinaltest.html")
            }
            else{
                document.getElementById(message).innerHTML='<span style="color: red;">Username is already in use, choose a different username.<span>'
            }
        }
        else{
            document.getElementById(message).innerHTML='<span style="color: red;">Write a valid email.<span>'
        }
    }
    else{
        document.getElementById(message).innerHTML='<span style="color: red;">Some of the textboxes are blank.<span>'
    }
}

function deleteAccount(username, password, message){
    var username=document.getElementById(username).value
    var password=document.getElementById(password).value
    if (localStorage.getItem(username)==password){
        localStorage.removeItem(username)
    }
    else{
        document.getElementById(message).innerHTML='<span style="color: red;">Incorrect username and password.<span>'
    }
}

function send(file){
    window.location.href=file
}

function changeWidth(id, howMuch) {
    document.getElementById(id).style.width = howMuch;
}

function editable(trueOrFalse, type){
    const y = document.getElementsByTagName(type);
    for (var i=0; i<y.length; i++){
        if (y[i].getAttribute("class")!=="col-3 border" && y[i].getAttribute("class")!=="row" && y[i].getAttribute("class")!=="border sideRow" && y[i].id!=="mainPage" && y[i].id!=="items" && y[i].id!=="leftSidebarButton" && y[i].id!=="rightSidebarButton"){
            y[i].setAttribute("contenteditable", trueOrFalse)
        }
        else{
            console.log(y[i].getAttribute("class"))
            y[i].setAttribute("contenteditable", !trueOrFalse)
        }
    }
    if (trueOrFalse=="true"){
    document.getElementById("editing").innerHTML="Editing Status: Editing"
    }
    else{
    document.getElementById("editing").innerHTML="Editing Status: Not Editing"
    }
}

var uploadRightNow=true
function uploadToAll(type){
    const y = document.getElementsByTagName(type);
    if (uploadRightNow){
    if (document.getElementById("editing").innerHTML=="Editing Status: Editing"){
        editable('false', 'div')
    }
    for (var i=0; i<y.length; i++){
        if (y[i].getAttribute("class")!=="col-3 border" && y[i].getAttribute("class")!=="row" && y[i].id!=="mainPage" && y[i].id!=="items" && y[i].id!=="editing" && y[i].id!=="container" && y[i].id!=="sideRow" && y[i].id!=="fullPage"){
            console.log(y[i].id)
            //console.log(document.getElementById(y[i].id))
            if (!document.getElementById(y[i].id)){
                y[i].id="cool"+i
            }
            //console.log(document.getElementById(y[i].id))
            //console.log(y[i].id)
            var upload=""+i+","+y[i].id+""
            //console.log(upload)
            //console.log("done")
            y[i].innerHTML+='<input type="file" id="'+i+'" class="cool" accept="image/png, image/jpeg, image/gif" style="color:transparent; width:100%;" onchange="uploadImage('+upload+')"></input>'
        }
        else if (y[i].id=="sideIMG"){
            console.log(y[i].id)
            //console.log(document.getElementById(y[i].id))
            if (!document.getElementById(y[i].id)){
                y[i].id="cool"+i
            }
            //console.log(document.getElementById(y[i].id))
            //console.log(y[i].id)
            var upload=""+i+","+y[i].id+""
            //console.log(upload)
            //console.log("done")
            y[i].innerHTML+='<input type="file" id="'+i+'" class="cool" accept="image/png, image/jpeg, image/gif" style="color:transparent; width:100%;" onchange="uploadImage('+upload+')"></input>'
        }
    }
    var height=document.getElementById("topRow").offsetHeight
    console.log(height+"px")
    document.getElementById("topRow").style.height=height+"px"
    document.getElementById("uploading").innerHTML="Uploading Status: Upload"
    uploadRightNow=false
    }
    else{
        document.getElementById("topRow").style.height="auto"
        var cool=document.getElementsByClassName("cool");
        while (cool.length!==0){
        for (var i=0; i<cool.length; i++){
            cool[i].remove()
        }
        }
        uploadRightNow=true
        document.getElementById("uploading").innerHTML="Uploading Status: Not Upload"
    }
}

function adminPage(){
    if (localStorage.getItem("adminPage:mainPage")!==null){
        document.getElementById("mainPage").innerHTML=localStorage.getItem("adminPage:mainPage")
    }
    if (localStorage.getItem("adminPage:sidebar")!==null){
        document.getElementById("siderow").innerHTML=`<span id="all" class="border sideRow" onclick="colorOfSideRow('all'); menu(allItems);" style="padding: 0.521vw; display: inline-block; color: black;">All Items</span><br>`+localStorage.getItem("adminPage:sidebar")
    }
    if (localStorage.getItem("adminPage:cart")!==null){
        document.getElementById("cart").innerHTML=localStorage.getItem("adminPage:cart")
    }
}

function colorOfSideRow(item){
    var x=document.getElementById("sideRow").getElementsByClassName("sideRow")
    console.log(document.getElementById(item))
    for (var i=0; i<x.length; i++){
        x[i].style.color="grey"
    }
    document.getElementById(item).style.color="black"
}

function submitPage(div){
    stopAllEdit()
    localStorage.setItem('adminPage:mainPage', document.getElementById(div).innerHTML)
    adminPage()
}

function stopAllEdit(){
    if (uploadRightNow==false){
        uploadToAll("div")
    }
    if (document.getElementById("editing").innerHTML=="Editing Status: Editing"){
        editable('false', 'div')
    }
}

function resetPage(){
    localStorage.removeItem("adminPage:mainPage")
    localStorage.removeItem("adminPage:sidebar")
    localStorage.removeItem("adminPage:cart")
    window.location.reload()
}