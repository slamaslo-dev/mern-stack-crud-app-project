const express = require("express");
const router = express.Router();
const Activity = require("../models/activity");
const Goal = require("../models/goal");
const Kid = require("../models/kid");
const verifyToken = require("../middleware/verify-token");

// CREATE activity (tied to a goal + kid)
router.post("/", verifyToken, async (req, res) => {
  try {
    const kid = await Kid.findById(req.body.kid);
    if (!kid) return res.status(404).json({ error: "Kid not found" });

    if (kid.guardian.toString() !== req.user._id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const newActivity = await Activity.create({
      title: req.body.title,
      description: req.body.description,
      goal: req.body.goal,
      kid: req.body.kid,
    });

    res.status(201).json(newActivity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all activities for a given goal
router.get("/goal/:goalId", verifyToken, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.goalId).populate("kid");
    if (!goal) return res.status(404).json({ error: "Goal not found" });

    if (goal.kid.guardian.toString() !== req.user._id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const activities = await Activity.find({ goal: req.params.goalId });
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update activity
router.put("/:activityId", verifyToken, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.activityId).populate(
      "kid"
    );

    if (!activity) return res.status(404).json({ error: "Activity not found" });

    if (activity.kid.guardian.toString() !== req.user._id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.activityId,
      {
        title: req.body.title,
        description: req.body.description,
      },
      { new: true }
    );

    res.status(200).json(updatedActivity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH. Mark activity as complete
router.patch("/:activityId/complete", verifyToken, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.activityId).populate(
      "kid"
    );

    // Check existence first
    if (!activity) return res.status(404).json({ error: "Not found" });

    // Check authorization
    if (activity.kid.guardian.toString() !== req.user._id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Update the same object we already fetched
    activity.isCompleted = true;
    const updated = await activity.save();

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH. Mark activity as incomplete
router.patch("/:activityId/incomplete", verifyToken, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.activityId).populate(
      "kid"
    );

    // Check existence first
    if (!activity) return res.status(404).json({ error: "Not found" });

    // Check authorization
    if (activity.kid.guardian.toString() !== req.user._id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Update the same object we already fetched
    activity.isCompleted = false;
    const updated = await activity.save();

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE activity
router.delete("/:activityId", verifyToken, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.activityId).populate(
      "kid"
    );

    if (!activity) return res.status(404).json({ error: "Activity not found" });

    if (activity.kid.guardian.toString() !== req.user._id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await activity.deleteOne();
    res.status(200).json(activity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
