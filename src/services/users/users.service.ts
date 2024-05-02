import { CreateUserDto, UpdateUserDto } from '@dtos/user.dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12ab!@AB',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: '56CV%ĉv',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Return users list
  all() {
    return this.users;
  }

  // Return a user by id
  find(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not was found`);
    }

    return user;
  }

  findUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  // create a new user
  create(dataUser: CreateUserDto) {
    const user = this.findUserByEmail(dataUser.email);
    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    const newUser = {
      id: this.users.length + 1,
      ...dataUser,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);

    return newUser;
  }

  // update a user by id
  update(id: number, updatesUser: UpdateUserDto) {
    const user = this.find(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not was found`);
    }

    const userUpdated = { ...user, ...updatesUser, updatedAt: new Date() };
    this.users = this.users.map((user) =>
      user.id === id ? userUpdated : user,
    );

    return userUpdated;
  }

  // delete a user by id
  delete(id: number) {
    const user = this.find(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not was found`);
    }

    this.users = this.users.filter((user) => user.id !== id);
    return user;
  }
}
