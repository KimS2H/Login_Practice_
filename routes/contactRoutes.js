const express = require("express");
const router = express.Router();
const {
  getWindowForNew,
  getNewTamnaMember,
  updateContact,
} = require("../controllers/NewJoincontroller");

//요청 /newjoin
router.route("/").get(getWindowForNew).post(getNewTamnaMember);
router.route("/:id").put(updateContact);

module.exports = router;
