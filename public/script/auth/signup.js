const signupForm = document.querySelector("form"),
  fullNameInput = signupForm.querySelector("#name"),
  usernameInput = signupForm.querySelector("#username"),
  emailInput = signupForm.querySelector("#email"),
  fileInput = signupForm.querySelector("#profile-picture"),
  passwordInput = signupForm.querySelector("#password"),
  baseUrl = "http://localhost:3000/api/auth"

signupForm.addEventListener("submit", handleSubmit)

async function handleSubmit(e) {
  e.preventDefault()
  const userToCreate = new FormData()
  userToCreate.append("name", fullNameInput.value)
  userToCreate.append("username", usernameInput.value)
  userToCreate.append("email", emailInput.value)
  userToCreate.append("image", fileInput.files[0])
  userToCreate.append("password", passwordInput.value)

  try {
    const response = await axios.post(`${baseUrl}/signup`, userToCreate)
    console.log(response)
  } catch (error) {
    console.error(error.message)
  }
}
