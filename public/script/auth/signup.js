const signupForm = document.querySelector("form"),
  usernameInput = signupForm.querySelector("#username"),
  passwordInput = signupForm.querySelector("#password"),
  baseUrl = "http://localhost:3000/auth"

signupForm.addEventListener("submit", handleSubmit)

async function handleSubmit(e) {
  e.preventDefault()
  const username = usernameInput.value,
    password = passwordInput.value,
    userToCreate = { username, password }
  try {
    const response = await axios.post(`${baseUrl}/signup`, userToCreate)
    console.log(response)
  } catch (error) {
    console.error(error.message)
  }
}
