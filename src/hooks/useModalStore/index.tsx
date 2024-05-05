import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { onClose, onOpen } from "store/modal";
import { ModalStore, ModalType } from "store/modal/modal.types";

const useModalStore = () => {
	const modalStore: ModalStore = useSelector((state: RootState) => state.modal);
	const dispatch = useDispatch();
	const onModalOpen = ({ data = {}, type}: { data?: any; type: ModalType, }) => {
		dispatch(onOpen({ data, type   }));
	};
	const onModalClose = (type: ModalType) => {
		if (modalStore.type === type) {
			dispatch(onClose());
		}
	};
	return { onModalClose, onModalOpen, ...modalStore };
};

export default useModalStore;
