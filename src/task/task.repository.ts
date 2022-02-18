import { EntityRepository, Repository } from "typeorm";
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { TaskStatus } from "./task-status.enum";
import { NotFoundException } from '@nestjs/common';
import { GetTaskFilterDto } from './dto/getTaskFilter.dto';


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {


    async getTasks( filterDto: GetTaskFilterDto ): Promise<Task[]>{

        const { status, search } = filterDto;

        const query = this.createQueryBuilder('task');

        if( status ){
            query.andWhere( 'task.status = :status', {status} )
        }

        if( search ){
            query.andWhere( 
                'LOWER( task.description ) LIKE LOWER(:search) OR LOWER(task.title) LIKE LOWER(:search)', 
                { search: `%${search}%` }
            );
        }

        const tasks = await query.getMany();

        return tasks;

    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{

        const {title, description} = createTaskDto;

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN
        });

        await this.save(task);

        return task;

    }

}