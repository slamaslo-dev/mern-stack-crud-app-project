const express = require("express");
const router = express.Router();
const Kid = require("../models/kid");
const Goal = require("../models/goal");
const Activity = require("../models/activity");
const verifyToken = require("../middleware/verify-token");

// CREATE kid (assigns to current user)
router.post("/", verifyToken, async (req, res) => {
  try {

    const newKid = await Kid.create({
      name: req.body.name,
      birthDate: req.body.birthDate,
      guardian: req.user._id,
    });

    res.status(201).json({ data: newKid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all kids for current user
router.get("/", verifyToken, async (req, res) => {
  try {
    const kids = await Kid.find({ guardian: req.user._id });
    res.status(200).json({ data: kids });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single kid
router.get("/:kidId", verifyToken, async (req, res) => {
  try {
    const kid = await Kid.findById(req.params.kidId);
    if (!kid) return res.status(404).json({ error: "Kid not found" });

    if (kid.guardian.toString() !== req.user._id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    res.status(200).json({ data: kid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE kid
router.delete("/:kidId", verifyToken, async (req, res) => {
  try {
    const kid = await Kid.findById(req.params.kidId);
    if (!kid) return res.status(404).json({ error: "Kid not found" });

    if (kid.guardian.toString() !== req.user._id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Cascade delete: remove all activities and goals for this kid
    await Activity.deleteMany({ kid: req.params.kidId });
    await Goal.deleteMany({ kid: req.params.kidId });
    await kid.deleteOne();

    res.status(200).json({ data: kid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
