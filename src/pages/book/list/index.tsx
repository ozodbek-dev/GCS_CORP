import { Typography, Stack, IconButton } from "@mui/material";
import useGetAllBooks from "./hooks/useGetAllBooks";

import useModalStore from "hooks/useModalStore";
import { DataGrid } from "@mui/x-data-grid";
import { useHooks } from "hooks/useHooks";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Add, Search } from "@mui/icons-material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box } from "@mui/system";

function BooksList() {
	const { data, isLoading } = useGetAllBooks();
	const { get } = useHooks();
	const { onModalOpen } = useModalStore();
	return (
		<Stack gap={"2rem"} direction={"column"}>
			<Stack direction='row' justifyContent={"space-between"}>
				<Stack direction={"row"} gap={"1rem"} alignItems={"center"}>
					<Typography variant='h5' fontWeight={"bold"}>
						All Books
					</Typography>
					<IconButton onClick={() => onModalOpen({ type: "searchBook", data: null })} size='medium'>
						<Search fontSize='medium' />
					</IconButton>
				</Stack>

				<button
					className='border hover:bg-slate-200/20 p-4 rounded-md transition-all'
					onClick={() => onModalOpen({ type: "addBook", data: null })}
				>
					Create <Add fontSize='medium' />
				</button>
			</Stack>

			{!get(data, "data[0]", "") && !isLoading && (
				<Box className='!border p-3 flex flex-col  items-center'>
					<Typography variant='h6'>No Books Found</Typography>
					<button
						className='hover:bg-slate-200/50 p-4 rounded-md transition-all'
						onClick={() => onModalOpen({ type: "addBook", data: null })}
					>
						<Add fontSize='large' />
					</button>
				</Box>
			)}

			{!!get(data, "data[0]", "") && (
				<DataGrid
					sx={{ width: "100%" }}
					columns={[
						{
							field: "id",
							headerName: "ID",
						},
						{
							field: "title",
							headerName: "Title",
							width: 200,
						},
						{
							field: "author",
							headerName: "Author",
							width: 200,
						},

						{
							field: "isbn",
							headerName: "ISBN",
							width: 200,
							sortable: false,
						},
						{
							field: "pages",
							headerName: "Pages",
						},
						{
							field: "published",
							headerName: "Published",
						},
						{
							field: "cover",
							headerName: "Cover",
							renderCell: ({ row }: any) => {
								if (!get(row, "cover", "-")) return "-";
								return <img className='h-[50px] w-[50px] object-cover' src={get(row, "cover", "-")} alt='' />;
							},
							sortable: false,
						},
						{
							field: "actions",
							headerName: "Actions",
							width: 120,
							renderCell: ({ row }) => {
								return (
									<Stack direction={"row"} gap={1} alignItems={"center"} py={1}>
										<IconButton
											onClick={() =>
												onModalOpen({
													type: "viewBook",
													data: row,
												})
											}
											color='info'
											size='small'
										>
											<VisibilityIcon fontSize='small' />
										</IconButton>

										<IconButton onClick={() => onModalOpen({ type: "updateBook", data: row })} color='warning' size='small'>
											<ModeEditIcon fontSize='small' />
										</IconButton>

										<IconButton
											onClick={() =>
												onModalOpen({
													type: "deleteBook",
													data: row,
												})
											}
											color='error'
											size='small'
										>
											<DeleteIcon fontSize='small' />
										</IconButton>
									</Stack>
								);
							},
							sortable: false,
						},
					]}
					rows={get(data, "data", []).map(({ book }: any) => ({
						id: get(book, "id", "-") || "-",
						author: get(book, "author", "-") || "-",
						cover: get(book, "cover", "-") || "-",
						isbn: get(book, "isbn", "-") || "-",
						pages: get(book, "pages", "-") || "-",
						title: get(book, "title", "-") || "-",
						published: get(book, "published", "-") || "-",
					}))}
					getRowHeight={() => "auto"}
					loading={isLoading}
				/>
			)}
		</Stack>
	);
}

export default BooksList;
