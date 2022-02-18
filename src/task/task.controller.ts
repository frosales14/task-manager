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

    @Get()
    getTasks( @Query() getTaskFilterDto: GetTaskFilterDto ): Promise<Task[]> {
        return this.taskService.getTasks(getTaskFilterDto);
    }

    @Get('/:id')
    getTaskById( @Param('id') id:string ): Promise<Task>{
        return this.taskService.getTaskById(id);
    }

    @Post()
    createTask( @Body() createTaskDto:CreateTaskDto ){
        return this.taskService.createTask( createTaskDto );
    }

    @Patch('/:id/status')
    patchTaskValue(
        @Param('id') id: string, 
        @Body() updateStatusDto:UpdateStatusDto
    ){
        const {status} = updateStatusDto;
        return this.taskService.patchTaskValue(id, status);
    }

    @Delete('/:id')
    deleteById( @Param('id') id: string ): Promise<string>{
        return this.taskService.deleteTaskById(id);
    }
}
