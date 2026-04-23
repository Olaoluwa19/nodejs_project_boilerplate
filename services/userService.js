import User from "../models/User.js";
import validator from "validator";

class UserService {
  constructor() {}

  static async findAllUsers() {
    return await User.find().select("-password").lean();
  }

  static async findUserById(userId) {
    return await User.findOne({ _id: userId }).select("-password").exec();
  }

  static async createUser(userObject) {
    return await User.create(userObject);
  }

  static async checkDuplicateUser(email, roles) {
    return await User.findOne({ email, roles }).select("-password").exec();
  }

  static async findUserByEmailOrPhone(identifier) {
    return await User.findOne({
      $or: [{ phone: identifier }, { email: identifier }],
    })
      .select("-password")
      .exec();
  }

  static async deleteUser(id) {
    return await User.deleteOne(id);
  }

  static async populateUser(id) {
    return await User.findById(id)
      .populate({
        path: "doctorsField",
        select: "-password -refreshToken -createdAt -updatedAt",
      })
      .exec();
  }
}

export default UserService;
