import { Request, Response } from 'express';
import { useTypeORM } from '../database/typeorm'
import { UserEntity } from '../database/entity/User.entity';
import { addUserValidator, updateUserValidator } from '../validations/user.validator';


async function getAllUsers(req: Request, res: Response){
  try{
    const users = await useTypeORM(UserEntity).find();
    res.send(users);
  }catch(err){
    res.status(501).json({error: "Server error"})
  }
}

async function getUserbyId(req: Request, res: Response){
  try{
    const { id } = req.params;
    if (!id) 
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    const existingUser = await useTypeORM(UserEntity).findOneBy({ id });
    if (!existingUser) 
      return res.status(404).send({ message: `User with id: ${id} was not found.` });
    res.send(existingUser);
  }catch(err){
    res.status(501).json({error: "Server error"})
  }
}

async function addUser(req: Request, res: Response){
  try{
    const {error} = await addUserValidator(req.body);
    if(error) return res.status(401).send(error)
    const user = new UserEntity();
      user.name = req.body.name;
      user.email = req.body.email;
      user.password = req.body.password;
  
      const newUser = await useTypeORM(UserEntity).save(user);
      res.status(201).send({id: newUser.id, name: newUser.name, email: newUser.email});
  }catch(err){
    res.status(501).json({error: "Server error"})
  }
}

async function updateUser(req: Request, res: Response){
  try{
    const { id } = req.params;
      if (!id) 
        return res.status(400).send({ message: 'Required parameter "id" is missing!' });
      const {error} = await updateUserValidator(req.body);
      if(error) return res.status(401).send(error)
      const user = await useTypeORM(UserEntity).findOneBy({ id });
  
      if (!user) {
        return res.status(404).send({ message: `User with id: ${id} was not found.` });
      }
  
      const changes: Partial<UserEntity> = req.body;
      const UserChanges = { ...user, ...changes };
  
      const updatedUser = await useTypeORM(UserEntity).save(UserChanges);
      res.send(updatedUser);
  }catch(err){
    res.status(501).json({error: "Server error"})
  }
}

async function deleteUser(req: Request, res: Response){
  try{
    const { id } = req.params;
    if (!id) 
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });

    const existingUser = await useTypeORM(UserEntity).findOneBy({ id });

    if (!existingUser) 
      return res.status(404).send({ message: `User with id: ${id} was not found.` });
    await useTypeORM(UserEntity).remove(existingUser);
    res.send({ message: 'User removed!' });
  }catch(err){
    res.status(501).json({error: "Server error"})
  }
}


export {
  getAllUsers, 
  getUserbyId,
  addUser,
  updateUser,
  deleteUser
};