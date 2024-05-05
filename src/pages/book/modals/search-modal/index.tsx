import { Backdrop, Button, Modal, Paper, Typography, Stack, TextField, Box, CircularProgress } from "@mui/material";

import useModalStore from "hooks/useModalStore";
import { useHooks } from "hooks/useHooks";
import style from "../style";
import { Close } from "@mui/icons-material";
import SearchedItem from "./searched-item";
import { useState } from "react";
import useDebounce from "hooks/useDebounce";
import useSearchBookByTitle from "pages/book/list/hooks/useSearchBookByTitle";

function SearchModal() {
	const { get } = useHooks();
	const [searchValue, setSearchValue] = useState("");
	const searchText = useDebounce(searchValue, 1000);
	const { data: books, isLoading } = useSearchBookByTitle(searchText);
	const { onModalClose, isOpen, type } = useModalStore();

	const onCloseHandler = () => {
		setSearchValue("");
		onModalClose("searchBook");
	};

	const open = isOpen! && type === "searchBook";
	return (
		<Modal
			open={open}
			onClose={onCloseHandler}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			sx={{ backdropFilter: "blur(4px)" }}
		>
			<Paper sx={style} elevation={3}>
				<Stack direction={"column"} gap={"1rem"}>
					<Typography fontWeight={"bold"} variant='h6' component='h2'>
						Search
					</Typography>
					<TextField label='Search By Title' placeholder='Haryy Potter' onChange={e => setSearchValue(e.target.value)} />
					<div className='w-full h-full max-h-[50vh] overflow-auto '>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
							{isLoading && <CircularProgress size={15} color='success' />}
							{!isLoading &&
								!!get(books, "data", []).length &&
								get(books, "data", []).map((item: any) => <SearchedItem data={item} key={item.id} handleCloseSearch={onCloseHandler} />)}
							{!isLoading && !get(books, "data", []).length && <Typography textAlign={"center"}>No Books Found</Typography>}
						</Box>
					</div>

					<Button onClick={onCloseHandler} size='medium' color='error' variant='outlined' className='w-full !rounded-[15px]'>
						Close <Close fontSize='small' sx={{ ml: 1 }} />
					</Button>
				</Stack>
			</Paper>
		</Modal>
	);
}

export default SearchModal;
