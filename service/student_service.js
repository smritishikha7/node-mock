const StudentRepository = require("../repository/student_repository");
const stdConst = require("../constants/std");
const studentRepository = new StudentRepository();
const getStudents = (query = {}) => {
    const { limit = 10, offset = 0, std = -1 } = query;
    if (std > 12) throw new Error("Std cannot be greater than 12")
    // will get a age range based on standard a student belongs to
    const age = _getAgeBasedOnClass(std)
    // get the students from the model
    return studentRepository.findAll({ age }, limit, offset)
}
// this will return a range of age based on the standard passed
const _getAgeBasedOnClass = (std = -1) => {

    return stdConst[std] || null;
}



module.exports = {
    getStudents,
    _getAgeBasedOnClass
}