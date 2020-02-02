export const getAuthForm = () => {
  return `
  <form class="mui-form" id="auth-form">
    <div class="mui-textfield mui-textfield--float-label">
        <input
        required
        type="email"
        id="email"
        >
        <label for="email">email</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
       <input
        required
        type="password"
        id="password"
        >
        <label for="password">password</label>
    </div>  
    <button
    id="submit"
    type="submit"
    class="mui-btn mui-btn--raised">
    Enter
    </button>
   </form> 
   `
};

export const authWithEmailAndPassword = (email, password) => {
  const apiKey = "AIzaSyD5wScXVJQHCxBRzvE2RHkqR__d503rysM";
return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
  method: "POST",
  body : JSON.stringify({
      email, password, returnSecureToken : true
    }),
  headers : {
    'Content-Type' : 'application/json'
  }
  })
    .then(response => response.json())
    .then(data => data.idToken)
};