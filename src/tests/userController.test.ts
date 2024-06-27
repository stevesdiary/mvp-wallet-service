import userController from "../controller/userController";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Request, Response } from "express";

// Mock the data-source module
jest.mock("../data-source.ts", () => ({
  AppDataSource: {
    manager: {
      getRepository: jest.fn(),
    }
  }
}));

const mockFindOne = jest.fn();
// Type assertion to help TypeScript understand the mock type
(AppDataSource.manager.getRepository as jest.Mock).mockReturnValue({
  findOne: mockFindOne,
});

describe("UserController", () => {
  describe("getOne", () => {
    it("should return 200 and the user if found", async () => {
      const req = {
        params: {
          id: '17df9d3b-391f-4f80-a9f4-2825adfa9fa1',
        },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const user = { id: "17df9d3b-391f-4f80-a9f4-2825adfa9fa1", name: "Smart" };
      mockFindOne.mockResolvedValue(user);

      await userController.getOne(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Got one!', user });
    });

    it("should return 404 if user is not found", async () => {
      const req = {
        params: {
          id: '17df9d3b-391f-4f80-a9f4-2825adfa9fa1',
        },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      mockFindOne.mockResolvedValue(null);

      await userController.getOne(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should handle errors", async () => {
      const req = {
        params: {
          id: '17df9d3b-391f-4f80-a9f4-2825adfa9fa1',
        },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const error = new Error("Database error");
      mockFindOne.mockRejectedValue(error);

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      await userController.getOne(req, res);

      expect(consoleSpy).toHaveBeenCalledWith(error);

      consoleSpy.mockRestore();
    });
  });
});


// import { stat } from "fs";
// import userController from "../controller/userController";
// import { AppDataSource } from "../data-source";
// import { User } from "../entity/User";
// import { Request, Response } from "express";
// import { error } from "console";
// // const getRepositorySpy = jest.spyOn(AppDataSource.manager, "getRepository");
// // getRepositorySpy.mockImplementation(() => ({
// //   findOne: jest.fn(),
// // }))
// jest.mock("../data-source.ts", () => ({
//   AppDataSource: {
//     manager: {
//       getRepository: jest.fn(),
//     }
//   }
// }));

// const mockFindOne = jest.fn();
// AppDataSource.manager.getRepository.mockReturnValue({
//   findOne: mockFindOne,
// });

// describe("UserController", () => {
//   describe("getOne", () => {
//     it("should return 300 and the user if found", async () => {
//       const req = {
//         params: {
//           id: '17df9d3b-391f-4f80-a9f4-2825adfa9fa1',
//         },
//       } as unknown as Request;

//       const res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//       } as unknown as Response;
//       const user = { id: "17df9d3b-391f-4f80-a9f4-2825adfa9fa1", name: "Smart" };
//       mockFindOne.mockResolvedValue(user);

//       await userController.getOne(req, res);
//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.json).toHaveBeenCalledWith({ message: 'Got one!', user});
//     });

//     it("should return 400 if user is not found", async () => {
//       const req = {
//         params: {
//           id: '17df9d3b-391f-4f80-a9f4-2825adfa9fa1'
//         },
//       } as unknown as Request;
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//       } as unknown as Response;

//       const error = new Error("Database error");
//       mockFindOne.mockResolvedValue(error);

//       const consoleSy = jest.spyOn(console, "log").mockImplementation;
//       await userController.getOne(req, res,)
//     })
//   })
// })