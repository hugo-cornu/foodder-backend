/* Version 1:
Check is user is page, owner. 
If so, create req.isOwner as a boolean to pass it to the request */

const pageOwnership = async (req, res, next) => {
  try {
    console.log(">>>>req.user:", req.user)
    const loggedUser = req.user.username
    const username = req.params.username

    if (loggedUser === username) {
      req.isPageOwner = true
    } else {
      req.isPageOwner = false
    }
  } catch (error) {
    next(error)
  }

  next()
}

module.exports = pageOwnership
