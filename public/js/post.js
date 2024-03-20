const dialog = document.querySelector('#createPostDialog');

const closeDialogButton = dialog.querySelector('.close_modal');
closeDialogButton.addEventListener('click', () => {
    dialog.close();
});

const createPostButton = document.querySelector('.create_post_button');

createPostButton.addEventListener('click', () => {
    dialog.showModal();
});

dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});