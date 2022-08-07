const { Router } = require("express")

const router = Router()
const studentController = require("../controller/student_controller");
// Get List of routes
router.get("/students", studentController.getStudents)



module.exports = router