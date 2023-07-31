const express = require("express");
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    //1 Get all sightings
    router.get("/", this.controller.getAll.bind(this.controller));
    //2 Get sighting by their ID
    router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    //3 ABle to post new sightings
    router.post("/", this.controller.addNewSightings.bind(this.controller));
    //4 Delete a sightings
    router.delete("/:id", this.controller.deleteSighting.bind(this.controller));
    //5 Edit a sightings
    router.put("/:id", this.controller.editSighting.bind(this.controller));

  //6 
    router.get(
      "/:sightingId/comments",
      this.controller.getComments.bind(this.controller)
      );
      router.post(
      "/:sightingId/comments",
      this.controller.insertOneComment.bind(this.controller)
    );
    return router;
  }
}

module.exports = SightingsRouter;
