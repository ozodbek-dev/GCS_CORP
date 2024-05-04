// Import images
import React from "react";
import { Box } from "@mui/material";
import Header from "./header";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
	return (
		<Box className='h-full'>
			<Header />
			<main className="w-[90%] mx-auto min-h-[90vh] py-[2rem]">
				<Outlet />
			</main>
		</Box>
	);
};

export default Layout;
