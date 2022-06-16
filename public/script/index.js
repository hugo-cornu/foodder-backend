import {
	getCatsButton,
	createCatButton,
	submitButton,
	form,
	getCats,
	displayForm,
	handleSubmit,
	errorMessage,
} from "./cats-handling.js"
// console.log("cat", cat)

getCatsButton.addEventListener("click", getCats)
createCatButton.addEventListener("click", () => {
	displayForm()
	submitButton.textContent = "Create 😼"
})
submitButton.addEventListener("click", handleSubmit)
form.addEventListener("keydown", () => (errorMessage.textContent = ""))
