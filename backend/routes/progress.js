router.post("/track", auth, async (req, res) => {
  try {
    const { courseId, moduleIndex, timestamp, duration } = req.body;
    
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        "progress.$[elem].lastWatched": {
          module: moduleIndex,
          timestamp: new Date(timestamp)
        }
      },
      $addToSet: {
        "progress.$[elem].completedModules": moduleIndex
      }
    }, {
      arrayFilters: [{ "elem.course": courseId }]
    });
    
    res.json({ message: "Progress updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});