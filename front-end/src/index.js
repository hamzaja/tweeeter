document.addEventListener("DOMContentLoaded", function(){



//--------------constants
const userURL = "http://localhost:3000/users"
const tweetURL = "http://localhost:3000/tweet_classes"
const main = document.querySelector("main")
const userUl = document.querySelector("#User-list")
const userform = document.querySelector("#new-user-form")
const tweetdiv = document.querySelector(".tweet-div")
const tweetdivform = document.querySelector(".user-tweet-form")



//--------------- fetch ------------------------

//user fetch
// ==== user fetch
  fetch(userURL)
  .then(res => res.json())
  .then(function(data){
    data.forEach(user => {
      slapUserOnDom(user)
    });

  });

//===== user post

function newUser(){
  let name = document.querySelector(".form-name").value
  let username = document.querySelector(".form-username").value
  // console.log(name , username)
  fetch(userURL , {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
        name: name,
        username: username
    })
  })
  .then(resp => resp.json())
  .then(slapUserOnDom)


}

 // ========== user delete

 function deleteuser(userid){
   // console.log(userURL+`/${userid}`)
   // debugger

   fetch(userURL+`/${userid}`,{
     method: "DELETE",
   })
   .then(res => res.json())
   .then(event.target.parentElement.remove())

 }

//  ---------------tweet fetches ---------

// ---- slap Tweets on Dom

    function slapUserTweetsOnDom(userIdForTweet){
      // console.log(userIdForTweet)
      fetch(userURL+`/${userIdForTweet}`)
      .then(res => res.json())
      .then(function ( user) {
        console.log(user.tweet_classes)
        if (user.tweet_classes.length === 0 ){createButtonForNewTweet(user)}
        else {user.tweet_classes.forEach(tweet => { showtweets(tweet) })}
      })
    }

// ---------creating a new tweet



function postNewTweet(userId){
      // debugger
    let tweetinput = document.querySelector("#tweetinput").value
    // console.log(tweetinput , userId)
    fetch(tweetURL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        tweet: tweetinput
      })
    })
    .then(res => res.json())
    .then(function(data){
        showtweets(data)
    })


}

// -------edit tweet

 function editthistweet(){
   const tweetid = event.target.parentElement.id
   console.log(tweetid)
   fetch(`http://localhost:3000/tweet_classes/${tweetid}` , {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
        tweet: "lets patch ittfdsvzx  tttt......."
    })
  })

  }






//---------------------------------slap on dom--------------------------------------------------------


// user on the DOM

  function slapUserOnDom(user){
    // console.log(user)
    const li = document.createElement('li')
    li.className = `userClass`
    li.id = `${user.id}`
    li.innerHTML = `Name: ${user.name}</br>
    User Name: ${user.username}</br>
    <button class = "show-tweet"> show all tweets </button>
    <button class = "remove-user"> remove user </button>
    </br></br></br></br>
    `
    userUl.append(li);

    //   li.addEventListener("click" , function(event){
    //
    //   if (event.target.innerText == "show all tweets"){
    //       user.tweet_classes.forEach(tweet => {showtweets(tweet)})
    //   }
    // })
  }

//   Tweet on the DOM

      // if user have a tweeet
function showtweets(tweet){
  //making a button
  // console.log(tweet)
  let button = document.createElement("button")
  button.innerText = "make a new tweet"
  button.userId = `${tweet.user_id}`
  button.class = "new-tweet-button"
  tweetdiv.append(button)
  //tweets on DOM
   const li = document.createElement('li')
   li.className = 'user-tweet'
   li.id = `${tweet.id}`
   li.innerHTML = `<p> ${tweet.tweet} </p>
   <button class= edit-tweet> Edit this tweet</button>`
   tweetdiv.append(li);

  }
     // user doesnt have tweet
   function createButtonForNewTweet(user){
     // console.log(user.id)
     let button = document.createElement("button")
     button.innerText = "make a new tweet"
     button.userId = `${user.id}`
     button.class = "new-tweet-button"
     tweetdiv.append(button)
   }
 /////// new tweet form

function createnewtweet(userId) {
  // console.log(userId)
  // let form =document.createElement("form")
      let form = document.createElement("form")
      form.className = "new-tweet-form"
      form.userid = `${userId}`
      form.innerHTML = `
      <input name="tweet" type="text" class="new-tweet" id="tweetinput" >
      <button type="submit" class="btn btn-primary">Submit</button>
      `
      tweetdivform.append(form);
}





// -------------------event listner-----------------------------------------------------––––---–----–


// new user event lister from
  userform.addEventListener("click" , function(){
    event.preventDefault();
    if (event.target.innerText == "Submit")
    {
      newUser();
    }
  })
// delete user event listner

   userUl.addEventListener("click" , function(){
     const userid = event.target.parentElement.id
     // console.log(userid)
     if (event.target.innerText == "remove user"){
       deleteuser(userid);
     }
   })
// make a new tweet event listner
   tweetdiv.addEventListener("click" , function(){
     const userId = event.target.userId
      if (event.target.innerText == "make a new tweet"){
        createnewtweet(userId);
      }
      else if(event.target.innerText == "Edit this tweet") {
        editthistweet();
      }

   })
 ///// make a new tweet

 tweetdivform.addEventListener("click", function(){
  const tweetinput = document.querySelector("#tweetinput").value
  event.preventDefault();
  const userId = event.target.parentElement.userid
  const form = document.querySelector('.new-tweet-form')

      if (event.target.innerText == "Submit"){

            postNewTweet(userId);
            form.remove();

      }

 })


 userUl.addEventListener("click" , function(){
   const userIdForTweet = event.target.parentElement.id
    if (event.target.innerText === "show all tweets"){
      slapUserTweetsOnDom(userIdForTweet);
    }
 })






















})
