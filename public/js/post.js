const dialog = document.querySelector('#createPostDialog');
const createPostButton = document.querySelector('.create_post_button');
const closeDialogButton = dialog.querySelector('.close_modal');

createPostButton.addEventListener('click', () => {
    dialog.showModal();
});

dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});

closeDialogButton.addEventListener('click', () => {
    dialog.close();
});