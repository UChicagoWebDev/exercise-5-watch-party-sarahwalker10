
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
     }).then(document.getElementById("room-name-span").innerHTML = new_name);

}



//alternate way to add event listeners to the edit and save buttons
//need to be defined outside the function so they are set immediately on the page load
// without having to call a function

// getElementById("edit-button").addEventListner("click", function (e){
//   getElementById("display-id").removeAttribute("class").addAttribute("class", "display hide");
//   getElementById("edit-id").removeAttribute("class").addAttribute("class", "edit");
// })

// getElementById("save-button").addEventListner("click", function (e){
//   new_name = getElementById("input-value").value
//   getElementById("room-name-span").innerHTML = new_name;
//   getElementById("edit-id").removeAttribute("class").addAttribute("class", "display");
//   getElementById("display-id").removeAttribute("class").addAttribute("class", "edit hide");

// })








// "GET" retrieves info from a database
// "Post" adds info to the database
// patch = appends the database
// delete - delete from the database 

