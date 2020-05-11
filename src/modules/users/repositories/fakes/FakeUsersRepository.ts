import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';
import User from '../../infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  public users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const finsUser = this.users.find(user => user.id === id);
    return finsUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const finsUser = this.users.find(user => user.email === email);
    return finsUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, userData);
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }
}

export default UsersRepository;
