const signupForm = document.querySelector("form"),
  usernameInput = signupForm.querySelector("#username"),
  userEmailInput = signupForm.querySelector("#email"),
  passwordInput = signupForm.querySelector("#password"),
  baseUrl = "http://localhost:3000/api/auth"

signupForm.addEventListener("submit", handleSubmit)

async function handleSubmit(e) {
  e.preventDefault()
  const username = usernameInput.value
  const email = userEmailInput.value,
    password = passwordInput.value,
    userToCreate = { username, email, password }
  try {
    const { data } = await axios.post(`${baseUrl}/signup`, userToCreate)
    console.log(data)
    if (data.errorMessage) {
      console.log(data.errorMessage)
    }
  } catch (error) {
    console.log(error.response.data.errorMessage)
  }
}
