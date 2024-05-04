import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default  function Loader() {
	return (
		<Box position='fixed' top='0' left='0' display={"flex"} alignItems={"center"} justifyContent={"center"}>
			<CircularProgress color='success' />
		</Box>
	);
}

