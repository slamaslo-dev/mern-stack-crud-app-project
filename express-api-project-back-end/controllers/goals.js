const express = require("express");
const router = express.Router();
const Activity = require("../models/activity");
const Goal = require("../models/goal");
const Kid = require("../models/kid");
const verifyToken = require("../middleware/verify-token");

// CREATE
router.post("/", verifyToken, async (req, res) => {
  try {

    const kid = await Kid.findById(req.body.kid);
    if (!kid) return res.status(404).json({ error: "Kid not found" });

    if (kid.guardian.toString() !== req.user._id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const newGoal = await Goal.create({
      title: req.body.title,
      description: req.body.description,
      kid: req.body.kid,
    });

    res.status(201).json(newGoal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all goals
router.get("/kid/:kidId", verifyToken, async (req, res) => {
  try {
    const kid = await Kid.findById(req.params.kidId);
    if (!kid) return res.status(404).json({ error: "Kid not found" });

    if (kid.guardian.toString() !== req.user._id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const goals = await Goal.find({ kid: req.params.kidId });
    res.status(200).json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single goal
router.get("/:goalId", verifyToken, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.goalId).populate("kid");
    if (!goal) return res.status(404).json({ error: "Goal not found" });

    if (goal.kid.guardian.toString() !== req.user._id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    res.status(200).json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE goal
router.delete("/:goalId", verifyToken, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.goalId).populate("kid");
    if (!goal) return res.status(404).json({ error: "Goal not found" });

    if (goal.kid.guardian.toString() !== req.user._id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Cascade delete: remove all activities for this goal
    await Activity.deleteMany({ goal: req.params.goalId });
    await goal.deleteOne();
    
    res.status(200).json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
