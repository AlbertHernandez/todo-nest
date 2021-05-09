import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { generateUuid } from '../../common/helpers';

@Schema()
export class Account extends mongoose.Document {
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
}

export const AccountSchema = SchemaFactory.createForClass(Account);
