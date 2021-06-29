import {
	Avatar,
	Box,
	Button,
	FormLabel,
	Heading,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	ScaleFade,
	Switch,
	Text,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { usePosition } from "use-position";
import { Loading } from "../Components/Loading";
import { useAuth } from "../contexts/AuthContext";
import { getAlignmentFromShort } from "../data/alignments";
import firebase from "../firebase";
import theme from "../theme";
import Layout from "./Layout";

const LocalNews = () => {
	const [loaded, setLoaded] = useState(false);
	const [otherSide, setOtherSide] = useState(false);
	const [neutral, setNeutral] = useState(false);
	const [user, setUser] = useState({});
	const [articles, setArticles] = useState([]);

	const { currentUser } = useAuth();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const history = useHistory();
	const toast = useToast();

	const { latitude, longitude } = usePosition(true);

	const showPoliTestWarning = () => {
		console.log("No test found, opening modal.");
		onOpen();
	};

	const openExternalLink = href => {
		const a = document.createElement("a");
		a.href = href;
		a.target = "_blank";
		a.style.display = "none";

		document.body.appendChild(a);
		a.click();
		a.remove();
	};

	useEffect(() => {
		console.log(latitude, longitude);
		// get user
		firebase
			.firestore()
			.collection("users")
			.doc(currentUser.uid)
			.get()
			.then(user => user.data())
			.then(user => {
				if (!user.alignment) showPoliTestWarning();
				setUser(user);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser.uid, user.alignment]);

	useEffect(() => {
		// temp url, don't forget to change!!!!!!!!!!!!!!!
		// temp url, don't forget to change!!!!!!!!!!!!!!!
		// temp url, don't forget to change!!!!!!!!!!!!!!!

		if (!latitude || !longitude) return;

		fetch("https://us-central1-apol-hawt.cloudfunctions.net/getLocalNews", {
			method: "POST",
			mode: "cors",
			headers: {
				"content-type": "application/json; charset=utf-8",
			},
			body: JSON.stringify({
				userId: currentUser.uid,
				otherSide,
				neutral,
				coordinates: [latitude, longitude],
			}),
		})
			.then(data => data.json())
			.then(articles =>
				articles.map(article => {
					article.description =
						(article.description != null && article.description.length > 100)
							? article.description.substring(0, 100) + "..."
							: article.description;
					return article;
				})
			)
			.then(data => setArticles(data))
			.finally(() => setLoaded(true))
			.catch(err => {
				setLoaded(true);
				toast({
					title: "Something went wrong",
					description:
						"An error occured with our server; please try again later",
					status: "error",
				});
				console.log(err);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser.uid, otherSide, neutral, latitude, longitude]);

	return (
		<Layout>
			{loaded ? (
				<ScaleFade in={loaded}>
					{/* whole page thingamagic */}
					<Box
						display="flex"
						justifyContent="space-between"
						height="100%"
						flexDir={{ base: "column", lg: "row" }}>
						{/* sidebar */}
						<Box
							w="30%"
							height="80vh"
							position="static"
							rounded="lg"
							border="1px solid lightgray"
							margin="5rem 2rem"
							p="1.5rem">
							<Heading size="md" mb="2rem">
								Profile
							</Heading>
							<Box
								w="100%"
								d="flex"
								flexDir="column"
								justifyContent="center"
								alignItems="center"
								textAlign="center">
								<Avatar />
								<Heading size="md" mt={5}>
									{currentUser.displayName}
								</Heading>
								<Text size="md" mt={3}>
									{currentUser.email}
								</Text>
								<Text size="md" mt={3}>
									Alignment:{" "}
									<strong>{getAlignmentFromShort(user.alignment)}</strong>
								</Text>
								<Button
									size="sm"
									width="8.5rem"
									mt="2rem"
									colorScheme="blue"
									variant="ghost"
									onClick={() => history.push("/test")}>
									Retake the test
								</Button>
								<Button
									size="sm"
									width="8.5rem"
									mt={2}
									colorScheme="pink"
									variant="ghost"
									onClick={() =>
										firebase
											.auth()
											.signOut()
											.then(() => history.push("/"))
									}>
									Log Out
								</Button>
							</Box>
						</Box>

						{/* article listings */}
						<Box
							w="100%"
							display="flex"
							flexDir="column"
							marginTop="5rem"
							marginRight="2rem">
							<Box
								d="flex"
								alignItems="flex-start"
								justifyContent="space-between">
								<Heading mb="2rem" lineHeight="1" alignItems="center">
									Local News
								</Heading>

								<Box>
									<Box
										d="flex"
										alignItems="center"
										justifyContent="space-between"
										mt="0.3rem">
										<FormLabel fontSize="sm" mb="4px">
											Neutral Mode
										</FormLabel>
										<Switch onChange={e => setNeutral(e.target.checked)} />
									</Box>

									<Box
										d="flex"
										alignItems="center"
										justifyContent="space-between"
										mt="0.1rem">
										<FormLabel fontSize="sm" mb="4px">
											OtherSide Mode
										</FormLabel>
										<Switch onChange={e => setOtherSide(e.target.checked)} />
									</Box>
								</Box>
							</Box>

							{articles.map((article, key) => (
								<Box
									key={key}
									onClick={() => openExternalLink(article.url)}
									width="100%"
									mb="1.5rem"
									height="180px"
									rounded="lg"
									border="1px solid lightgray"
									transition="box-shadow 200ms, background-color 200ms"
									cursor="pointer"
									_hover={{
										boxShadow: "0px 0px 5px -1px #bbb",
										backgroundColor: theme.colours.offwhite + "AA",
									}}
									_active={{
										backgroundColor: theme.colours.offwhite,
										boxShadow: "none",
									}}
									display="flex"
									justifyContent="space-between"
									alignItems="center"
									p="1.5rem">
									{/* text */}
									<Box>
										<Heading size="md" width="800px" isTruncated>
											{article.title}
										</Heading>
										<Text fontSize="md" mt="0.3rem" width="800px">
											{article.description}
										</Text>
									</Box>

									{/* image */}
									<Box
										width="300px"
										height="130px"
										rounded="lg"
										bgColor="white"
										backgroundImage={`url(${article.urlToImage})`}
										backgroundSize="cover"
										backgroundPosition="center"
										backgroundRepeat="no-repeat"></Box>
								</Box>
							))}
						</Box>
					</Box>

					<Modal isOpen={isOpen} onClose={onClose} isCentered>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>Political Alignment Test</ModalHeader>
							<ModalBody>
								You haven't done the political alignment test, would you like to
								do it now?
							</ModalBody>

							<ModalFooter>
								<Button
									mr={3}
									colorScheme="blue"
									onClick={() => history.push("/test")}>
									Take the test
								</Button>
								<Button variant="ghost" onClick={onClose}>
									Close
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</ScaleFade>
			) : (
				<Loading />
			)}
		</Layout>
	);
};

export default LocalNews;
