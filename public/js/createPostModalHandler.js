const postContainer = document.querySelector('.my_posts');
const dialog = document.querySelector('#PostDialog');



postContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains('close_modal')) {
        dialog.close();
    }

    if (event.target.classList.contains('create_post_button')) {
        dialog.showModal();
    }

    if (event.target === dialog) {
        dialog.close();
    }

})