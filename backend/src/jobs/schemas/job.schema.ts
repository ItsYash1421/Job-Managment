import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Job extends Document {
  @Prop({ required: true })
  jobTitle: string;

  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'] })
  jobType: string;

  @Prop({ required: true })
  salaryRangeMin: number;

  @Prop({ required: true })
  salaryRangeMax: number;

  @Prop({ required: true })
  jobDescription: string;

  @Prop({ required: true })
  requirements: string;

  @Prop({ required: true })
  responsibilities: string;

  @Prop({ required: true })
  applicationDeadline: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
