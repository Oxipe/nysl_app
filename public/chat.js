//document.getElementById("login").addEventListener("click", login);
//document.getElementById("create-post").addEventListener("click", writeNewPost);
$(".advice").hide();
$("#posts").hide();

console.log("hello")
//console.log(document.getElementById("login"));

firebase.auth().signOut();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
      chat.isLoggedIn = true

      console.log(firebase.auth().currentUser)

  } else {
    $(".advice").show();
    $("#posts").hide();
    // No user is signed in.
  }
});

// Extra:
// CHeck if the user is loged at the begining of the script
// Delete teh input once teh post mesage is send
// If the input is empty don't let send a post mesage

function login() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(function () {
      getPosts();
    })
    .catch(function () {
      alert("Something went wrong");
    });
}


function writeNewPost() {
    console.log("posting")

  if (!$("#textInput").val()) {
      return;
  }

  var text = document.getElementById("textInput").value;
  var userName = firebase.auth().currentUser.displayName;


  // A post entry.
  var postData = {
    name: userName,
    body: text
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('chat').push().key;
  
  var updates = {};
  updates[newPostKey] = postData;

  $("#textInput").val("");

  return firebase.database().ref().child('chat').update(updates);
}


function getPosts() {

  firebase.database().ref('chat').on('value', function (data) {

    var logs = document.getElementById("posts");
    logs.innerHTML = "";

    var posts = data.val();

    var template = "";


    for (var key in posts) {
      if (posts[key].name === firebase.auth().currentUser.displayName) {
        template += `
          <div class="notification is-info">
            <p class="name">${posts[key].name}:</p>
            <p>${posts[key].body}</p>
          </div>
        `;
      } else {
        template += `
          <div class="notification is-primary">
            <p class="name">${posts[key].name}:</p>
            <p>${posts[key].body}</p>
          </div>
        `;
      }
    }

    logs.innerHTML = template;

    $(".box").animate({ scrollTop: $(".box").prop("scrollHeight") }, 500);
  });
}

console.log(firebase.UserInfo)

var chat = new Vue({
    el: "#chat", 
    data: {
        chat_page: true,
        isLoggedIn: false
    }
})