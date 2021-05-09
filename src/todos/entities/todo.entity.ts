import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { generateUuid } from 'src/common/helpers';

export type TodoDocument = Todo & mongoose.Document;

@Schema()
export class Todo {
  @Prop({
    index: true,
    required: true,
    unique: true,
    default: () => generateUuid(),
  })
  id: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop()
  isCompleted: boolean;

  @Prop({ type: Date, default: Date.now })
  updatedAt: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
