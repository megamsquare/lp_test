import { Request, Response } from "express";
import status_code from "http-status";
import Services from "../services";
import { QueryUser, UpdateUser } from "../dto/obj/user.dto";

async function updateUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const userData = req.body;

    const updateData: UpdateUser = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      username: userData.username,
      userId,
    };
    const user = await Services.UserService.updateUser(updateData);

    if (user instanceof Error) {
      res.status(status_code.BAD_REQUEST).json({ message: user.message });
      return;
    }

    res.status(status_code.OK).json({ data: user });
    return;
  } catch (error) {
    res.status(status_code.BAD_REQUEST).json({ message: error });
    return;
  }
}

async function getUserById(req: Request, res: Response) {
  const userId = req.params.id;

  const user = await Services.UserService.getUserById(userId);
  if (user instanceof Error) {
    res.status(status_code.BAD_REQUEST).json({ message: user.message });
    return;
  }

  res.status(status_code.OK).json({ data: user });
  return;
}

async function getAllUsers(req: Request, res: Response) {
  const { page = 1, items = 10 } = req.query;
  const pageLimit: QueryUser = {
    pageNumber: page as number,
    limitNumber: items as number,
  };
  const users = await Services.UserService.getAllUsers(pageLimit);
  if (users instanceof Error) {
    res.status(status_code.BAD_REQUEST).json({ error: users });
    return;
  }
  res.status(status_code.OK).json({ data: users });
  return;
}

const userController = {
    updateUser,
    getAllUsers,
    getUserById
}

export default userController;