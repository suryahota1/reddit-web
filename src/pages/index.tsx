import { withUrqlClient } from 'next-urql'
import NavBar from '../components/navbar'
import { createUrqlClient } from '../utils/createUrqlClient'

const Index = () => (
  <>
    <NavBar />
    <div>Hello</div>
  </>
)

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
