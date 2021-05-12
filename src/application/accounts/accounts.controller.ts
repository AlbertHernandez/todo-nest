import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account-dto';
import { UpdateAccountDto } from './dto/update-account-dto';
import { AccountsService } from './interfaces/accounts-service.interface';
import { ACCOUNTS, ACCOUNTS_SERVICE } from './constants';
import { V1 } from '../../server/routes/routes.constants';

@Controller(`${V1}/${ACCOUNTS}`)
export class AccountsController {
  constructor(
    @Inject(ACCOUNTS_SERVICE)
    private readonly accountsService: AccountsService,
  ) {}

  @Get()
  async findAll() {
    return await this.accountsService.findAll();
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    return await this.accountsService.findByEmail(email);
  }

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    return await this.accountsService.create(createAccountDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return await this.accountsService.update(id, updateAccountDto);
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
