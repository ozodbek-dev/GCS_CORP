import {  LoginOutlined } from "@mui/icons-material";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "store";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHooks } from "hooks/useHooks";
import { logOut } from "store/auth";

function Header() {
	const { dispatch } = useHooks();
	const { isLoggedIn, data } = useSelector((state: RootState) => state.auth);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const logOutHandler = () => {
		dispatch(logOut());
		handleClose();
	};
	return (
		<nav className='h-[10vh] w-full shadow-md bg-white'>
			<div className='w-[90%]  mx-auto h-full flex items-center justify-between'>
				<Link to='/' className='flex flex-col gap-1 place-items-center'>
					<MenuBookIcon fontSize='large' />
					<span>BookShelf</span>
				</Link>
				{!isLoggedIn && (<Button
						style={{
							backgroundColor: "green",
							color: "white",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							padding: "9px 20px",
						}}
						endIcon={<LoginOutlined />}
						LinkComponent={Link}
						to='/auth'
					>
						Sign In
					</Button>
				)}
				{isLoggedIn && (
					<>
						<Avatar onClick={handleClick} sx={{ cursor: "pointer" }}>
							{data?.name.charAt(0).toUpperCase()}
						</Avatar>
						<Menu
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
						>
							<MenuItem onClick={logOutHandler}>LogOut</MenuItem>
						</Menu>
					</>
				)}
			</div>
		</nav>
	);
}

export default Header;
