const forms = document.querySelectorAll('form');



forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        fetch(form.action, {
            method: form.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.redirect) {
                    return window.location.href = data.redirect;
                }
                debugger

                if (data.errors) {
                    data.errors.forEach((error) => {
                        const errorFieldElement = form.querySelector(`input[name=${error.path}] + p`);
                        errorFieldElement.textContent = error.message;
                    })
                }
                console.log(data);


            }).catch((error) => {
                console.log(error);
            })
    });
})