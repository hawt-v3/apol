import {
	Box,
	Button,
	Heading,
	Image,
	Input,
	ScaleFade,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import Layout from "./Layout";

const Amusement = () => {
	const [content, setContent] = useState();
	const stuffRef = useRef();

	const getContent = () => {
		stuffRef.current.src = "";
		stuffRef.current.src = content;
		setContent("http://api.tronalddump.io/");
		setContent("http://api.tronalddump.io/random/meme");
	};

	return (
		<Layout>
			<ScaleFade in={true}>
				<Box
					width="100%"
					h="60vh"
					d="flex"
					justifyContent="space-between"
					alignItems="center"
					flexDir="column">
					<Box
						w="20%"
						mt="10rem"
						mb="3rem"
						d="flex"
						justifyContent="center"
						alignItems="center"
						flexDir="column">
						<Heading mb={5}>Amusement</Heading>
						<Input
							disabled
							type="email"
							placeholder="See what happens :wink:"
							ref={stuffRef}
						/>
						<Button
							size="sm"
							width="10rem"
							colorScheme="blue"
							mt={8}
							onClick={getContent}>
							Amuse Thineself
						</Button>
					</Box>
					{content && (
						<Image
							ref={stuffRef}
							wdith="400px"
							height="350px"
							src={content}
							alt="donald funneh man"
						/>
					)}
				</Box>
			</ScaleFade>
		</Layout>
	);
};

export default Amusement;
