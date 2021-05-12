import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { generateUuid } from '../../../common/helpers';

export type AccountDocument = Account & mongoose.Document;

@Schema()
export class Account {
  @Prop({
    index: true,
    required: true,
    unique: true,
    default: () => generateUuid(),
  })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ index: true, required: true, unique: true })
  email: string;

  @Prop({ type: Date, default: Date.now })
  updatedAt: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: boolean;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
