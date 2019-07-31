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

 // ========== delete user

 function deleteuser(userid){
   // console.log(userURL+`/${userid}`)
   // debugger

   fetch(userURL+`/${userid}`,{
     method: "DELETE",
   })
   .then(res => res.json())
   .then(event.target.parentElement.remove())

 }


// ---------creating a new tweet

function postNewTweet(){
    let tweetinput = document.querySelector("#tweetinput").value
    let tweetId = document.querySelector(".user-tweet").id
    let userId = document.querySelector(".user-tweet").userId
    console.log(userId , tweetId , tweetinput)
    // console.log(tweetURL+"/"+`${tweetId}`)

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
    }).then(res => res.json())
    .then(showtweets(user))

}


 function editthistweet(tweetid){
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






//---------------------------------slap on dom--------------


// user

  function slapUserOnDom(user){
    // console.log(user)
    const li = document.createElement('li')
    li.className = `userClass`
    li.id = `${user.id}`
    li.innerHTML = `<p> ${user.name} </p>
    <button class = "show-tweet"> show all tweets </button>
    <p> ${user.username} </p>
    <button class = "remove-user"> remove user</button>
    `
    userUl.append(li);

    li.addEventListener("click" , function(event){
      if (event.target.innerText =="show all tweets"){
        showtweets(user);
      }
    })
  }

//   Tweet


function showtweets(user){
  user.tweet_classes.forEach(tweet => {
   const li = document.createElement('li')
   li.className = 'user-tweet'
   li.id = `${tweet.id}`
   li.userId = `${user.id}`
   li.innerHTML = `<p> ${tweet.tweet} </p>
   <button class= new-tweet> make a new tweet</button>
   <button class= edit-tweet> Edit this tweet</button>`

   tweetdiv.append(li);
  })

}
 /////// new tweet form

function createnewtweet() {

  // let form =document.createElement("form")
      let form = document.createElement("form")
      form.className = "new-tweet-form"
      form.innerHTML = `
      <input name="tweet" type="text" class="new-tweet" id="tweetinput" >
      <button type="submit" class="btn btn-primary">Submit</button>
      `
      tweetdivform.append(form);
}





// -------------------event lister


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
      if (event.target.innerText == "make a new tweet"){
        createnewtweet();
      }
      else if (event.target.innerText == "Edit this tweet") {
        const tweetid = event.target.parentElement.id
        editthistweet(tweetid);
      }

   })
 /// make a new tweet

 tweetdivform.addEventListener("click", function(){
  const tweetinput = document.querySelector("#tweetinput").value
  event.preventDefault();
  document.querySelector("#tweetinput").value

      if (event.target.innerText == "Submit"){
            postNewTweet();
      }

 })























})
