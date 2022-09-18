const chai = require("chai");
const expect = chai.expect;
const StudentModel = require("../models/student");
const StudentRepository = require("../repository/student_repository");
const jest = require('jest-mock');

const studentRepository = new StudentRepository();

const testData = require("./data/student.json")
describe("findAll ", function () {
    it("should return the whole data", async function () {

        try {
            StudentModel.find = jest.fn().mockImplementation(() => {
                return testData
            })
            const students = await studentRepository.findAll();
            expect(students.length).to.equal(3)
        }
        catch (err) {
            console.log(err)
        }
    });

    it("should return the data whose age is greater than 12", async function () {
        try {
            StudentModel.find = jest.fn().mockImplementation((query) => {
                return testData.filter(x => x.age <= query.age["$lte"] && x.age >= query.age["$gte"])
            })
            const students = await studentRepository.findAll({ age: { from: 11, to: 13 } });
            expect(students.length).to.equal(1)
        }
        catch (err) {
            console.log(err)
        }
    });

    it("should throw an error when id passed is not mongoid", async function () {
        try {
            StudentModel.findById = jest.fn().mockImplementation((id) => {
                return testData.filter(x => x._id == id)
            })
            await studentRepository.findById("62ee5ca1e11bdf9d902d62c7");
        }
        catch (err) {
            console.log(err)
            expect(err).to.instanceOf(Error);
            expect(err.message).to.equal("Id passed is not a mongoId")
        }
    });
    it("should throw mongo error when require field is not passed", async function () {
        try {
            StudentModel.create = jest.fn().mockImplementation((data) => {
                throw new Error("students validation failed: age: Path `age` is required.")
            })
            const studentData = {
                name: "test",
                email: "test@mode.com"
            }
            await studentRepository.create(studentData);
        }
        catch (err) {
            expect(err).to.instanceOf(Error);
            expect(err.message).to.equal("students validation failed: age: Path `age` is required.")
        }
    });
})