import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";

const Layout = ({ children }) => (
	<Box>
		<Navbar />
		<Box>{children}</Box>
	</Box>
);
export default Layout;
