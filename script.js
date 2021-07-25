// Client ID and API key from the Developer Console
var CLIENT_ID = '563003286073-gr2eneupho1de3k89m9seokolgti9ho8.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCXeHTF9oWKhKfPh-g3ATKB8q9U8tRpObI';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly'

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');


/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function (error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        $('#compose-button').removeClass("hidden");
        loadGmailApi();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

function loadGmailApi() {
    gapi.client.load('gmail', 'v1', displayInbox);
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}


function displayInbox() {
    maketable()
    makeoptions()
    composemail()

    var request = gapi.client.gmail.users.messages.list({
        'userId': 'me',
        'labelIds': 'INBOX',
        'maxResults': 20
    });

    request.execute(function (response) {
        $.each(response.messages, function () {
            var messageRequest = gapi.client.gmail.users.messages.get({
                'userId': 'me',
                'id': this.id
            });

            messageRequest.execute(appendMessageRow);
        });
    });
}


function maketable(){
    var tb=document.createElement("table")
        tb.className="table table-striped table-inbox hidden"
        tb.id="maintable"
        document.getElementById("c2").appendChild(tb)

        var tbh=document.createElement("thead")
        tbh.id="thead"
        document.getElementById("maintable").appendChild(tbh)

        var y = document.createElement("tr");
        y.style.border="solid black 1px"
        y.id="rh"
        document.getElementById("thead").appendChild(y);



        var z = document.createElement("th");
        z.innerText="From"
        z.style.textAlign="center"
        document.getElementById("rh").appendChild(z)

        var z = document.createElement("th");
        z.innerText="To"
        z.style.textAlign="center"
        document.getElementById("rh").appendChild(z)

        var z = document.createElement("th");
        z.innerText="Subject"
        z.style.textAlign="center"
        document.getElementById("rh").appendChild(z)

        var z = document.createElement("th");
        z.innerText="Time"
        z.style.textAlign="center"
        document.getElementById("rh").appendChild(z)

        var tbh=document.createElement("tbody")
        tbh.id="tbody"
        document.getElementById("maintable").appendChild(tbh)


}

function makeoptions(){


    var div=document.createElement("div")
    div.className="mbt"
    div.innerText="Inobx"
    div.style.padding="10px"
    div.style.textAlign="center"
    div.style.backgroundColor="lightgrey"
    div.style.borderBottom="solid black"
    div.setAttribute('onclick','showInb()')
    document.getElementById("c1").appendChild(div)

    var div=document.createElement("div")
    div.className="mbt"
    div.innerText="Sent"
    div.style.padding="10px"
    div.style.textAlign="center"
    div.style.backgroundColor="lightgrey"
    div.style.borderBottom="solid black"
    div.setAttribute('onclick','showSent()')
    document.getElementById("c1").appendChild(div)

    var div=document.createElement("div")
    div.className="mbt"
    div.innerText="Draft"
    div.style.padding="10px"
    div.style.textAlign="center"
    div.style.backgroundColor="lightgrey"
    div.style.borderBottom="solid black"
    div.setAttribute('onclick','showDraft()')
    document.getElementById("c1").appendChild(div)

    var div=document.createElement("div")
    div.className="mbt"
    div.innerText="Outbox"
    div.style.padding="10px"
    div.style.textAlign="center"
    div.style.backgroundColor="lightgrey"
    div.style.borderBottom="solid black"
    document.getElementById("c1").appendChild(div)
    
}

function appendMessageRow(message) {
    
    //console.log(message)
    header=(message.payload.headers)
    //console.log(header)

    header.forEach(element => {
        if (element.name=="From")
            res1=element.value
        if (element.name=="To")
            res4=element.value
        if (element.name=="Subject")
            res2=element.value
        if (element.name=="Date")
            res3=element.value 

        
    });
    // console.log(res1)
    // console.log(res2)
    // console.log(res3)

        

        var y = document.createElement("tr");
        y.style.border="solid black 1px"
        document.getElementById("tbody").appendChild(y);

        var z = document.createElement("td");
        var t = document.createTextNode(res1);
        z.style.border="solid black 1px"
        z.appendChild(t);
        y.appendChild(z);

        var z = document.createElement("td");
        var t = document.createTextNode(res4);
        z.style.border="solid black 1px"
        z.appendChild(t);
        y.appendChild(z);

        var z = document.createElement("td");
        var t = document.createTextNode(res2);
        z.style.border="solid black 1px"
        z.appendChild(t);
        y.appendChild(z);

        var z = document.createElement("td");
        var t = document.createTextNode(res3);
        z.style.border="solid black 1px"
        z.appendChild(t);
        y.appendChild(z);

}


function showSent(){

    document.getElementById("maintable").innerText=""
    maketable()
    

    var request = gapi.client.gmail.users.messages.list({
        'userId': 'me',
        'labelIds': 'SENT',
        'maxResults': 10
    });

    request.execute(function (response) {
        $.each(response.messages, function () {
            var messageRequest = gapi.client.gmail.users.messages.get({
                'userId': 'me',
                'id': this.id
            });

            messageRequest.execute(appendMessageRow);
        });
    });
    
}

function showInb(){

    document.getElementById("maintable").innerText=""
    maketable()
    

    var request = gapi.client.gmail.users.messages.list({
        'userId': 'me',
        'labelIds': 'INBOX',
        'maxResults': 10
    });

    request.execute(function (response) {
        $.each(response.messages, function () {
            var messageRequest = gapi.client.gmail.users.messages.get({
                'userId': 'me',
                'id': this.id
            });

            messageRequest.execute(appendMessageRow);
        });
    });
    
}


function showDraft(){
    document.getElementById("maintable").innerText=""
    maketable()
    

    var request = gapi.client.gmail.users.messages.list({
        'userId': 'me',
        'labelIds': 'DRAFT',
        'maxResults': 10
    });

    request.execute(function (response) {
        $.each(response.messages, function () {
            var messageRequest = gapi.client.gmail.users.messages.get({
                'userId': 'me',
                'id': this.id
            });

            messageRequest.execute(appendMessageRow);
        });
    });

}


function cleareverthing(){
    document.getElementById("r3").innerText=""
}


function composemail(){
    var a=document.createElement("button")
    a.id="compose-button"
    a.className="btn btn-primary"
    a.innerText="Compose"
    a.style.padding="10px"
    a.setAttribute("onClick","loadform()")
    document.getElementById("c1").appendChild(a)
}




// function loadform(){

      
//     var f=document.createElement("form")
//     f.onsubmit="return sendEmail()"
//     f.id="form"
//     document.getElementById("c1").appendChild(f);
    
//     var div=document.createElement("div")
//     f.appendChild(div)

//     var ip1=document.createElement("input")
//     ip1.type="email"
//     ip1.style.margin="10px"
//     ip1.id="compose-to"
//     ip1.placeholder="TO"
//     ip1.required='true'
//     div.appendChild(ip1)

//     var div=document.createElement("div")
//     f.appendChild(div)


//     var ip2=document.createElement("input")
//     ip2.type="text"
//     ip2.style.margin="10px"
//     ip2.id="compose-subject"
//     ip2.placeholder="Subject"
//     ip2.required='true'
//     div.appendChild(ip2)

//     var div=document.createElement("div")
//     f.appendChild(div)


//     var ip3=document.createElement("input")
//     ip3.type="text"
//     ip3.style.margin="10px"
//     ip3.id="compose-message"
//     ip3.placeholder="Message"
//     ip3.required='true'
//     div.appendChild(ip3)

//     var div=document.createElement("div")
//     f.appendChild(div)

//     var but=document.createElement("button")
//     but.type="submit"
//     but.id="send-button"
//     but.innerText="Send"
//     div.appendChild(but)

//   }



//   function sendEmail(){
//     sendMessage(
//       {
//         'To' : document.getElementById("compose-to").value,
//         'Subject': document.getElementById("compose-subject").value
//       },
//       document.getElementById("compose-message").value,
//       composeTidy
//     );
//     return false

//   }

//   function sendMessage(headers_obj,message,callback)
//   {
    
//     var email = '';

//     for(var header in headers_obj)
//       email += header += ": "+headers_obj[header]+"\r\n";

//     email += "\r\n" + message;

//     var sendRequest = gapi.client.gmail.users.messages.send({
//       'userId': 'me',
//       'resource': {
//         'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
//       }
//     });
//     return sendRequest.execute(callback);
//   }






