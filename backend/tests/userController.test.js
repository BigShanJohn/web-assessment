const { loginUser, registerUser } = require("../controllers/userController");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const HTTP_STATUS = require("../constants/httpStatus");

// Mock dependencies
jest.mock("../models/userModel");
jest.mock("bcrypt");
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "mocked_token"),
}));

// Helper to mock response object
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Auth Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("loginUser - Invalid credentials only", () => {
    it("should return 401 if password is incorrect", async () => {
      userModel.findOne.mockResolvedValue({
        _id: "123",
        email: "test@test.com",
        password: "hashedPassword",
      });

      bcrypt.compare.mockResolvedValue(false);

      const req = {
        body: {
          email: "test@test.com",
          password: "wrongPassword",
        },
      };

      const res = mockResponse();

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.UNAUTHORIZED);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Invalid credentials",
      });
    });
  });

  describe("registerUser - User already exists", () => {
    it("should return 401 if user already exists", async () => {
      userModel.findOne.mockResolvedValue({
        _id: "123",
        email: "test@test.com",
      });

      const req = {
        body: {
          name: "Test",
          email: "test@test.com",
          password: "12345678",
        },
      };

      const res = mockResponse();

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.UNAUTHORIZED);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "User already exists",
      });
    });
  });
});
