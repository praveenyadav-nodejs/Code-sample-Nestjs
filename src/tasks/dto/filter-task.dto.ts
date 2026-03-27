import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status';

export class FilterClassDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
