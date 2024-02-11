
/* For room.html */

function postMessage(event) {
  event.preventDefault()
  
  room_id = window.location.pathname.split('/')[2];
  comments = document.getElementById("input-box").value;
  // clear the post box once they post soemthing
  document.getElementById("input-box").value= "";

  fetch(`/api/rooms/${room_id}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
      "user-id": WATCH_PARTY_USER_ID,
      "api-key": WATCH_PARTY_API_KEY,
      "room-id": room_id,
     },
    body: JSON.stringify(comments),
     })
     .then(response =>{ if (response.status == 200) {
      getMessages()
      
     }
     else {console.log("error on the returened response")}
})
  
  }


function getMessages() {
  // get room id
  room_id = window.location.pathname.split('/')[2];

  fetch(`/api/rooms/${room_id}/messages`, {
    method: "GET",
    headers: {
      "user-id": WATCH_PARTY_USER_ID,
      "api-key": WATCH_PARTY_API_KEY,
      "room-id": room_id,
    }
  })
    .then(response => response.json())
    .then(messages => buildMessageBody(messages)) 
}




function buildMessageBody(messages) {
  let messagesBlock = document.getElementById("messages_block");

  // clear the page at beginning of each interval so that 
  // the messages don't get repeated on the page each time
  messagesBlock.innerHTML = ""

  messages.forEach(m => {
    let newMessage = document.createElement("message");
    let newAuthor = document.createElement("author");
    let newContent = document.createElement("content");

    newMessage.appendChild(newAuthor);
    newMessage.appendChild(newContent);
    messagesBlock.appendChild(newMessage);

    newContent.textContent = m.body;
    newAuthor.textContent = m.author;
});
}



function startMessagePolling() {
  setInterval(getMessages, 100)
}



function clickEdit(event) {
  document.getElementById("display-id").classList.add("hide");
  document.getElementById("edit-id").classList.remove("hide");
  
}

function clickSave(event) {

  room_id = window.location.pathname.split('/')[2];
  new_name = document.getElementById("input-value").value;
  document.getElementById("edit-id").classList.add("hide");
  document.getElementById("display-id").classList.remove("hide");

  fetch(`/api/rooms/${room_id}/name`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
      "user-id": WATCH_PARTY_USER_ID,
      "api-key": WATCH_PARTY_API_KEY,
      "room-id": room_id
     },
    body: JSON.stringify(new_name),
     }).then(response => { if (response.status == 200) {
      document.getElementById("room-name-span").innerHTML = new_name;
      
     }
     else {console.log("not a valid user")}})
  }
  



/* For profile.html */

function updateUsername(event) {
  event.preventDefault()
  newName = document.getElementById("username-input").value;

  fetch(`/api/profile/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
      "user-id": WATCH_PARTY_USER_ID,
      "user-name": newName,
      "api-key": WATCH_PARTY_API_KEY,
     },
     }).then(response => { if (response.status == 200) {
      console.log(response)
      console.log("your username has been updated")
      
     }
     else {console.log("not a valid user; consider making an account before updating your information")}})
}


function updatePassword(event) {
  event.preventDefault()
  newPass = document.getElementById("password-input").value;
  user = document.getElementById("username-input").value;

  fetch(`/api/profile/password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
      "user-id": WATCH_PARTY_USER_ID,
      "password": newPass,
      "username": user,
      "api-key": WATCH_PARTY_API_KEY,
     },
     }).then(response => { if (response.status == 200) {
      console.log("your password has been updated")
      
     }
     else {console.log("not a valid user; consider making an account before updating your information")}})
}






// "GET" retrieves info from a database
// "Post" adds info to the database
// patch = appends the database
// delete - delete from the database 

