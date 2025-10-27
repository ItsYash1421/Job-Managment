'use client';

import { useState, useEffect } from 'react';
import { Container, Grid, TextInput, Select, RangeSlider, Text, Modal, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import CreateJobForm from '@/components/CreateJobForm';
import JobCard from '@/components/JobCard';
import Header from '@/components/Header';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function FindJobsPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    jobTitle: '',
    location: '',
    jobType: '',
    salaryRange: [1000, 10000000] as [number, number],
  });

  const formatSalary = (value: number) => {
    if (value >= 10000000) return '₹1Cr';
    if (value >= 100000) return `₹${(value / 100000).toFixed(0)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}k`;
    return `₹${value}`;
  };

  const fetchJobs = async () => {
    try {
      const params: any = {};
      if (filters.jobTitle) params.jobTitle = filters.jobTitle;
      if (filters.location) params.location = filters.location;
      if (filters.jobType) params.jobType = filters.jobType;
      params.salaryMin = filters.salaryRange[0];
      params.salaryMax = filters.salaryRange[1];

      const response = await axios.get(`${API_URL}/jobs`, { params });
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const handleJobCreated = () => {
    close();
    fetchJobs();
  };

  return (
    <>
      <div
        style={{
          backgroundColor: 'white',
          boxShadow: '0px 4px 14px 0px rgba(198, 191, 191, 0.25)',
          width: '100%',
          paddingBottom: '40px',
        }}
      >
        <Header onCreateClick={open} />
        <div style={{ height: '24px' }} />
        <Container size="xl">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0',
              width: '100%',
            }}
          >
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
              <Image src="/search.png" alt="Search" width={18} height={18} style={{ flexShrink: 0 }} />
              <TextInput
                placeholder="Search By Job Title, Role"
                value={filters.jobTitle}
                onChange={(e) => setFilters({ ...filters, jobTitle: e.target.value })}
                variant="unstyled"
                style={{ flex: 1, minWidth: 0 }}
                styles={{
                  input: {
                    border: 'none',
                    padding: 0,
                    fontSize: '16px',
                    fontFamily: 'Satoshi Variable, sans-serif',
                    color: '#495057',
                    width: '100%',
                    '&::placeholder': {
                      color: '#9ca3af',
                    },
                  },
                }}
              />
            </div>

            <div
              style={{
                width: '2px',
                height: '48px',
                backgroundColor: '#e9ecef',
                margin: '0 32px',
              }}
            />

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Image
                src="/location.png"
                alt="Location"
                width={18}
                height={18}
                style={{ objectFit: 'contain' }}
              />
              <Select
                placeholder="Preferred Location"
                data={['Remote', 'Chennai', 'Mumbai', 'Bangalore', 'Delhi', 'Hyderabad']}
                value={filters.location}
                onChange={(value) => setFilters({ ...filters, location: value || '' })}
                clearable
                variant="unstyled"
                rightSection={<Image src="/dropdown.png" alt="Dropdown" width={24} height={24} />}
                styles={{
                  input: {
                    border: 'none',
                    padding: 0,
                    fontSize: '16px',
                    fontFamily: 'Satoshi Variable, sans-serif',
                    color: '#495057',
                    '&::placeholder': {
                      color: '#9ca3af',
                    },
                  },
                }}
              />
            </div>

            <div
              style={{
                width: '2px',
                height: '48px',
                backgroundColor: '#e9ecef',
                margin: '0 32px',
              }}
            />

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Image src="/jobtype.png" alt="Job Type" width={18} height={18} />
              <Select
                placeholder="Job type"
                data={['Full-time', 'Part-time', 'Contract', 'Internship']}
                value={filters.jobType}
                onChange={(value) => setFilters({ ...filters, jobType: value || '' })}
                clearable
                variant="unstyled"
                rightSection={<Image src="/dropdown.png" alt="Dropdown" width={24} height={24} />}
                styles={{
                  input: {
                    border: 'none',
                    padding: 0,
                    fontSize: '16px',
                    fontFamily: 'Satoshi Variable, sans-serif',
                    color: '#495057',
                    '&::placeholder': {
                      color: '#9ca3af',
                    },
                  },
                }}
              />
            </div>

            <div
              style={{
                width: '2px',
                height: '48px',
                backgroundColor: '#e9ecef',
                margin: '0 32px',
              }}
            />

            <div style={{ flex: 1.2, paddingRight: '8px' }}>
              <Group justify="space-between" mb={8}>
                <Text
                  size="16px"
                  fw={500}
                  c="#495057"
                  style={{ fontFamily: 'Satoshi Variable, sans-serif' }}
                >
                  Salary Per Month
                </Text>
                <Text
                  size="16px"
                  fw={600}
                  c="#495057"
                  style={{ fontFamily: 'Satoshi Variable, sans-serif' }}
                >
                  {formatSalary(filters.salaryRange[0])} - {formatSalary(filters.salaryRange[1])}
                </Text>
              </Group>
              <RangeSlider
                min={1000}
                max={10000000}
                step={10000}
                value={filters.salaryRange}
                onChange={(value) => setFilters({ ...filters, salaryRange: value })}
                styles={{
                  root: {
                    width: '100%',
                  },
                  track: {
                    backgroundColor: '#000000',
                    height: '2px',
                  },
                  bar: {
                    backgroundColor: '#000000',
                    height: '2px',
                  },
                  thumb: {
                    borderWidth: 4,
                    borderColor: '#000000',
                    backgroundColor: '#FFFFFF',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                  },
                  trackContainer: {
                    padding: 0,
                  },
                }}
              />
            </div>
          </div>
        </Container>
      </div>

      <Container size="xl" py="xl">

        <Grid gutter="md">
          {jobs.map((job: any) => (
            <Grid.Col key={job._id} span={{ base: 12, sm: 6, md: 3 }}>
              <JobCard job={job} />
            </Grid.Col>
          ))}
        </Grid>

        {jobs.length === 0 && (
          <Text ta="center" c="dimmed" mt="xl">
            No jobs found. Try adjusting your filters.
          </Text>
        )}
      </Container>

      <Modal
        opened={opened}
        onClose={close}
        size="auto"
        centered
        withCloseButton={false}
        padding={0}
        radius="lg"
        styles={{
          body: {
            padding: 0,
            overflow: 'visible',
          },
          content: {
            overflow: 'visible',
          },
        }}
      >
        <CreateJobForm onSuccess={handleJobCreated} />
      </Modal>
    </>
  );
}
