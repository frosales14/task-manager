import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTaskFilterDto } from './dto/getTaskFilter.dto';
import { UpdateStatusDto } from './dto/updateStatus.dto';
import { Task } from './task.entity';

@Controller('task')
export class TaskController {


    constructor(private taskService: TaskService){ }

    // @Get()
    // getTasks( @Query() getTaskFilterDto: GetTaskFilterDto ): Task[] {
    //     console.log(getTaskFilterDto);
    //     if( Object.keys(getTaskFilterDto).length == 0 ){
    //         return this.taskService.getAllTask();
    //     }

    //     return this.taskService.getFilterTask(getTaskFilterDto);

    // }

    @Get('/:id')
    getTaskById( @Param('id') id:string ): Promise<Task>{
        return this.taskService.getTaskById(id);
    }

    // @Get('/:id')
    // getTaskById( @Param('id') id: string ){
    //     return this.taskService.getTaskById(id);
    // }

    @Post()
    createTask( @Body() createTaskDto:CreateTaskDto ){
        return this.taskService.createTask( createTaskDto );
    }

    // @Patch('/:id/status')
    // patchTaskValue(
    //     @Param('id') id: string, 
    //     @Body() updateStatusDto:UpdateStatusDto
    // ){
    //     const {status} = updateStatusDto;
    //     return this.taskService.patchTaskValue(id, status);
    // }

    // @Delete('/:id')
    // deleteById( @Param('id') id: string ): void{
    //     return this.taskService.deleteTaskById(id);
    // }
}
