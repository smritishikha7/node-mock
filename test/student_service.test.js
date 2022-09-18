const chai = require("chai");
const expect = chai.expect;
const studentService = require("../service/student_service")
const StudentRepository = require("../repository/student_repository");
const jest = require('jest-mock');


const testData = require("./data/student.json")
describe("getStudents test cases ", function () {

    it("should return all data without filterig class data", async function () {
        StudentRepository.prototype.findAll = jest.fn().mockImplementationOnce(() => {
            return testData
        });
        const students = await studentService.getStudents({})
        expect(students.length).to.equal(3)
    })

    it("should return data which are found lying in the specific age group based on the std pass", async function () {
        StudentRepository.prototype.findAll = jest.fn().mockImplementationOnce((params) => {
            return testData.filter(x => x.age >= params.age.from && x.age <= params.age.to)
        });
        const students = await studentService.getStudents({ std: 6 })
        expect(students.length).to.equal(2)
    })

    it("will throw an error as std value is greater than 12", async function () {
        try {
            StudentRepository.prototype.findAll = jest.fn().mockImplementationOnce((params) => {
                return testData.filter(x => x.age >= params.age.from && x.age <= params.age.to)
            });
            await studentService.getStudents({ std: 14 })
        }
        catch (err) {
            expect(err).to.instanceOf(Error);
            expect(err.message).to.equal("Std cannot be greater than 12")
        }
    })
})