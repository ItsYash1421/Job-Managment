'use client';

import { Container, Title, Text, Grid, Card, Button, Stack, Badge, Group, Modal } from '@mantine/core';
import { IconBriefcase, IconMapPin, IconStar } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import Header from '@/components/Header';
import CreateJobForm from '@/components/CreateJobForm';

export default function FindTalentsPage() {
  const [opened, { open, close }] = useDisclosure(false);

  const talents = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Full Stack Developer',
      location: 'Bangalore',
      experience: '5 years',
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Rahul Sharma',
      role: 'UI/UX Designer',
      location: 'Mumbai',
      experience: '3 years',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Priya Patel',
      role: 'Backend Developer',
      location: 'Chennai',
      experience: '4 years',
      skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Amit Kumar',
      role: 'DevOps Engineer',
      location: 'Delhi',
      experience: '6 years',
      skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS'],
      rating: 4.9,
    },
  ];

  return (
    <>
      <Header onCreateClick={open} />
      
      <Container size="xl" py="xl">
        <Title order={2} mb="md">Find Top Talents</Title>
        <Text c="dimmed" mb="xl">
          Connect with skilled professionals ready to join your team
        </Text>

        <Grid gutter="md">
          {talents.map((talent) => (
            <Grid.Col key={talent.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Stack gap="md">
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: 32,
                      fontWeight: 'bold',
                      margin: '0 auto',
                    }}
                  >
                    {talent.name.charAt(0)}
                  </div>

                  <div>
                    <Text fw={600} size="lg" ta="center">
                      {talent.name}
                    </Text>
                    <Text size="sm" c="dimmed" ta="center">
                      {talent.role}
                    </Text>
                  </div>

                  <Group justify="center" gap="xs">
                    <IconStar size={16} fill="#ffd700" color="#ffd700" />
                    <Text size="sm" fw={500}>
                      {talent.rating}
                    </Text>
                  </Group>

                  <Stack gap={4}>
                    <Group gap={4}>
                      <IconBriefcase size={14} />
                      <Text size="xs">{talent.experience}</Text>
                    </Group>
                    <Group gap={4}>
                      <IconMapPin size={14} />
                      <Text size="xs">{talent.location}</Text>
                    </Group>
                  </Stack>

                  <Group gap={4}>
                    {talent.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} size="sm" variant="light">
                        {skill}
                      </Badge>
                    ))}
                  </Group>

                  <Button fullWidth variant="light">
                    View Profile
                  </Button>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      <Modal opened={opened} onClose={close} title="Create Job Opening" size="lg" centered>
        <CreateJobForm onSuccess={close} />
      </Modal>
    </>
  );
}
