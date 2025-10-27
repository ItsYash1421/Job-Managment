import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from './schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const createdJob = new this.jobModel(createJobDto);
    return createdJob.save();
  }

  async findAll(filters?: any): Promise<Job[]> {
    const query: any = {};

    if (filters.jobTitle) {
      query.jobTitle = { $regex: filters.jobTitle, $options: 'i' };
    }

    if (filters.location) {
      query.location = { $regex: filters.location, $options: 'i' };
    }

    if (filters.jobType) {
      query.jobType = filters.jobType;
    }

    if (filters.salaryMin || filters.salaryMax) {
      query.$and = [];
      if (filters.salaryMin) {
        query.$and.push({ salaryRangeMax: { $gte: Number(filters.salaryMin) } });
      }
      if (filters.salaryMax) {
        query.$and.push({ salaryRangeMin: { $lte: Number(filters.salaryMax) } });
      }
    }

    return this.jobModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Job> {
    return this.jobModel.findById(id).exec();
  }
}
