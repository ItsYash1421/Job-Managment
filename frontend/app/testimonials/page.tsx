'use client';

import { Container, Title, Text, Grid, Card, Stack, Group, Avatar, Rating, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from '@/components/Header';
import CreateJobForm from '@/components/CreateJobForm';

export default function TestimonialsPage() {
  const [opened, { open, close }] = useDisclosure(false);

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Software Engineer',
      company: 'Amazon',
      rating: 5,
      text: 'I found my dream job through this platform! The process was smooth and the job listings were exactly what I was looking for. Highly recommended!',
      avatar: 'R',
    },
    {
      id: 2,
      name: 'Priya Singh',
      role: 'Product Manager',
      company: 'Microsoft',
      rating: 5,
      text: 'As a hiring manager, this platform has made our recruitment process so much easier. We found amazing talent quickly and efficiently.',
      avatar: 'P',
    },
    {
      id: 3,
      name: 'Amit Patel',
      role: 'UI/UX Designer',
      company: 'Swiggy',
      rating: 5,
      text: 'The user interface is intuitive and the job recommendations are spot on. I got multiple interview calls within a week of signing up!',
      avatar: 'A',
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      role: 'Data Scientist',
      company: 'Flipkart',
      rating: 5,
      text: 'Best job portal I have used. The filters are very helpful and the application process is straightforward. Found my current role here!',
      avatar: 'S',
    },
    {
      id: 5,
      name: 'Vikram Malhotra',
      role: 'DevOps Engineer',
      company: 'Zomato',
      rating: 4,
      text: 'Great platform with a wide variety of job opportunities. The salary information is transparent which helped me make informed decisions.',
      avatar: 'V',
    },
    {
      id: 6,
      name: 'Ananya Sharma',
      role: 'HR Manager',
      company: 'Paytm',
      rating: 5,
      text: 'We have been using this platform for all our hiring needs. The quality of candidates is excellent and the support team is very responsive.',
      avatar: 'A',
    },
  ];

  const getAvatarColor = (name: string) => {
    const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
    return colors[name.charCodeAt(0) % colors.length];
  };

  return (
    <>
      <Header onCreateClick={open} />
      
      <Container size="xl" py="xl">
        <Stack gap="xl">
          <div>
            <Title order={1} mb="md" ta="center">What Our Users Say</Title>
            <Text size="lg" c="dimmed" ta="center">
              Real stories from real people who found success with our platform
            </Text>
          </div>

          <Grid gutter="lg">
            {testimonials.map((testimonial) => (
              <Grid.Col key={testimonial.id} span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
                  <Stack gap="md">
                    <Group>
                      <Avatar
                        size="lg"
                        radius="xl"
                        color={getAvatarColor(testimonial.name)}
                      >
                        {testimonial.avatar}
                      </Avatar>
                      <div>
                        <Text fw={600}>{testimonial.name}</Text>
                        <Text size="sm" c="dimmed">
                          {testimonial.role}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {testimonial.company}
                        </Text>
                      </div>
                    </Group>

                    <Rating value={testimonial.rating} readOnly />

                    <Text size="sm" c="dimmed" style={{ fontStyle: 'italic' }}>
                      "{testimonial.text}"
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>
            ))}
          </Grid>

          <Card shadow="sm" padding="xl" radius="md" withBorder>
            <Stack gap="md" align="center">
              <Title order={2}>Join Thousands of Happy Users</Title>
              <Text c="dimmed" ta="center" maw={600}>
                Whether you're looking for your next career opportunity or searching for top talent, 
                our platform is here to help you succeed. Start your journey today!
              </Text>
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
