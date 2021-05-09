import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
  async findAll() {
    return [];
  }

  async findOne(id: string) {
    return [];
  }

  async create() {
    return {};
  }

  async update(id: string) {
    return {};
  }

  async remove(id: string) {
    return {};
  }

  async removeAll() {
    return {};
  }
}
