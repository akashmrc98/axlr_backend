import DB from "../../models/db";
import { admin, logger } from "../../config";

const { UserModel } = DB;

export default class UserServices {
  static createAdmin = async () => {
    const userCount = await UserModel.countDocuments();
    if (userCount <= 0) {
      const newUser = new UserModel(admin);
      await newUser.save();
      logger.info("admin created");
    }
  };
}
