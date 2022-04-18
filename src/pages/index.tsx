import { withUrqlClient } from 'next-urql'
import NavBar from '../components/navbar'
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from "next/link";
import Posts from '../components/Posts';

const Index = () => (
	<>
		<NavBar />
		<NextLink href="create-post">
			Create Post
		</NextLink>
		<Posts></Posts>
	</>
)

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
