URL = "https://7fe0-14-187-234-242.ngrok-free.app"
document.querySelector("#name").value = "";
document.querySelector("#chattext").value = "";
class Message
{
    constructor(name, message)
    {
        this.name = name;
        this.message = message;
    }


    toString()
    {
        this.message = this.message.replaceAll("<",'&lt;').replaceAll(">","&gt;")
        .replaceAll("\n",'<br>')
        console.log(this.message)
        return `<div class="message"><span>${this.name}</span>:<br>${this.message} <br></div>`;
    }
}


function SetMessage(message)
{

    document.querySelector("#chatbody").innerHTML = message;

}


setInterval(()=>{
    result = fetch(URL+'/get_messages', {
        method: 'GET',
    }).then(respone=>respone.json()).then((result)=>{
        SetMessage(result['val'])

    })
},1500)


document.querySelector('#sendtext').addEventListener('click', ()=>{

    // AddMessage(new Message(
    //     document.querySelector("#name").value,
    //     document.querySelector("#chattext").value))
    myname = document.querySelector("#name").value
    mytext = document.querySelector("#chattext").value
    if (!myname)
    {
        alert("Please enter your name");
        return;
    }
    if (!mytext)
    {
        alert("Please enter a message");
        return;
    }
    fetch(URL, {
    method: "POST",
    body: JSON.stringify({
        value : new Message(
                 myname,
                 mytext).toString()
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    });
});

