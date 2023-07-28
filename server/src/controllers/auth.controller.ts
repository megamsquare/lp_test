import { Request, Response } from "express";
import status_code from "http-status";
import { NewUser } from "../dto/obj/user.dto";
import Services from "../services";
import { NewRole } from "../dto/obj/role.dto";
import { LoginInfo } from "../dto/obj/auth.dto";

async function signUp(req: Request, res: Response) {
  try {
    let userInfo: NewUser = req.body;
    let roleInfo: NewRole;

    const user = await Services.UserService.createUser(userInfo);
    if (user instanceof Error) {
      res.status(status_code.BAD_REQUEST).json({ message: user.message });
      return;
    }

    if ("_id" in user) {
      const { _id } = user;

      roleInfo = {
        userId: _id,
        role: "user",
      };
      const role = await Services.RoleService.createRole(roleInfo);
      if (role instanceof Error) {
        console.error(role.message);
      }

      res
        .status(status_code.CREATED)
        .json({ data: { message: "User created successfully" } });
      return;
    }
  } catch (error) {
    res.status(status_code.BAD_REQUEST).json({ message: error });
    return;
  }
}

async function signIn(req: Request, res: Response) {
  try {
    const userInfo: LoginInfo = req.body;

    const user = await Services.AuthService.loginUserCheck(userInfo);

    if (user instanceof Error) {
      res.status(status_code.BAD_REQUEST).json({ message: user.message });
      return;
    }

    if (user !== undefined && "_id" in user) {
      const roles = await Services.RoleService.getRolesByUserId(user._id);

      const accessToken = await user.create_jwt(roles);

      const result = {
        id: user._id,
        username: user.username,
        accessToken
      };
      res.status(status_code.OK).json({...result});
      return;
    }
  } catch (error) {
    console.log(`error info ${error}`);
    res.status(status_code.BAD_REQUEST).json({ message: error });
    return;
  }
}

const AuthController = {
  signUp,
  signIn,
};

export default AuthController;
