const { Url, addMockings } = require("../mocking/urlModel");
const chai = require("chai");
const chaiHTTP = require("chai-http");
const app = require("../../app/index");

chai.use(chaiHTTP);

before(async () => {
  await Url.destroy({
    where: {},
    truncate: true,
  });
});

beforeEach(async () => {
  await addMockings();
});

describe("Get", () => {
  describe("Get all urls", () => {
    it("should return 404 status code if urls not found in db", async () => {
      await Url.destroy({
        where: {},
        truncate: true,
      });
      chai.request(app).get("/url/all").expect(404);
    });

    it("should return 200 status code and urls if there are in the db", () => {
      chai.request(app).get("/url/all").expect(200);
    });

    it("should return 500 status code", () => {
      chai.request(app).get("/url/notExist").expect(500);
    });
  });
});
