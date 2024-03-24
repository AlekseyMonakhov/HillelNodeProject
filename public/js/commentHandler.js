const main = document.querySelector('main');


main.addEventListener('click', (event) => {

    if (event.target.classList.contains("comment_delete")) {
        const commentId = event.target.dataset.commentId;
        console.log(commentId, "this is the comment id");
        fetch(`/comments/delete/${commentId}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.ok) {
                event.target.closest('.comment').remove();
            }
        }).catch((error) => {
            console.log(error);
        });
    }


    if (event.target.classList.contains("add_comment")) {
        event.preventDefault();
        const form = event.target.closest('.comment_form');

        const formData = new FormData(form);

        const data = {
            content: formData.get('content'),
            postId: formData.get('post_id'),
        }

        fetch('/comments/create/' + data.postId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if (response.ok) {
                window.location.reload();
            }
        }).catch((error) => {
            console.log(error);
        });

    }
})