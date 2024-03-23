const forms = document.querySelectorAll('form');



forms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        const json = JSON.stringify(data);


        try {
            const response = await fetch(form.action, {
                method: form.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: json,
            });

            if (response.ok) {
                if (response.url.includes("auth")) {
                    return window.location = "/my-posts"
                }

                return window.location.reload();
            }
            const responseJson = await response.json();


            if (responseJson.errors) {
                responseJson.errors.forEach((error) => {
                    const errorFieldElement = form.querySelector(`[name=${error.path}] + p`);
                    errorFieldElement.textContent = error.message;
                })
            }

        } catch (error) {
            console.log(error);
        }
    });
})