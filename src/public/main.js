const socket = io();


const title = document.getElementById("title");
const description = document.getElementById("description");
const form = document.getElementById("form");
const notes = document.getElementById("notes");


form.addEventListener("submit", e => {
    e.preventDefault();
    
    socket.emit("client: new note", {
        title: title.value,
        description: description.value
    })
    socket.on("server: newnote", data => {
        console.log(data);
        notes.innerHTML += `
        <div class="card card-body rounded-0">
            <div>
            <h1 class="h3 card-title">${data.title}</h1>
            </div>
            <p>${data.description}</p>
        </div>      
        `;
    })
})
