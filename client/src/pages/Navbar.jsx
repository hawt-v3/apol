import {
	ChevronDownIcon,
	ChevronRightIcon,
	CloseIcon,
	HamburgerIcon,
} from "@chakra-ui/icons";
import {
	Box,
	Button,
	Collapse,
	Flex,
	Icon,
	IconButton,
	Link,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";

const Navbar = () => {
	const { isOpen, onToggle } = useDisclosure();
	const history = useHistory();

	const { currentUser } = useAuth();

	return (
		<Box>
			<Flex
				bg={useColorModeValue("white", "gray.800")}
				color={useColorModeValue("gray.600", "white")}
				minH={"60px"}
				py={{ base: 2 }}
				px={{ base: 4 }}
				boxShadow="0px 2px 8px -1px #DDD"
				borderColor={useColorModeValue("gray.200", "gray.900")}
				align={"center"}>
				<Flex
					flex={{ base: 1, md: "auto" }}
					ml={{ base: -2 }}
					display={{ base: "flex", md: "none" }}>
					<IconButton
						onClick={onToggle}
						icon={
							isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
						}
						variant={"ghost"}
						aria-label={"Toggle Navigation"}
					/>
				</Flex>
				<Flex
					flex={{ base: 1 }}
					justify={{ base: "center", md: "start" }}
					pl={2}>
					<Text
						textAlign={useBreakpointValue({ base: "center", md: "left" })}
						fontFamily={"heading"}
						fontWeight="bolder"
						letterSpacing="1px">
						<span style={{ color: "#007e94" }}>A-</span>
						<span style={{ color: "#ff6961" }}>POL</span>
					</Text>

					<Flex display={{ base: "none", md: "flex" }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={"flex-end"}
					alignItems="center"
					direction={"row"}
					spacing={6}>
					{currentUser ? (
						<>
							<Button variant="ghost" size="sm">
								Profile
							</Button>
							<Button
								size="sm"
								display={{ base: "none", md: "inline-flex" }}
								fontSize={"sm"}
								variant="outline"
								fontWeight={600}
								colorScheme="pink"
								onClick={() =>
									firebase
										.auth()
										.signOut()
										.then(() => history.push("/"))
								}>
								Log out
							</Button>
						</>
					) : (
						<>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => history.push("/login")}>
								Sign In
							</Button>
							<Button
								size="sm"
								display={{ base: "none", md: "inline-flex" }}
								fontSize={"sm"}
								variant="outline"
								fontWeight={600}
								colorScheme="pink"
								onClick={() => history.push("/register")}>
								Sign Up
							</Button>
						</>
					)}
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</Box>
	);
};

const DesktopNav = () => {
	const linkColor = useColorModeValue("gray.600", "gray.200");
	const linkHoverColor = useColorModeValue("gray.800", "white");
	const popoverContentBgColor = useColorModeValue("white", "gray.800");

	return (
		<Stack direction={"row"} spacing={4}>
			{NAV_ITEMS.map(navItem => (
				<Box key={navItem.label}>
					<Popover trigger={"hover"} placement={"bottom-start"}>
						<PopoverTrigger>
							<Link
								p={2}
								to={navItem.href ?? "#"}
								fontSize={"sm"}
								as={RouterLink}
								fontWeight={500}
								color={linkColor}
								transition="background-color 200ms"
								borderRadius="6px"
								_hover={{
									textDecoration: "none",
									color: linkHoverColor,
									bgColor: "pink.50",
								}}
								_focus={{
									outline: "none",
									bgColor: "pink.50",
								}}>
								{navItem.label}
							</Link>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={"xl"}
								bg={popoverContentBgColor}
								p={4}
								rounded={"xl"}
								minW={"sm"}>
								<Stack>
									{navItem.children.map(child => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const DesktopSubNav = ({ label, href, subLabel }) => {
	return (
		<Link
			as={RouterLink}
			to={href}
			role={"group"}
			display={"block"}
			p={2}
			rounded={"md"}
			_hover={{ bg: useColorModeValue("pink.50", "gray.900") }}>
			<Stack direction={"row"} align={"center"}>
				<Box>
					<Text
						transition={"all .3s ease"}
						_groupHover={{ color: "pink.400" }}
						fontWeight={500}>
						{label}
					</Text>
					<Text fontSize={"sm"}>{subLabel}</Text>
				</Box>
				<Flex
					transition={"all .3s ease"}
					transform={"translateX(-10px)"}
					opacity={0}
					_groupHover={{ opacity: "100%", transform: "translateX(0)" }}
					justify={"flex-end"}
					align={"center"}
					flex={1}>
					<Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
				</Flex>
			</Stack>
		</Link>
	);
};

const MobileNav = () => {
	return (
		<Stack
			bg={useColorModeValue("white", "gray.800")}
			p={4}
			display={{ md: "none" }}>
			{NAV_ITEMS.map(navItem => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({ label, children, href }) => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				py={2}
				as={RouterLink}
				to={href ?? "#"}
				justify={"space-between"}
				align={"center"}
				_hover={{
					textDecoration: "none",
				}}>
				<Text
					fontWeight={600}
					color={useColorModeValue("gray.600", "gray.200")}>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={"all .25s ease-in-out"}
						transform={isOpen ? "rotate(180deg)" : ""}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={"solid"}
					borderColor={useColorModeValue("gray.200", "gray.700")}
					align={"start"}>
					{children &&
						children.map(child => (
							<Link as={RouterLink} key={child.label} py={2} to={child.href}>
								{child.label}
							</Link>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

const NAV_ITEMS = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "News",
		children: [
			{
				label: "General News",
				subLabel: "Take a look at all the news.",
				href: "/news",
			},
			{
				label: "Local News",
				subLabel: "Get a look at what's happening around you.",
				href: "/news/local",
			},
			{
				label: "Search",
				subLabel: "Inquire and learn what you seek.",
				href: "/news/search",
			},
		],
	},
	{
		label: "Political Compass Test",
		children: [
			{
				label: "Take the test",
				subLabel: "Find out where you stand!",
				href: "/test",
			},
			{
				label: "About the test",
				subLabel: "Find out about our proprietary testing method",
				href: "/about/test",
			},
		],
	},
	{
		label: "About Us",
		children: [
			{
				label: "About APOL",
				subLabel: "Learn about how we came around",
				href: "/about/us",
			},
			{
				label: "The algorithm",
				subLabel: "Learn about how we do it",
				href: "/about/algorithm",
			},
		],
	},
	{
		label: "Amusement",
		href: "/amusement",
	},
];

export default Navbar;
