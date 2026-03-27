import { EntityRepository, Repository } from 'typeorm';
import { Tasks } from './tasks.entity';

@EntityRepository(Tasks)
export class TaskRepository extends Repository<Tasks> {}
