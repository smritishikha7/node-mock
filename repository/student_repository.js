const Student = require("../models/student");
const ObjectId = require("mongoose").Types.ObjectId;
// this class and its function will only connect to Student model
class StudentRepository {

    create(data) {
        return Student.create(data)
    }

    // this will handle the find call of the student model
    findAll(query = {}, limit = 10, offset = 0) {
        let { age = null } = query
        let filters = {}, project = {};
        if (age) filters["age"] = { $gte: age.from, $lte: age.to }

        let queryOptions = {
            limit,
            skip: offset,
            // sort : _id
        }
        return Student.find(filters, project, queryOptions)
    }

    findById(id) {
        if (!ObjectId.isValid(id)) throw new Error("Id passed is not a mongoId")
        return Student.findById(id)
    }
}

module.exports = StudentRepository