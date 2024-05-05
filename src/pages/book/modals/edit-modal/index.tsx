import { Backdrop, Button, CircularProgress, Modal, Paper, Typography, Stack, Box } from "@mui/material";

import useModalStore from "hooks/useModalStore";
import { useHooks } from "hooks/useHooks";
import { Formik , Form} from "formik";
import { EditValidation } from "./edit-form.validation";
import TextInput from "components/fields/text-input/text-input";
import useUpdateBook from "pages/book/list/hooks/useUpdateBook";

export interface IBookProps {
	isbn: string;
	title: string;
	author: string;
	published: number;
	pages: number;
}

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	borderRadius: "20px",
	p: 4,
};

export default function EditBookModal() {
	const { get } = useHooks();
	const { onModalClose, isOpen, type, data } = useModalStore();
  const { onSubmit } = useUpdateBook();
	const initialValue: IBookProps = {
		isbn: get(data, "isbn", ""),
		title: get(data, "title", ""),
		author: get(data, "author", ""),
		published: +get(data, "published", ""),
		pages: +get(data, "pages", ""),
	};
	const open = isOpen! && type === "updateBook";
	const isLoading = false;
	return (
		<Modal
			open={open}
			onClose={() => onModalClose("updateBook")}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			sx={{ backdropFilter: "blur(4px)" }}
		>
			<Paper sx={style} elevation={3}>
				<Stack direction={"column"} gap={"2rem"}>
					<Typography fontWeight={"bold"} variant='h6' component='h2'>
						Edit: {get(data, "title", "")}
					</Typography>
					<Stack gap={"1rem"} direction={"column"} className='w-full'>
						<Formik onSubmit={onSubmit} initialValues={initialValue} validationSchema={EditValidation.book}>
							<Form className='grid grid-cols-2 items-start gap-2 '>
								<Box className='col-span-2'>
									<TextInput label='Isbn' name='isbn' type='text' placeholder='12345678901112' isRequired />
								</Box>

								<Box className='col-span-2'>
									<TextInput label='Title' name='title' type='text' placeholder='Harry Potter' isRequired />
								</Box>

								<Box className='col-span-2'>
									<TextInput label='Author' name='author' type='text' placeholder='Jhon Doe' isRequired />
								</Box>

								<TextInput label='Published' name='published' type='number' placeholder='2022' isRequired />

								<TextInput label='Pages' name='pages' type='number' placeholder='100' isRequired />

								<Box className='col-span-2'>
									<Stack direction={"row"} gap='1rem' width={"100%"}>
										<Button
											size='medium'
											type='submit'
											sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", px: 4 }}
											variant='contained'
											className='w-full !rounded-[15px]'
											disabled={isLoading}
										>
											{isLoading && (
												<CircularProgress size={15} color='inherit' variant='indeterminate' style={{ opacity: "50%" }} />
											)}
											{isLoading ? "Updating..." : "Edit Book"}
										</Button>

										<Button
											onClick={() => onModalClose("updateBook")}
											size='medium'
											color='error'
											className='w-full !rounded-[15px]'
											disabled={isLoading}
										>
											Close
										</Button>
									</Stack>
								</Box>
							</Form>
						</Formik>
					</Stack>
				</Stack>
			</Paper>
		</Modal>
	);
}
