import CreateBookModal from "pages/book/modals/create-book-modal";
import DeleteBookModal from "pages/book/modals/delete-book-modal";
import EditBookModal from "pages/book/modals/edit-modal";
import SearchModal from "pages/book/modals/search-modal";
import ViewModal from "pages/book/modals/view-modal";
import React from "react";

function ModalProvider() {
	return (
		<>
			<CreateBookModal />
			<DeleteBookModal />
      <EditBookModal />
      <ViewModal />
      <SearchModal/>
		</>
	);
}

export default ModalProvider;
