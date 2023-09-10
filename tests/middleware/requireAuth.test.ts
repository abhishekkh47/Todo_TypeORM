import { Request, Response, NextFunction } from "express";
import {
  createRequest,
  createResponse,
  MockRequest,
  MockResponse,
} from "node-mocks-http";
import requireAuth from "../../middleware/requireAuth";

describe("first", () => {
  var req: MockRequest<Request>;
  var res: MockResponse<Response>;
  const next: NextFunction = ()=>{return};
  it("should return a authentication token", async () => {
    req = createRequest({
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ0ZXN0MUBnbWFpbC5jb20iLCJpYXQiOjE2OTQzNDE5NDUsImV4cCI6MTY5NDYwMTE0NX0.qlNzps4tFO5MgyBX3VajxM8IeDz2JBVzf-GgBzzzy9A",
      },
    });
    res = createResponse();
    const response = await requireAuth(req, res, next);
    console.log(response);

    expect(response.statusCode).toBe(response);
  });
});
