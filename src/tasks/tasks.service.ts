import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status';
import { CreateClassDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from './tasks.entity';
import { FilterClassDto } from './dto/filter-task.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private tasksRepository: Repository<Tasks>,
  ) { }

  async getAllTasks(
    filterTaskDto: any,
    user: User,
  ): Promise<Tasks[]> {
    const { status, search } = filterTaskDto;
    const result = this.tasksRepository.createQueryBuilder('task');
    result.where({ user });

    if (status) {
      result.andWhere('task.status = :status', { status });
    }

    if (search) {
      result.andWhere(
        '(task.title ILIKE :search OR task.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }
    const tasks = await result.getMany();
    return tasks;
  }

  async getTaskById(id: string, user: User): Promise<Tasks> {
    const found = await this.tasksRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return found;
  }

  async createTask(createClassDto: CreateClassDto, user: User): Promise<Tasks> {
    const { title, description } = createClassDto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    return await this.tasksRepository.save(task);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ${id} not found!`);
    }
  }

  async updateTaskStatusById(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Tasks> {
    const res = await this.getTaskById(id, user);
    res.status = status;
    await this.tasksRepository.save(res);
    return res;
  }
}
