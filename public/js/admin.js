const adminCntainer = document.querySelector('.admin');


adminCntainer.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete_user')) {
        const id = e.target.dataset.id;
        const res = await fetch(`/admin/delete/${id}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            e.target.parentElement.remove();
        }
    }
});