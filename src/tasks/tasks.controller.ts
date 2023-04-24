import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/guard';
import { TaskDto, TaskQueryInterface } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private service: TasksService) {}

  @Get()
  findAll(@Query() query: TaskQueryInterface) {
    let param: string[];
    if (query?.assigned) {
      param = query.assigned.split(',');
    }
    return this.service.findAll(param);
  }

  @Post()
  insert(@Body() dto: TaskDto) {
    return this.service.insert(dto);
  }
}
