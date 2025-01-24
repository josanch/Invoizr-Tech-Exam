import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint to create a new user
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // Endpoint to fetch all users
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // Endpoint to fetch a single user by ID
  @UseGuards(JwtAuthGuard)  
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }

}
