const allPostContainer = document.querySelector('.my_posts');


const postContentCash = new Map();


allPostContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains('delete_post')) {
        const postId = event.target.dataset.id;

        fetch(`/posts/delete/${postId}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.ok) {
                event.target.closest('.post').remove();
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    if (event.target.classList.contains('edit_post')) {
        const postId = event.target.dataset.id;
        const postContent = event.target.parentElement.parentElement.querySelector('.post_content');
        const postTitle = event.target.parentElement.parentElement.querySelector('.post_title');
        console.log(postContent);
        if (!postContent.hasAttribute('contenteditable')) {
            postContentCash.set(postId, JSON.stringify({
                title: postTitle.textContent,
                content: postContent.textContent,
            }));

            event.target.textContent = 'Save';
            postContent.setAttribute('contenteditable', 'true');
            postTitle.setAttribute('contenteditable', 'true');
        } else {
            const data = {
                title: postTitle.textContent,
                content: postContent.textContent,
            }


            const currentContent = JSON.stringify(data);

            if (postContentCash.get(postId) === currentContent) {
                event.target.textContent = 'Edit';
                postContent.removeAttribute('contenteditable');
                postTitle.removeAttribute('contenteditable');
                return;
            }

            fetch(`/posts/update/${postId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then((response) => {
                if (response.ok) {
                    console.log('Post updated');
                    event.target.textContent = 'Edit';
                    postContent.removeAttribute('contenteditable');
                    postTitle.removeAttribute('contenteditable');
                }

                return response.json();
            }).then((data) => {
                if (data.errors) {
                    data.errors.forEach((error) => {
                        if (error.path === "title") {
                            postTitle.classList.add('error');
                            postTitle.textContent = error.message;
                        }

                        if (error.path === "content") {
                            postContent.classList.add('error');
                            postContent.textContent = error.message;
                        }
                    })
                } else {
                    postTitle.classList.remove('error');
                    postContent.classList.remove('error');
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }
})