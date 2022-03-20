/*var getUserRepos = function(){
    fetch("https://api.github.com/users/octocat/repos").then(function(response){
     response.json().then(function(data){
         console.log(data);
     });
    });

console.log("outside");
getUserRepos();
};*/

//VARIABLES
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term"); //<span>


var getUserRepos = function(user){
    //dynamic user API 
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl).then(function(response){
        if(response.ok){
        response.json().then(function(data){
            displayRepos(data, user);
        });
    }
    else{
        alert("Error. GitHub User Not Found");
    }
    })
    // Notice this `.catch()` getting chained onto the end of the `.then()` method
    .catch(function(error){
        alert("unable to connect to github");
    });
};



var formSubmitHandler = function(event){
    event.preventDefault();
    var username = nameInputEl.value.trim();

    if(username){
        //search for user name then if username is successful then clear out the search bar
        getUserRepos(username);
        nameInputEl.value = "";
    }
    else{
        alert("Where that GitHub name at yo?");
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);


//repo and searchTerm are coming from the form that's passing through the getUserRepos function (displayRepos(data, user);)
// repos = data | repos = paramter can be listed as anything. It's referencing the (respone.json data) 
var displayRepos = function(repos, searchTerm){
    console.log(repos);
    console.log(searchTerm);
    if(repos.length === 0){
        repoContainerEl.textContent = "No repos found.";
        return;
    }
    //clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //LOOP OVER THE REPOS
    for(var i = 0; i < repos.length; i++){

        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //CREATE CONTAINER FOR EACH REPO
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //CREATE A SPAN ELEMENT TO HOLD REPO NAME
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //APPEND SPAN TITLE TO DIV CONTAINER
        repoEl.appendChild(titleEl);

        //CREATING THE STATUS ELEMENT (ICON/#)
            var statusEl = document.createElement("span");
            statusEl.classList = "flex-row align-center";

            //FOR LOOP TO CHECK IF THE REPO(i)'s HAVE AN ISSUE OR NOT
            if(repos[i].open_issues_count > 0){
                statusEl.innerHTML ="<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
            } 
            else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
            }
            
            //APPEND ICON TO DYNAMIC DIV CONTAINER
            repoEl.appendChild(statusEl);

        //APPEND DIV CONTAINER TO "#repos-container"
        repoContainerEl.appendChild(repoEl);
    }

};