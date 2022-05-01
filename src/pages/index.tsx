import { withUrqlClient } from 'next-urql'
import NavBar from '../components/navbar'
import { createUrqlClient } from '../utils/createUrqlClient';
import Posts from '../components/Posts';
import Wrapper from '../components/Wrapper';

const Index = () => (
	<>
		<NavBar />
		<Wrapper variant='regular'>
			<Posts></Posts>
		</Wrapper>
	</>
)

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
