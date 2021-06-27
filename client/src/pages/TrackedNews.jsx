import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Fade,
	FormLabel,
	Heading,
	IconButton,
	Input,
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
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Loading } from "../Components/Loading";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import theme from "../theme";
import Layout from "./Layout";

const TrackedNews = () => {
	const [loaded, setLoaded] = useState(false);
	const [otherSide, setOtherSide] = useState(false);
	const [userLoaded, setUserLoaded] = useState(false);
	const [tracks, setTracks] = useState([]);
	const [user, setUser] = useState({});
	const [articles, setArticles] = useState([]);
	const trackRef = useRef();

	const { currentUser } = useAuth();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const history = useHistory();
	const toast = useToast();

	const removeItem = (arr, value) => {
		var index = arr.indexOf(value);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	};

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

	// update tracks live

	useEffect(() => {
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
				setTracks(user.tracks ? user.tracks : []);
				setUserLoaded(true);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser.uid, user.alignment]);

	const updateUserTracks = async tracks =>
		firebase.firestore().doc(`users/${currentUser.uid}`).update({ tracks });

	useEffect(() => {
		setArticles([]);
		if (tracks.length === 0) {
			setLoaded(true);
			return;
		}
		// temp url, don't forget to change!!!!!!!!!!!!!!!
		// temp url, don't forget to change!!!!!!!!!!!!!!!
		// temp url, don't forget to change!!!!!!!!!!!!!!!
		fetch(
			"https://us-central1-apol-hawt.cloudfunctions.net/getTrackedArticles",
			{
				method: "POST",
				mode: "cors",
				headers: {
					"content-type": "application/json; charset=utf-8",
				},
				body: JSON.stringify({
					userId: currentUser.uid,
					otherSide,
					tracks,
				}),
			}
		)
			.then(data => data.json())
			.then(articles =>
				articles.map(article => {
					article.description =
						article.description.length > 100
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
	}, [currentUser.uid, otherSide, tracks]);

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
								Choose Your Tracks
							</Heading>
							<Fade in={userLoaded}>
								<Box
									w="100%"
									d="flex"
									flexDir="column"
									justifyContent="center"
									alignItems="flex-start"
									textAlign="center">
									{tracks.map((track, key) => (
										<Box
											key={key}
											d="flex"
											justifyContent="space-between"
											w="100%"
											mt={5}>
											<Input
												width="80%"
												border="1px solid lightgray"
												_disabled={{
													border: "1px solid lightgray",
												}}
												_placeholder={{
													textAlign: "center",
												}}
												disabled
												placeholder={track}
												size="sm"
												rounded="full"
											/>
											<IconButton
												onClick={() =>
													setTracks(prev => {
														let newArr = removeItem(prev, track);
														console.log(newArr);
														updateUserTracks([...newArr]);
														return [...newArr];
													})
												}
												colorScheme="red"
												variant="ghost"
												icon={<CloseIcon fontSize="14" />}
												size="sm"
												rounded="full"
											/>
										</Box>
									))}
									<Box d="flex" justifyContent="space-between" w="100%" mt={8}>
										<Input
											width="80%"
											border="1px solid gray"
											textAlign="center"
											_placeholder={{
												textAlign: "center",
											}}
											ref={trackRef}
											placeholder="Eg. Elon Musk"
											size="sm"
											rounded="full"
										/>
										<IconButton
											onClick={() =>
												setTracks(prev => {
													const track = trackRef.current.value;

													if (tracks.find(t => t === track)) {
														toast({
															description: "Track already exists",
															status: "error",
															duration: 1000,
														});
														return prev;
													}
													if (track.length < 3) {
														toast({
															description: "Track name too short",
															status: "error",
															duration: 1000,
														});
														return prev;
													}
													updateUserTracks([...prev, track]);
													return [...prev, track];
												})
											}
											colorScheme="green"
											variant="ghost"
											icon={<AddIcon fontSize="14" />}
											size="sm"
											rounded="full"
										/>
									</Box>
								</Box>
							</Fade>
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
								<Heading mb="2rem" lineHeight="1">
									Tracked News
								</Heading>

								<Box d="flex" alignItems="center" justifyContent="center">
									<Box
										d="flex"
										alignItems="center"
										justifyContent="space-between"
										mt="0.5rem">
										<FormLabel fontSize="sm" mb="4px">
											OtherSide Mode
										</FormLabel>
										<Switch onChange={e => setOtherSide(e.target.checked)} />
									</Box>
								</Box>
							</Box>

							{tracks.length === 0 && (
								<Heading size="md" fontWeight="normal">
									Please add a track to see this page :P
								</Heading>
							)}
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

export default TrackedNews;
