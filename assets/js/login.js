(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
})()

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#loginForm');
  
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting the traditional way
  
      // Get username and password from the form
      const username = document.querySelector('#username').value;
      const password = document.querySelector('#password').value;
  
      // Simple validation
      if (username.trim() === '' || password.trim() === '') {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please enter both username and password'
        });
        return;
      }
  
      // Retrieve user data from local storage
      const storedUserData = JSON.parse(localStorage.getItem('userData'));
  
      if (!storedUserData) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No user data found. Please register first.'
        });
        return;
      }
  
      // Check if the username and password match the stored data
      if (username === storedUserData.username && password === storedUserData.password) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Login successful!'
        }).then(() => {
          // Redirect to dashboard or index page
          window.location.href = 'userDashboard.html';
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid username or password'
        });
      }
    });
  });
  