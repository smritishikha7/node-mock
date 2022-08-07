const StudentService = require("../service/student_service")
const getStudents = async (req, res) => {
    try {
        const data = await StudentService.getStudents(req.query)
        return res.status(200).json({ error: false, data })
    }
    catch (err) {
        res.status(500).json({ error: true, message: err.message })
    }

}


module.exports = {
    getStudents
}