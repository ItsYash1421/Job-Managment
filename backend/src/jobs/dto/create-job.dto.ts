import { IsString, IsNotEmpty, IsEnum, IsNumber, IsDateString } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEnum(['Full-time', 'Part-time', 'Contract', 'Internship'])
  @IsNotEmpty()
  jobType: string;

  @IsNumber()
  @IsNotEmpty()
  salaryRangeMin: number;

  @IsNumber()
  @IsNotEmpty()
  salaryRangeMax: number;

  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @IsString()
  @IsNotEmpty()
  requirements: string;

  @IsString()
  @IsNotEmpty()
  responsibilities: string;

  @IsDateString()
  @IsNotEmpty()
  applicationDeadline: string;
}
