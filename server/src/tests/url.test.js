const { StatusCodes } = require("http-status-codes");
const request = require("supertest");
const { expect } = require("chai");

const app = require("../../app");
const {
  deleteAllUrls,
  addNewUrl,
  findOneByShorterUrl,
} = require("../services/urls");
const { REAL_URL, MOCKED_URL, MODIFIED_URL } = require("../utils/consts");

before(async () => {
  await deleteAllUrls();
});

beforeEach(async () => {
  await deleteAllUrls();
  await addNewUrl(REAL_URL.originalUrl, REAL_URL.shorterUrl);
});

after(async () => {
  await deleteAllUrls();
});

describe("Get", () => {
  describe("Gets all urls entities", () => {
    it("Should return a 200 status code and urls if there are in the db", async () => {
      const res = await request(app).get("/url/all");

      expect(res.status).to.equal(StatusCodes.OK);
      expect(res.body).to.have.length.above(0);
    });

    it("Should return a 404 status code if urls not found in db", async () => {
      const beforeDeletingRes = await request(app).get("/url/all");
      expect(beforeDeletingRes.body).to.have.length.above(0);

      await deleteAllUrls();

      const afterDeletingRes = await request(app).get("/url/all");

      expect(afterDeletingRes.status).to.equal(StatusCodes.NOT_FOUND);
    });
  });

  describe("Gets entity by shorter url", () => {
    it("Should return a 302 status code and redirect to the original url with the shorter url", async () => {
      const res = await request(app).get(`/url/${REAL_URL.shorterUrl}`);
      expect(res.status).to.equal(StatusCodes.MOVED_TEMPORARILY);
      expect(res.header["location"]).to.equal(REAL_URL.originalUrl);
    });

    it("Should return a 404 status code if shorter url not found", async () => {
      const res = await request(app).get(`/url/${MOCKED_URL.shorterUrl}`);
      expect(res.status).to.equal(StatusCodes.NOT_FOUND);

      const url = await findOneByShorterUrl(MOCKED_URL.shorterUrl);
      expect(url).to.be.a("null");
    });
  });

  describe("Gets entities by starts with a specific string", () => {
    it("Should return a 200 status code and all the entities that starts with a specific string", async () => {
      await addNewUrl(MOCKED_URL.originalUrl, MOCKED_URL.shorterUrl);

      const res = await request(app).get(
        `/url/startWith/${REAL_URL.shorterUrl[0]}`
      );

      expect(res.status).to.equal(StatusCodes.OK);
      expect(res.body).to.have.lengthOf(1);
    });

    it("Should return a 404 status code if shorter urls that starts with a specific string not found", async () => {
      const res = await request(app).get("/url/startsWith/!");
      expect(res.status).to.equal(StatusCodes.NOT_FOUND);
    });
  });

  describe("Gets entities by contains a specific string", () => {
    it("Should return a 200 status code and all the entities that contains a specific string", async () => {
      await addNewUrl(MOCKED_URL.originalUrl, MOCKED_URL.shorterUrl);

      const res = await request(app).get(
        `/url/contains/${REAL_URL.shorterUrl[1]}`
      );

      expect(res.status).to.equal(StatusCodes.OK);
      expect(res.body).to.have.lengthOf(2);
    });

    it("Should return a 404 status code if shorter urls that contains a specific string not found", async () => {
      const res = await request(app).get("/url/contains/!");
      expect(res.status).to.equal(StatusCodes.NOT_FOUND);
    });
  });

  describe("Gets entities that don't contain a specific string", () => {
    it("Should return a 200 status code and all the entities that don't contain a specific string", async () => {
      await addNewUrl(MOCKED_URL.originalUrl, MOCKED_URL.shorterUrl);

      const res = await request(app).get("/url/notContains/!");

      expect(res.status).to.equal(StatusCodes.OK);
      expect(res.body).to.have.lengthOf(2);
    });

    it("Should return a 404 status code if shorter urls that don't contain a specific string not found", async () => {
      const res = await request(app).get(
        `/url/notContains/${REAL_URL.shorterUrl[1]}`
      );
      expect(res.status).to.equal(StatusCodes.NOT_FOUND);
    });
  });
});

describe("Post", () => {
  describe("Creates a new shorter url entity", () => {
    it("Should return a 201 status code and the new url entity", async () => {
      const newUrlToAdd = await findOneByShorterUrl(MOCKED_URL.shorterUrl);
      expect(newUrlToAdd).to.be.a("null");

      const res = await request(app).post("/url/createUrl").send(MOCKED_URL);
      expect(res.status).to.equal(StatusCodes.CREATED);

      const addedNewUrl = await findOneByShorterUrl(MOCKED_URL.shorterUrl);
      expect(addedNewUrl).to.not.be.null;
    });

    it("Should return a 409 status code if shorter url already exist", async () => {
      const res = await request(app).post("/url/createUrl").send(REAL_URL);
      expect(res.status).to.equal(StatusCodes.CONFLICT);

      const newUrlToAdd = await findOneByShorterUrl(REAL_URL.shorterUrl);
      expect(newUrlToAdd).to.not.be.null;
    });
  });
});

describe("Patch", () => {
  describe("Modify the original url of a url entity", () => {
    it("Should return a 200 status code and update the original url", async () => {
      const res = await request(app).patch("/url/modifyUrl").send(MODIFIED_URL);

      expect(res.status).to.equal(StatusCodes.OK);
      expect(res.body.originalUrl).to.equal(MODIFIED_URL.newOriginalUrl);
      expect(res.body.shorterUrl).to.equal(MODIFIED_URL.shorterUrl);
    });
  });

  it("Should return a 404 status code if shorter url not found", async () => {
    const res = await request(app).patch("/url/modifyUrl").send(MOCKED_URL);
    expect(res.status).to.equal(StatusCodes.NOT_FOUND);

    const modifiedUrl = await findOneByShorterUrl(MOCKED_URL.shorterUrl);
    expect(modifiedUrl).to.be.a("null");
  });
});

describe("Delete", () => {
  describe("Deletes a url entity", () => {
    it("Should return a 200 status code and delete the url entity", async () => {
      const toBeDeletedUrl = await findOneByShorterUrl(REAL_URL.shorterUrl);
      expect(toBeDeletedUrl).to.not.be.null;

      const res = await request(app).delete(
        `/url/deleteUrl/${REAL_URL.shorterUrl}`
      );
      expect(res.status).to.equal(StatusCodes.OK);

      const deletedUrl = await findOneByShorterUrl(REAL_URL.shorterUrl);
      expect(deletedUrl).to.be.a("null");
    });

    it("Should return a 404 status code if shorter url not found", async () => {
      const res = await request(app).delete(
        `/url/deleteUrl/${MOCKED_URL.shorterUrl}`
      );
      expect(res.status).to.equal(StatusCodes.NOT_FOUND);

      const deletedUrl = await findOneByShorterUrl(MOCKED_URL.shorterUrl);
      expect(deletedUrl).to.be.a("null");
    });
  });
});
