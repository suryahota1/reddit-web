import { withUrqlClient } from 'next-urql'
import NavBar from '../components/navbar'
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from "next/link";
import Posts from '../components/Posts';
import { Flex, Heading, Link } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';

const Index = () => (
	<>
		<NavBar />
		<Wrapper variant='regular'>
			<Flex>
				<Heading>
					Reddit
				</Heading>
				<NextLink href="create-post">
					<Link ml="auto">Create Post</Link>
				</NextLink>
			</Flex>
			<Posts></Posts>
		</Wrapper>
	</>
)

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
