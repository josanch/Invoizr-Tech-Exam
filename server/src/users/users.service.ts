
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  // Create a new user
  async createUser(createUserDto: CreateUserDto) {
    const { email, password, username, name } = createUserDto;

    // Note: Hash the password before saving it to the database in a real application
    return this.prisma.users.create({
      data: {
        email,
        password,
        username,
        name,
      },
    });
  }

  async findOne(email: string) {
    return await this.prisma.users.findUnique({
      where: { email },
    });
  }

  // Fetch all users (for testing or debugging purposes)
  async findAll() {
    return await this.prisma.users.findMany();
  }

  // Fetch all users
  async getAllUsers() {
    return this.prisma.users.findMany();
  }

  // Fetch a single user by ID
  async getUserById(id: number) {
    return this.prisma.users.findUnique({
      where: { id },
    });
  }
}
