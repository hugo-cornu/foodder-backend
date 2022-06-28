const form = document.querySelector("form")
const usernameInput = form.querySelector("#username")
const passwordInput = form.querySelector("#password")
const baseUrl = "http://localhost:3000/auth/login"
import apiHandler from "../apiHandler.js"

form.addEventListener("submit", handleSubmit)

async function handleSubmit(e) {
  e.preventDefault()
  const username = usernameInput.value
  const password = passwordInput.value

  const payload = { username, password }
  apiHandler.login(payload)
  // const { data } = await axios.post(baseUrl, payload)
  // console.log(data)
  // localStorage.setItem("authToken", data.authToken)
}
