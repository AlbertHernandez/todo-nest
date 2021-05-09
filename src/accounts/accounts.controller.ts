import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('api/v1/accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  async findAll() {
    return await this.accountsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.accountsService.findOne(id);
  }

  @Post()
  async create() {
    return await this.accountsService.create();
  }

  @Patch(':id')
  async update(@Param('id') id: string) {
    return await this.accountsService.update(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.accountsService.remove(id);
  }

  @Delete()
  async removeAll() {
    return await this.accountsService.removeAll();
  }
}
