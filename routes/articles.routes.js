const router = require("express").Router();
const isAuthenticated = require('../middleware/isAuthenticated')

// IMPORT MODELS

// GET ALL POSTS IN THE FEED PAGE
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    res.status(200).json(await MODEL.find());
  } catch (error) {
    next(error);
  }
});

// GET ONLY THE PRIVATE USER POSTS IN THE PROFILE PAGE
router.get("/:username", isAuthenticated, async (req, res, next) => {
  try {
    username = req.params.username;
    res.status(200).json(await MODEL.find({ username }));
  } catch (error) {
    next(error);
  }
});

// POST - CREATE A NEW POST
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const articleToCreate = req.body;
    const articleCreated = await MODEL.create(articleToCreate);
    res.status(201).json(articleCreated);
  } catch (error) {
    next(error);
  }
});

// PATCH - UPDATE A NEW POST
router.patch("/:id", isAuthenticated, async (req, res, next) => {
  try {
    await MODEL.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: `Good job, you updated ${req.params.id}` });
  } catch (error) {
    next(error);
  }
});

// DELETE A POST
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    await MODEL.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `Good job, you deleted ${req.params.id}` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
