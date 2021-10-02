// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCnOJcMO99fi-Zg12BDI-QYXFhHNeM_t88",
  authDomain: "billbuddy-a1e84.firebaseapp.com",
  databaseURL: "https://billbuddy-a1e84-default-rtdb.firebaseio.com",
  projectId: "billbuddy-a1e84",
  storageBucket: "billbuddy-a1e84.appspot.com",
  messagingSenderId: "914583831053",
  appId: "1:914583831053:web:f8ff36db1190a704e54b44",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.getElementById("dashboard").style.display = "none";

document.getElementById("login").addEventListener("click", GoogleLogin);
document.getElementById("logout").addEventListener("click", LogoutUser);

let provider = new firebase.auth.GoogleAuthProvider();

function GoogleLogin() {
  console.log("Login Btn Call");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      console.log(res.user);
      document.getElementById("LoginScreen").style.display = "none";
      document.getElementById("dashboard").style.display = "block";
      showUserDetails(res.user);
    })
    .catch((e) => {
      console.log(e);
    });
}

function showUserDetails(user) {
  document.getElementById("userDetails").innerHTML = `
      <img src="${user.photoURL}" style="width:10%">
      <p>Name: ${user.displayName}</p>
      <p>Email: ${user.email}</p>
    `;
}

function checkAuthState() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      document.getElementById("LoginScreen").style.display = "none";
      document.getElementById("dashboard").style.display = "block";
      showUserDetails(user);
    } else {
    }
  });
}

function LogoutUser() {
  console.log("Logout Btn Call");
  firebase
    .auth()
    .signOut()
    .then(() => {
      document.getElementById("LoginScreen").style.display = "block";
      document.getElementById("dashboard").style.display = "none";
    })
    .catch((e) => {
      console.log(e);
    });
}
checkAuthState();

