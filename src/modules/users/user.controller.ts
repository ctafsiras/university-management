import { Request, Response } from 'express';
import userService from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const newUser = await userService.createUser(user);
    res
      .status(200)
      .json({
        success: true,
        message: 'user created successfully',
        data: newUser,
      })
      .end();
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: 'user cannot created', error });
  }
};

export default {
  createUser,
};
