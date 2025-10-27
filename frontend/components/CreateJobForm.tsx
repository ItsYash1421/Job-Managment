'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextInput, Select, Textarea, Button, Grid, NumberInput, Group, Modal, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import Image from 'next/image';
import axios from 'axios';
import styles from './CreateJobForm.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface CreateJobFormProps {
  onSuccess: () => void;
}

export default function CreateJobForm({ onSuccess }: CreateJobFormProps) {
  const [loading, setLoading] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [applicationDeadline, setApplicationDeadline] = useState<Date | null>(null);
  const [location, setLocation] = useState<string>('');
  const [jobType, setJobType] = useState<string>('Full-time');
  const [salaryMin, setSalaryMin] = useState<number>(0);
  const [salaryMax, setSalaryMax] = useState<number>(0);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState<{open: boolean; message: string}>({open: false, message: ''});
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  useEffect(() => {
    try {
      const draftData = localStorage.getItem('jobDraft');
      if (draftData) {
        const draft = JSON.parse(draftData);
        
   
        if (draft.jobTitle) setValue('jobTitle', draft.jobTitle);
        if (draft.companyName) setValue('companyName', draft.companyName);
        if (draft.location) setLocation(draft.location);
        if (draft.jobType) setJobType(draft.jobType);
        if (draft.salaryRangeMin) setSalaryMin(draft.salaryRangeMin);
        if (draft.salaryRangeMax) setSalaryMax(draft.salaryRangeMax);
        if (draft.jobDescription) setValue('jobDescription', draft.jobDescription);
        if (draft.applicationDeadline) {
          setApplicationDeadline(new Date(draft.applicationDeadline));
        }
      }
    } catch (error) {
      console.error('Error loading draft:', error);
    }
  }, [setValue]);

  const handleSaveDraft = async () => {
    const data = getValues();
    setSavingDraft(true);
    
    try {

      const draft = {
        jobTitle: data.jobTitle,
        companyName: data.companyName,
        location: location,
        jobType: jobType,
        salaryRangeMin: salaryMin,
        salaryRangeMax: salaryMax,
        jobDescription: data.jobDescription,
        applicationDeadline: applicationDeadline?.toISOString(),
        savedAt: new Date().toISOString(),
      };
      
      localStorage.setItem('jobDraft', JSON.stringify(draft));
      alert('Draft saved successfully!');
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Failed to save draft');
    } finally {
      setSavingDraft(false);
    }
  };

  const onSubmit = async (data: any) => {
    if (!applicationDeadline) {
      setErrorOpen({ open: true, message: 'Please select an application deadline' });
      return;
    }
    
    try {
      setLoading(true);
      const payload = {
        jobTitle: data.jobTitle,
        companyName: data.companyName,
        location: location,
        jobType: jobType,
        salaryRangeMin: salaryMin,
        salaryRangeMax: salaryMax,
        jobDescription: data.jobDescription,
        requirements: data.jobDescription,
        responsibilities: data.jobDescription,
        applicationDeadline: applicationDeadline.toISOString(),
      };
      
      await axios.post(`${API_URL}/jobs`, payload);
      localStorage.removeItem('jobDraft'); 
      setSuccessOpen(true);
    } catch (error) {
      console.error('Error creating job:', error);
      setErrorOpen({ open: true, message: 'Failed to create job. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Create Job Opening</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gutter="md">
          <Grid.Col span={6}>
            <TextInput
              label="Job Title"
              placeholder="Full Stack Developer"
              {...register('jobTitle', { required: 'Job title is required' })}
              error={errors.jobTitle?.message as string}
              styles={{
                input: {
                  width: '376px',
                  height: '58px',
                  borderRadius: '10px',
                  border: '1px solid #BCBCBC',
                  fontSize: '16px',
                  fontFamily: 'Satoshi Variable, sans-serif',
                  '&:focus': {
                    borderColor: '#222222',
                  },
                },
                label: {
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '8px',
                  fontFamily: 'Satoshi Variable, sans-serif',
                },
              }}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Company Name"
              placeholder="Amazon, Microsoft, Swiggy"
              {...register('companyName', { required: 'Company name is required' })}
              error={errors.companyName?.message as string}
              styles={{
                input: {
                  width: '376px',
                  height: '58px',
                  borderRadius: '10px',
                  border: '1px solid #BCBCBC',
                  fontSize: '16px',
                  fontFamily: 'Satoshi Variable, sans-serif',
                  '&:focus': {
                    borderColor: '#222222',
                  },
                },
                label: {
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '8px',
                  fontFamily: 'Satoshi Variable, sans-serif',
                },
              }}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <Select
              label="Location"
              placeholder="Choose Preferred Location"
              data={['Remote', 'Chennai', 'Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Pune', 'Kolkata']}
              value={location}
              onChange={(value) => setLocation(value || '')}
              styles={{
                input: {
                  width: '376px',
                  height: '58px',
                  borderRadius: '10px',
                  border: '1px solid #BCBCBC',
                  fontSize: '16px',
                  fontFamily: 'Satoshi Variable, sans-serif',
                  '&:focus': {
                    borderColor: '#222222',
                  },
                },
                label: {
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '8px',
                  fontFamily: 'Satoshi Variable, sans-serif',
                },
              }}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Job Type"
              placeholder="Full-time"
              data={['Full-time', 'Part-time', 'Contract', 'Internship']}
              value={jobType}
              onChange={(value) => setJobType(value || 'Full-time')}
              styles={{
                input: {
                  width: '376px',
                  height: '58px',
                  borderRadius: '10px',
                  border: '1px solid #BCBCBC',
                  fontSize: '16px',
                  fontFamily: 'Satoshi Variable, sans-serif',
                  '&:focus': {
                    borderColor: '#222222',
                  },
                },
                label: {
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '8px',
                  fontFamily: 'Satoshi Variable, sans-serif',
                },
              }}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Grid gutter="md">
              <Grid.Col span={6}>
                <div>
                  <label className={styles.label}>Salary Range</label>
                  <Group gap="md">
                    <NumberInput
                      placeholder="0"
                      min={0}
                      value={salaryMin}
                      onChange={(value) => setSalaryMin(Number(value))}
                      leftSection={<Image src="/salary.png" alt="Salary" width={20} height={20} />}
                      prefix="₹ "
                      hideControls
                      styles={{
                        input: {
                          width: '170px',
                          height: '58px',
                          borderRadius: '10px',
                          border: '1px solid #BCBCBC',
                          fontSize: '16px',
                          fontFamily: 'Satoshi Variable, sans-serif',
                          paddingLeft: '50px',
                          '&:focus': {
                            borderColor: '#222222',
                          },
                        },
                      }}
                    />
                    <NumberInput
                      placeholder="12,00,000"
                      min={0}
                      value={salaryMax}
                      onChange={(value) => setSalaryMax(Number(value))}
                      leftSection={<Image src="/salary.png" alt="Salary" width={20} height={20} />}
                      prefix="₹ "
                      hideControls
                      styles={{
                        input: {
                          width: '170px',
                          height: '58px',
                          borderRadius: '10px',
                          border: '1px solid #BCBCBC',
                          fontSize: '16px',
                          fontFamily: 'Satoshi Variable, sans-serif',
                          paddingLeft: '50px',
                          '&:focus': {
                            borderColor: '#222222',
                          },
                        },
                      }}
                    />
                  </Group>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <DatePickerInput
                  label="Application Deadline"
                  placeholder="Pick date"
                  value={applicationDeadline}
                  onChange={setApplicationDeadline}
                  minDate={new Date()}
                  rightSection={<Image src="/calendar.png" alt="Calendar" width={20} height={20} />}
                  styles={{
                    input: {
                      width: '376px',
                      height: '58px',
                      borderRadius: '10px',
                      border: '1px solid #BCBCBC',
                      fontSize: '16px',
                      fontFamily: 'Satoshi Variable, sans-serif',
                      '&:focus': {
                        borderColor: '#222222',
                      },
                    },
                    label: {
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#374151',
                      marginBottom: '8px',
                      fontFamily: 'Satoshi Variable, sans-serif',
                    },
                  }}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Grid.Col span={12}>
            <Textarea
              label="Job Description"
              placeholder="Please share a description to let the candidate know more about the job role"
              minRows={4}
              {...register('jobDescription', { required: 'Job description is required' })}
              error={errors.jobDescription?.message as string}
              styles={{
                input: {
                  width: '768px',
                  maxWidth: '100%',
                  height: '140px',
                  borderRadius: '10px',
                  border: '1px solid #BCBCBC',
                  fontSize: '16px',
                  fontFamily: 'Satoshi Variable, sans-serif',
                  resize: 'none',
                  '&:focus': {
                    borderColor: '#222222',
                  },
                },
                label: {
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '8px',
                  fontFamily: 'Satoshi Variable, sans-serif',
                },
              }}
            />
          </Grid.Col>
        </Grid>

        <Group justify="space-between" mt="lg">
          <Button
            onClick={handleSaveDraft}
            loading={savingDraft}
            className={styles.saveDraftButton}
            rightSection={<Image src="/draft.png" alt="Draft" width={8} height={10} />}
          >
            Save Draft
          </Button>
          <Button
            type="submit"
            loading={loading}
            className={styles.publishButton}
            rightSection={<Image src="/publish.png" alt="Publish" width={10} height={8} />}
          >
            Publish
          </Button>
        </Group>
      </form>

      {/* Success popup after publish */}
      <Modal
        opened={successOpen}
        onClose={() => setSuccessOpen(false)}
        centered
        radius="md"
        withCloseButton={false}
      >
        <Text fw={700} fz={18} mb={8} style={{ fontFamily: 'Satoshi Variable, sans-serif' }}>
          Job published
        </Text>
        <Text c="dimmed" mb="md" style={{ fontFamily: 'Satoshi Variable, sans-serif' }}>
          Your job has been created successfully.
        </Text>
        <Group justify="end">
          <Button
            onClick={() => {
              setSuccessOpen(false);
              onSuccess();
            }}
          >
            OK
          </Button>
        </Group>
      </Modal>

      {/* Error popup */}
      <Modal
        opened={errorOpen.open}
        onClose={() => setErrorOpen({ open: false, message: '' })}
        centered
        radius="md"
        withCloseButton
      >
        <Text fw={700} fz={18} mb={8} style={{ fontFamily: 'Satoshi Variable, sans-serif' }}>
          Something went wrong
        </Text>
        <Text c="dimmed" mb="md" style={{ fontFamily: 'Satoshi Variable, sans-serif' }}>
          {errorOpen.message}
        </Text>
        <Group justify="end">
          <Button onClick={() => setErrorOpen({ open: false, message: '' })}>OK</Button>
        </Group>
      </Modal>
    </div>
  );
}
