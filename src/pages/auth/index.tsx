import { Button, CircularProgress, IconButton, InputAdornment, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode, useState } from "react";
import { Form, Formik } from "formik";
import { AuthValidation } from "./validation";
import TextInput from "components/fields/text-input/text-input";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useSignUpHook from "./hooks/useSignUpHook";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Navigate } from "react-router-dom";

export default function AuthPage(): ReactNode {
	const [show, setShow] = useState<boolean>(false);
  const { onSubmit,isLoading } = useSignUpHook();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	if(isLoggedIn) return Navigate({ to: "/", replace: true });
	return (
		<Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
			<Paper
				style={{ borderRadius: "20px" }}
				elevation={3}
				className='max-w-[400px] min-w-[350px] px-6 py-8 flex flex-col gap-4 w-full'
			>
				<Typography variant='h5' fontWeight='bold' textAlign='center'>
					Sign Up
				</Typography>

				<Formik
					onSubmit={onSubmit}
					initialValues={{ name: "", email: "", key: "", secret: "" }}
					validationSchema={AuthValidation.register}
				>
					<Form className='flex flex-col items-start gap-2 '>
						<TextInput label='Name' name='name' type='text' placeholder='Jhon Doe' isRequired />
						<TextInput label='Email' name='email' type='email' placeholder='info@exmple.com' isRequired />
						<TextInput
							label={"Key"}
							name='key'
							placeholder='******'
							type={!show ? "password" : "text"}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={() => setShow(!show)}
											onMouseDown={handleMouseDownPassword}
											edge='end'
										>
											{show ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
							isRequired
						/>
						<TextInput
							label={"Secret"}
							name='secret'
							placeholder='******'
							type={!show ? "password" : "text"}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={() => setShow(!show)}
											onMouseDown={handleMouseDownPassword}
											edge='end'
										>
											{show ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
							isRequired
						/>

						<Button size='large' variant='contained' type='submit' className='w-full !rounded-[15px]' disabled={isLoading}>
							{isLoading && <CircularProgress size={20} color='inherit' variant='indeterminate' style={{ opacity: "50%" }} />}
							{isLoading ? "Loading..." : "Sign Up"}
						</Button>
					</Form>
				</Formik>
			</Paper>
		</Box>
	);
}
