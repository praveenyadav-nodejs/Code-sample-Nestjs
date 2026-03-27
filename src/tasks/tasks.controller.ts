import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { TaskStatus } from './task-status';
import { CreateClassDto } from './dto/create-task.dto';
import { Tasks } from './tasks.entity';
import { FilterClassDto } from './dto/filter-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(
    @Query() filterTaskDto: FilterClassDto,
    @GetUser() user: User,
  ): Promise<Tasks[]> {
    return this.tasksService.getAllTasks(filterTaskDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Tasks> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body() createClassDto: CreateClassDto,
    @GetUser() user: User,
  ): Promise<Tasks> {
    return this.tasksService.createTask(createClassDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param() id: string,
    @Body('status') status: TaskStatus,
  ): Promise<Tasks> {
    return this.tasksService.updateTaskStatusById(id, status);
  }
}
