 import { ToastContainer } from 'react-toastify';
import { ReactNode } from 'react';

export default function ExtraProviders({children}:{children:ReactNode}) {
  return (
		<>
      <ToastContainer />
      {children}
		</>
	);
}


