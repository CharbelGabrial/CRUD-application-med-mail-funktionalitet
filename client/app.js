// Api Root
const rootURL = "http://localhost:5000/api/";

let posts = [];

// Response Message
const showResponseMessage = (message) => {
  document.querySelector("#response-message").innerHTML = message;
  setTimeout(() => {
    document.querySelector("#response-message").innerHTML = "";
  }, 2500);
};

// Get Posts
const getPosts = async () => {
  const res = await fetch(`${rootURL}getposts`);
  const data = await res.json();

  // We create a div that will contain our posts if we have post in our data base it will show.

  posts = data.posts;
  document.querySelector("#posts").innerHTML = posts
    .map(
      (post) => `
    <div style="background: linear-gradient(20deg, #ffffff, #dddddd);
    box-shadow:  20px 20px 60px #d0d0d0, -20px -20px 60px #ffffff;
    display: flex; justify-content: space-between; align-items: center; margin: 10px; width: 100%;
    padding: 5px; border-radius: 30px;">
    <h3 style="margin:10px;" id="'${post._id}'-userid" placeholder="Project status">${post.userid}</h3>
        <p style="margin:10px;" id="'${post._id}'-projectname">${post.projectname}</p>
        <p style="margin:10px;" id="'${post._id}'-projectstatus">${post.projectstatus}</p>
        <form onsubmit="updatePost('${post._id}'); return false;">
            <input style="width: 150px; padding: 7px; margin: 5px; border-radius: 20px; border: 1.5px solid #06d6a0; background-color: #ececec33;" 
            id="update-post-'${post._id}'-userid" placeholder="Peoject id" required>
            <input style="width: 150px; padding: 7px; margin: 5px; border-radius: 20px; border: 1.5px solid #06d6a0; background-color: #ececec33;" 
            id="update-post-'${post._id}'-projectname" placeholder="Project name" required>
            <input style="width: 150px; padding: 7px; margin: 5px; border-radius: 20px; border: 1.5px solid #06d6a0; background-color: #ececec33;" 
            id="update-post-'${post._id}'-projectstatus" placeholder="Project status" required>
            <button style="padding: 7px 15px;
            margin: 5px; background-color: deepskyblue; border-radius: 20px;
            border: 2px solid deepskyblue; font-weight: bold; color: #fff; type="submit"><i class="fas fa-edit"></i> Update</button>
            <button style="padding: 7px 15px; margin: 5px; background-color: #ff0000; border-radius: 20px; 
            border: 2px solid #ff0000; font-weight: bold; color: #fff;"
            onclick="deletePost('${post._id}')"><i class="fas fa-trash-alt"></i> Delete</button>
        </form>
        </div>`
    )
    .join("");
};

// New Post

// We get all the values from the diffrent "inputs"
const newPost = async () => {
  const username = document.querySelector("#post-username").value;
  const email = document.querySelector("#post-email").value;
  const userid = document.querySelector("#post-userid").value;
  const projectname = document.querySelector("#post-projectname").value;
  const projectstatus = document.querySelector("#post-projectstatus").value;

  // Basically if username = username and email = email and so on .... == post

  const post = {
    username,
    email,
    userid,
    projectname,
    projectstatus,
  };

  // We upload the post to db

  const res = await fetch(`${rootURL}newpost`, {
    method: "post",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  });
  /*
  - Get the data and translate it
  - Get our previous posts and display them again
  - Set the inputs back to an blank string
  */

  const data = await res.json();
  console.log(data);
  getPosts();
  showResponseMessage(data.message.msgBody);

  document.querySelector("#post-username").value = "";
  document.querySelector("#post-email").value = "";
  document.querySelector("#post-userid").value = "";
  document.querySelector("#post-projectname").value = "";
  document.querySelector("#post-projectstatus").value = "";
};

// Update Post

// Depending on the post:s uniqe id we get that id/project new input values.
const updatePost = async (id) => {
  console.log(id);
  const userid = document.getElementById(`update-post-'${id}'-userid`).value;
  const projectname = document.getElementById(
    `update-post-'${id}'-projectname`
  ).value;
  const projectstatus = document.getElementById(
    `update-post-'${id}'-projectstatus`
  ).value;

  /*
  Now depending if there even is any new information we update it
  and if there is no new information it can set the same as it was,
  in this case we need all the input values to be filled, but it can be changed
  */
  const post = {
    userid: userid
      ? userid
      : document.getElementById(`'${id}'-userid`).innerHTML,
    projectname: projectname
      ? projectname
      : document.getElementById(`'${id}'-projectname`).innerHTML,
    projectstatus: projectstatus
      ? projectstatus
      : document.getElementById(`'${id}'-projectstatus`).innerHTML,
  };

  // We upload the updated post to db

  const res = await fetch(`${rootURL}updatepost/${id}`, {
    method: "put",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // We update the site after post updating and show the Response Message

  const data = await res.json();
  console.log(data);
  getPosts();
  showResponseMessage(data.message.msgBody);
};

// Delete Post

// Depnding on the post:s uniqe id we fetch the post and use our method to delete it.
const deletePost = async (id) => {
  console.log(id);
  const res = await fetch(`${rootURL}deletepost/${id}`, {
    method: "delete",
  });

  // We update the site after post deleting and show the Response Message.

  const data = await res.json();
  console.log(data);
  getPosts();
  showResponseMessage(data.message.msgBody);
};

window.addEventListener("load", getPosts);

// Function that close Create New Project modal when the user click on the close icon (X).
const closeCreateModal = () => {
  document.getElementById("create-modal-wrapper").style.display = "none";
};

/* 
This function will open the Create modal when the user click on (New Project) btn, 
where each click on (New Project) btn will take the user to a new creat model.
*/
const openCreateModal = () => {
  document.getElementById("create-modal-wrapper").style.display = "flex";
};

/* 
Function that close Create Modal Confirmation and thats happed after the user fills in all 
informations and then click on the (Add new project) btn.
*/
const closeCreateModalConfirmation = () => {
  document.getElementById("create-modal-wrapper").style.display = "none";
};
