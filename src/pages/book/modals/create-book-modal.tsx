import { Add, Close } from "@mui/icons-material";
import { Backdrop, Button, CircularProgress, Modal, Paper, Typography, Stack } from "@mui/material";

import TextInput from "components/fields/text-input/text-input";
import { Form, Formik } from "formik";
import useModalStore from "hooks/useModalStore";
import * as Yup from "yup";
import useAddBook from "../list/hooks/useAddBook";
import style from "./style";



const validation = {
	addBook() {
		return Yup.object({
			isbn: Yup.string()
				.min(3, "Isbn must be at least 3 characters")
				.required("Isbn is required"),
		});
	},
};

export default function CreateBookModal() {
	const { onModalClose, isOpen, type } = useModalStore();
	const { onSubmit, isLoading } = useAddBook();
	const open = isOpen! && type === "addBook";
	return (
		<Modal
			open={open}
			onClose={() => onModalClose("addBook")}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			sx={{ backdropFilter: "blur(4px)" }}
		>
			<Paper sx={style} elevation={3}>
				<Stack direction={"column"} gap={"2rem"}>
					<Typography fontWeight={"bold"} variant='h6' component='h2'>
						Add Book
					</Typography>

					<Formik onSubmit={onSubmit} initialValues={{ isbn: "" }} validationSchema={validation.addBook}>
						<Form className='flex flex-col items-start gap-4 '>
							<TextInput label='Isbn' name='isbn' type='text' placeholder='Jhon Doe' isRequired />

							<Stack direction={"row"} gap='1rem'>
								<Button
									size='medium'
									sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", px: 4 }}
									variant='contained'
									type='submit'
									className='w-full !rounded-[15px]'
									disabled={isLoading}
								>
									{isLoading && <CircularProgress size={15} color='inherit' variant='indeterminate' style={{ opacity: "50%" }} />}
									{isLoading ? "Loading..." : "Submit"}
									{!isLoading && <Add fontSize='medium' sx={{ ml: 1 }} />}
								</Button>
								<Button
									onClick={() => onModalClose("addBook")}
									size='medium'
									color='error'
									className='w-full !rounded-[15px]'
									disabled={isLoading}
								>
									Close <Close fontSize='small' sx={{ ml: 1 }} />
								</Button>
							</Stack>
						</Form>
					</Formik>
				</Stack>
			</Paper>
		</Modal>
	);
}
