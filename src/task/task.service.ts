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
    
    // getAllTask():Task[] {
    //     return this._tasks;
    // }

    async getTaskById( id: string ): Promise<Task>{
        const found = await this.taskRepository.findOne(id);
        
        if(!found){
            throw new NotFoundException(`No se encontro un task con id: ${id}`);
        }

        return found;
    }

    // getFilterTask( getTaskFilterDto: GetTaskFilterDto ): Task[]{
    //     let task = this._tasks;

    //     if( getTaskFilterDto.status ){
    //         task = task.filter( task => task.status == getTaskFilterDto.status );
    //     }

    //     if( getTaskFilterDto.search ){
    //         task = task.filter( task => {
    //             if( task.title.includes(getTaskFilterDto.search) || task.description.includes(getTaskFilterDto.search)){
    //                 return true;
    //             }

    //             return false;
    //         });
    //     }

    //     return task;
    // }


    async createTask( createTaskDto: CreateTaskDto ): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto);
    }

    // patchTaskValue(id: string, status: TaskStatus): Task{
    //     const task = this.getTaskById(id);
        
    //     task.status = status;

    //     return task;
    // }

    // deleteTaskById( id: string): void {

    //     this.getTaskById(id);
        
    //     this._tasks = this._tasks.filter( task => task.id !== id );
    // }
}
