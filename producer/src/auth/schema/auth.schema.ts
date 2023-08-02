
import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    collection: 'Users',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

export class User extends Document {
    @Prop()
    name: string;

    @Prop({ unique: true, })
    email: string;

    @Prop()
    password: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;