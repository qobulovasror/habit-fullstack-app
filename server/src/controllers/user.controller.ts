import { NextFunction, Request, Response } from 'express';
import { useTypeORM } from '../database/typeorm'
import { UserEntity } from '../database/entity/User.entity';
import { addUserValidator, updatePasswordValidator, updateUserValidator } from '../validations/user.validator';
import { CustomError } from '../middlewares/customError';
import bcrypt from 'bcrypt'
import { generateToken } from '../helper/generateToken';

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await useTypeORM(UserEntity).find({select: {id: true, name: true, email: true}});
    res.json(users);
  } catch (err) {
    console.log(err);
    next(err)
  }
}

async function getUserbyId(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (!id) 
      throw new CustomError( 400, 'Missing user ID');
    const existingUser = await useTypeORM(UserEntity).findOneBy({ id });
    if (!existingUser) 
      throw new CustomError(404, `User with id: ${id} was not found.`);
    res.json({id: existingUser.id, name: existingUser.name, email: existingUser.email});
  } catch (err) {
    console.log(err);
    next(err)
  }
}

async function addUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { error } = await addUserValidator(req.body);
    if (error)
      throw new CustomError(400, error?.details[0].message);
    
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    
    const user = new UserEntity();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = hashPassword;
    user.role = req.body.role || "user";

    const newUser = await useTypeORM(UserEntity).save(user);
    const token = await generateToken({id: user.id, name: user.name, email: user.email, role: user.role});
    res.status(201).header({"x-auth-Token": token}).send({ id: newUser.id, name: newUser.name, email: newUser.email });
  } catch (err) {
    console.log(err);
    next(err)
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (!id) 
      throw new CustomError(400, 'Missing user ID');
    const { error } = await updateUserValidator(req.body);
    if (error)
      throw new CustomError(400, error?.details[0].message);
    const user = await useTypeORM(UserEntity).findOneBy({ id });
    if (!user) 
      throw new CustomError(404, `User with id: ${id} was not found.`);

    const changes: Partial<UserEntity> = req.body;
    const UserChanges = { ...user, ...changes };

    const updatedUser = await useTypeORM(UserEntity).save(UserChanges);
    res.json({id: updatedUser.id, name: updatedUser.name, email: updatedUser.email});
  } catch (err) {
    console.log(err);
    next(err)
  }
}

async function updatePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (!id) 
      throw new CustomError(400, 'Missing user ID');
    const { error } = await updatePasswordValidator(req.body);
    if (error)
      throw new CustomError(400, error?.details[0].message);
    const user = await useTypeORM(UserEntity).findOneBy({ id });
    if (!user) 
      throw new CustomError(404, `User with id: ${id} was not found.`);

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if(!isValid)
      throw new CustomError(400, "Old password is incorrect")
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(req.body.newPassword, salt);
    
    const UserChanges = { 
      ...user,
      ...{ password: hashPass },
    };

    const updatedUser = await useTypeORM(UserEntity).save(UserChanges);
    res.json({id: updatedUser.id, name: updatedUser.name, email: updatedUser.email});
  } catch (err) {
    console.log(err);
    next(err)
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (!id) 
      throw new CustomError(400, 'Missing user ID');

    const existingUser = await useTypeORM(UserEntity).findOneBy({ id });

    if (!existingUser) 
      throw new CustomError(404, `User with id: ${id} was not found.`);

    await useTypeORM(UserEntity).remove(existingUser);
    res.send({ message: 'User removed!' });
  }catch(err){
    console.log(err);
    next(err)
  }
}


export {
  getAllUsers,
  getUserbyId,
  addUser,
  updateUser,
  updatePassword,
  deleteUser
};