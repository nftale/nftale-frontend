import { Container } from '@/components/Container/Container'
import ProtectedRoute from '@/features/auth/ProtectedRoute/ProtectedRoute'
import { StoriesWrapper } from '@/features/story/StoriesWrapper/StoriesWrapper'

export default async function ProjectsPage() {
  return (
    <ProtectedRoute>
      <Container>
        <StoriesWrapper />
      </Container>
    </ProtectedRoute>
  )
}
