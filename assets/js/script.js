// JavaScript for Dark Mode Toggle and Form Submission

// Dark Mode Toggle
const toggleSwitch = document.createElement('button');
toggleSwitch.innerText = 'Toggle Dark Mode';
document.body.appendChild(toggleSwitch);

toggleSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Form Submission Handling
const form = document.querySelector('form'); // Assuming a form exists
if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
        fetch('https://alliances.lerionjakenwauda.com/form-api.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            // Handle success
            console.log('Success:', data);
        })
        .catch((error) => {
            // Handle error
            console.error('Error:', error);
        });
    });
}
