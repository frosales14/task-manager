import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTaskFilterDto } from './dto/getTaskFilter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){ }
    
    getTasks( filterDto: GetTaskFilterDto ): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

    async getTaskById( id: string ): Promise<Task>{
        const found = await this.taskRepository.findOne(id);
        
        if(!found){
            throw new NotFoundException(`No se encontro un task con id: ${id}`);
        }

        return found;
    }

    async createTask( createTaskDto: CreateTaskDto ): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto);
    }

    async patchTaskValue(id: string, status: TaskStatus): Promise<Task>{
        const task = await this.getTaskById(id);
        
        task.status = status;
        
        await this.taskRepository.save(task);

        return task;
    }

    async deleteTaskById(id: string): Promise<string> {
        
        const result = await this.taskRepository.delete(id);

        if(result.affected === 0){
            throw new NotFoundException(`no se encontro una actividad con el id ${id}`);
        }

        return 'Actividad eliminada exitosamente';
    }
}
