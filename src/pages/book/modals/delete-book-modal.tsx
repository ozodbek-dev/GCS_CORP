import { Backdrop, Button, CircularProgress, Modal, Paper, Typography, Stack } from "@mui/material";
import useModalStore from "hooks/useModalStore";
import { useHooks } from "hooks/useHooks";
import { toast } from "react-toastify";
import useRefetchQuery from "hooks/useRefetchQueries";
import style from "./style";
import useHttpRequest from "hooks/useHttpRequest";

export default function DeleteBookModal() {
	const { get } = useHooks();
	const { onModalClose, isOpen, type, data } = useModalStore();
	const { mutate, isLoading } = useHttpRequest();
	const refetchAllBooks = useRefetchQuery(["GET_ALL_BOOKS"]);

	const onDelete = () => {
		mutate(
			{
        url: `/books/${get(data, "id", "")}`,
        method: "delete",
			},
			{
				onSuccess: () => {
          refetchAllBooks();
					toast.success("Book Deleted Successfully!");
					onModalClose("deleteBook");
				},
				onError: error => {
					if (get(error, "response.data.message")) {
						toast.error(`Error Occured: ${get(error, "response.data.message")}`);
					} else {
						toast.error(`Something Went wrong! Please Try again`);
						console.log(error);
					}
				},
			}
		);
	};
	const open = isOpen! && type === "deleteBook";
	return (
		<Modal
			open={open}
			onClose={() => onModalClose("deleteBook")}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			sx={{ backdropFilter: "blur(4px)" }}
		>
			<Paper sx={style} elevation={3}>
				<Stack direction={"column"} gap={"2rem"}>
					<Typography fontWeight={"bold"} variant='h6' component='h2'>
						Delete Book {get(data, "id", "")}
					</Typography>
					<Stack gap={"1rem"} direction={"column"} className='w-full'>
						<Typography variant='body1' component='p'>
							Are you sure you want to delete this book?
						</Typography>
						<Stack direction={"row"} gap='1rem'>
							<Button
								size='medium'
								onClick={onDelete}
								sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", px: 4 }}
								variant='contained'
								className='w-full !rounded-[15px]'
								disabled={isLoading}
							>
								{isLoading && <CircularProgress size={15} color='inherit' variant='indeterminate' style={{ opacity: "50%" }} />}
								{isLoading ? "Deleting..." : "Yes"}
							</Button>
							<Button
								onClick={() => onModalClose("deleteBook")}
								size='medium'
								color='error'
								className='w-full !rounded-[15px]'
								disabled={isLoading}
							>
								No
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Paper>
		</Modal>
	);
}
