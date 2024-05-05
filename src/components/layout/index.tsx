// Import images
import React from "react";
import { Box } from "@mui/material";
import Header from "./header";
import { Outlet } from "react-router-dom";
import ModalProvider from "components/extra-providers/modal-provider";

const Layout: React.FC = () => {
	return (
		<>
			<ModalProvider/>
			<Box className='h-full'>
				<Header />
				<main className='w-[90%] mx-auto min-h-[90vh] py-[2rem]'>
					<Outlet />
				</main>
			</Box>
		</>
	);
};

export default Layout;
