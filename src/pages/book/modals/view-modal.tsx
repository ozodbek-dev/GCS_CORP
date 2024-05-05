import { Backdrop, Button, Modal, Paper, Typography, Stack } from "@mui/material";

import useModalStore from "hooks/useModalStore";
import { useHooks } from "hooks/useHooks";
import style from "./style";
import { Close, Delete, Edit } from "@mui/icons-material";

function ViewModal() {
	const { get } = useHooks();
	const { onModalClose, isOpen, type, data, onModalOpen } = useModalStore();

	const open = isOpen! && type === "viewBook";
	return (
		<Modal
			open={open}
			onClose={() => onModalClose("viewBook")}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			sx={{ backdropFilter: "blur(4px)" }}
		>
			<Paper sx={style} elevation={3}>
				<Stack direction={"column"} gap={"1rem"}>
					<Typography fontWeight={"bold"} variant='h6' component='h2'>
						Detailes
					</Typography>
					<Stack gap={"1rem"} direction={"column"} className='w-full'>
						<Typography variant='body1' component='p'>
							Are you sure you want to delete this book?
						</Typography>
						<Stack direction={"row"} gap='1rem'>
							<img className='w-[150px]  object-cover' src={get(data, "cover", "")} alt={get(data, "title", "")} />
							<Stack direction={"column"} gap={"0.4rem"}>
								<Typography fontWeight={"bold"}>
									Published: <span className='font-normal'>{get(data, "published", "-")}</span>
								</Typography>
								<Typography fontWeight={"bold"}>
									Pages: <span className='font-normal'>{get(data, "pages", "-")}</span>
								</Typography>
								<Typography fontWeight={"bold"}>
									Author: <span className='font-normal'>{get(data, "author", "-")}</span>
								</Typography>
								<Typography fontWeight={"bold"}>
									ISBN: <span className='font-normal'>{get(data, "isbn", "-")}</span>
								</Typography>
								<Stack mt={"auto"} direction={"row"} gap='1rem'>
									<Button
										onClick={() => {
											onModalOpen({
												type: "updateBook",
												data: data,
											});
										}}
										variant='contained'
										size='small'
									>
										<Edit fontSize='small' />
									</Button>
									<Button
										onClick={() => {
											onModalOpen({
												type: "deleteBook",
												data: data,
											});
										}}
										variant='contained'
										color='error'
										size='small'
									>
										<Delete fontSize='small' />
									</Button>
								</Stack>
							</Stack>
						</Stack>

						<Stack direction={"row"} gap='1rem'>
							<Button
								onClick={() => onModalClose("viewBook")}
								size='medium'
								color='error'
								variant='outlined'
								className='w-full !rounded-[15px]'
							>
								Close <Close fontSize='small' sx={{ ml: 1 }} />
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Paper>
		</Modal>
	);
}

export default ViewModal;
