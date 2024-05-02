import { CreateUserDto, UpdateUserDto } from '@dtos/user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '@services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Get: Users list
  @Get()
  getUsersList() {
    const users = {
      users: this.usersService.all(),
    };

    return users;
  }

  // Get: User getting userId as path parameter
  @Get(':userId')
  getUserById(@Param('userId', ParseIntPipe) userId: number) {
    const user = {
      user: this.usersService.find(userId),
    };

    return user;
  }

  // Post: Create a new user getting dataUser as body parameter
  @Post()
  createUser(@Body() dataUser: CreateUserDto) {
    const user = {
      user: this.usersService.create(dataUser),
    };

    return user;
  }

  // Put: Update a user getting userId as path parameter and updatesUser as body parameter
  @Put(':userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updatesUser: UpdateUserDto,
  ) {
    const user = {
      user: this.usersService.update(userId, updatesUser),
    };

    return user;
  }

  // Delete: Delete a user getting userId as path parameter
  @Delete(':userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    const user = {
      user: this.usersService.delete(userId),
    };

    return user;
  }
}
