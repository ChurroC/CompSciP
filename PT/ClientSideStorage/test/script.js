"use strict";
//https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage
//https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

function signIn(username, password, message){
    var username=document.getElementById(username).value
    var password=document.getElementById(password).value
    if (localStorage.getItem(username)==password){
        send("finalHome.html")
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
                send("Finalhome.html")
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

function openSide() {
    document.getElementById("sidebar").style.width = "8.3%";
}
  
function closeSide() {
    document.getElementById("sidebar").style.width = "0%";
}