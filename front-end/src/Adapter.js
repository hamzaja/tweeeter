class Adapter{

  static url(){
    return "http://localhost:3000/users";
  }

  static showAllUser(){
    fetch(this.url())
    .then(resp => resp.json())
  }


}
