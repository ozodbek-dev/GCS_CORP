 import { ToastContainer } from 'react-toastify';
import ModalProvider from './modal-provider'
import { ReactNode } from 'react';

export default function ExtraProviders({children}:{children:ReactNode}) {
  return (
		<>
			<ModalProvider />
      <ToastContainer />
      {children}
		</>
	);
}


