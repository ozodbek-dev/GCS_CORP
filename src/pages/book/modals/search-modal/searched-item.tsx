import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useHooks } from "hooks/useHooks";
import bookImagePlaceholder from "assets/book.png";
import useModalStore from "hooks/useModalStore";

function SearchedItem({ data, handleCloseSearch }: { data: any; handleCloseSearch: () => void }) {
	const { get } = useHooks();
	const { onModalOpen } = useModalStore();
  const handleClickCard = () => {
		handleCloseSearch();
		onModalOpen({ type: "viewBook", data });
	};
	return (
		<Card>
			<Box sx={{ display: "flex", justifyContent: "space-start", cursor: "pointer" }} onClick={handleClickCard}>
				<CardMedia
					component='img'
					sx={{ width: 80 }}
					image={get(data, "cover", bookImagePlaceholder)}
					alt='Live from space album cover'
				/>
				<Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
					<CardContent sx={{ flex: "1 0 auto" }}>
						<Typography
							sx={{
								overflow: "hidden",
								textOverflow: "ellipsis",
								display: "-webkit-box",
								WebkitLineClamp: 1,
								WebkitBoxOrient: "vertical",
							}}
							component='p'
							fontWeight='bold'
							variant='body1'
						>
							{get(data, "title", "No title")}
						</Typography>
						<Typography variant='subtitle1' color='text.secondary' component='div'>
							<span className='font-semibold'>Author:</span> {get(data, "author", "No Author")}
						</Typography>
						<Typography variant='subtitle1' color='text.secondary' component='div'>
							<span className='font-semibold'>Published:</span> {get(data, "published", "")}
						</Typography>
						<Typography variant='subtitle1' color='text.secondary' component='div'>
							<span className='font-semibold'>Isbn:</span> {get(data, "isbn", "")}
						</Typography>
					</CardContent>
				</Box>
			</Box>
		</Card>
	);
}

export default SearchedItem;
