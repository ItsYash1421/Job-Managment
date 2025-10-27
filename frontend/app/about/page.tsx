'use client';

import { Container, Title, Text, Stack, Grid, Card, Group, Modal } from '@mantine/core';
import { IconTarget, IconUsers, IconTrophy, IconHeart } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import Header from '@/components/Header';
import CreateJobForm from '@/components/CreateJobForm';

export default function AboutPage() {
  const [opened, { open, close }] = useDisclosure(false);

  const values = [
    {
      icon: <IconTarget size={40} />,
      title: 'Our Mission',
      description: 'To connect talented professionals with amazing opportunities and help companies build exceptional teams.',
    },
    {
      icon: <IconUsers size={40} />,
      title: 'Community First',
      description: 'We believe in building a strong community where both job seekers and employers can thrive together.',
    },
    {
      icon: <IconTrophy size={40} />,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from our platform features to customer support.',
    },
    {
      icon: <IconHeart size={40} />,
      title: 'Passion',
      description: 'We are passionate about making the job search and hiring process simple, efficient, and enjoyable.',
    },
  ];

  return (
    <>
      <Header onCreateClick={open} />
      
      <Container size="xl" py="xl">
        <Stack gap="xl">
          <div>
            <Title order={1} mb="md">About Us</Title>
            <Text size="lg" c="dimmed">
              Connecting talent with opportunity since 2020
            </Text>
          </div>

          <Card shadow="sm" padding="xl" radius="md" withBorder>
            <Stack gap="md">
              <Title order={2}>Who We Are</Title>
              <Text>
                We are a leading job platform dedicated to bridging the gap between talented professionals 
                and forward-thinking companies. Our platform has helped thousands of job seekers find their 
                dream roles and enabled companies to build world-class teams.
              </Text>
              <Text>
                Founded in 2020, we've grown from a small startup to a trusted platform serving professionals 
                across India. Our mission is to make the hiring process transparent, efficient, and accessible 
                to everyone.
              </Text>
            </Stack>
          </Card>

          <div>
            <Title order={2} mb="xl" ta="center">Our Values</Title>
            <Grid gutter="lg">
              {values.map((value, index) => (
                <Grid.Col key={index} span={{ base: 12, sm: 6 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
                    <Stack gap="md">
                      <Group>
                        <div style={{ color: '#667eea' }}>{value.icon}</div>
                        <Title order={3}>{value.title}</Title>
                      </Group>
                      <Text c="dimmed">{value.description}</Text>
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </div>

          <Card shadow="sm" padding="xl" radius="md" withBorder>
            <Stack gap="md" align="center">
              <Title order={2}>Our Impact</Title>
              <Grid gutter="xl" w="100%">
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Stack gap={0} align="center">
                    <Text size="48px" fw={700} c="violet">10K+</Text>
                    <Text c="dimmed">Jobs Posted</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Stack gap={0} align="center">
                    <Text size="48px" fw={700} c="violet">50K+</Text>
                    <Text c="dimmed">Active Users</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Stack gap={0} align="center">
                    <Text size="48px" fw={700} c="violet">5K+</Text>
                    <Text c="dimmed">Companies</Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Stack>
          </Card>
        </Stack>
      </Container>

      <Modal opened={opened} onClose={close} title="Create Job Opening" size="lg" centered>
        <CreateJobForm onSuccess={close} />
      </Modal>
    </>
  );
}
