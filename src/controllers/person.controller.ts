import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonModel } from 'src/models/person.model';
import { PersonSchema } from 'src/schemas/person.schema';

@Controller('/person')
export class PersonController {
  constructor(
    @InjectRepository(PersonModel) private model: Repository<PersonModel>,
  ) {}

  @Post()
  public async create(@Body() body: PersonSchema): Promise<PersonModel> {
    return this.model.save(body);
  }

  @Get(':id')
  public async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PersonModel> {
    const person = await this.model.findOne({ where: { id } });

    if (!person) {
      throw new NotFoundException(`Não achei uma pessoa com o id ${id}`);
    }

    return person;
  }

  @Get()
  public async getAll(): Promise<PersonModel[]> {
    return this.model.find();
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PersonSchema,
  ): Promise<PersonModel> {
    const person = await this.model.findOne({ where: { id } });

    if (!person) {
      throw new NotFoundException(`Não achei uma pessoa com o id ${id}`);
    }

    await this.model.update({ id }, body);

    return this.model.findOne({ where: { id } });
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const person = await this.model.findOne({ where: { id } });

    if (!person) {
      throw new NotFoundException(`Não achei uma pessoa com o id ${id}`);
    }

    await this.model.delete(id);

    return `A pessoa com id ${id} foi deletada com sucesso`;
  }
}
