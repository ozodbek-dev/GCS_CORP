export interface ModalStore {
	type: ModalType | null;
	data?: any;
  isOpen?: boolean;
}
export type ModalType = "addBook" | "deleteBook" | "updateBook" | "viewBook"|'searchBook';
