import Header from "components/layout/header";
const ErrorPage = () => {
	return (
		<div className='h-[90vh] flex flex-col gap-[2rem] items-center justify-center'>
			<Header />
			<main className='main'>
				<h1 className='h1'>
					4<span>&#xf6e2;</span>4
				</h1>
				<h2 className='h2'>{"Error: 404 page not found"}</h2>
				<p className='p'>{"Oops! Something went wrong"}</p>
			</main>
		</div>
	);
};

export default ErrorPage;
