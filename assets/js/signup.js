(function () {
    'use strict';

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add('was-validated');
            }, false);
        });

    // Validate individual fields on input or change
    var fields = document.querySelectorAll('.needs-validation input, .needs-validation select, .needs-validation textarea');
    Array.prototype.slice.call(fields)
        .forEach(function (field) {
            field.addEventListener('input', function (event) {
                if (field.checkValidity()) {
                    field.classList.remove('is-invalid');
                } else {
                    field.classList.add('is-invalid');
                }
            });
        });
})();
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#signupForm');
    
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      
      const firstName = document.getElementById('firstname').value;
      const middleName = document.getElementById('middlename').value;
      const lastName = document.getElementById('lastname').value;
      const dob = document.getElementById('dob').value;
      const email = document.getElementById('email').value;
      const gender = document.getElementById('gender').value;
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmpassword').value;
  
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
      // Check if passwords match
      if (password !== confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Passwords do not match'
        });
        return;
      }
  
      // Check if password meets criteria
      if (!passwordPattern.test(password)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Password must contain at least 1 small letter, 1 capital letter, 1 special character, and must be at least 8 characters long'
        });
        return;
      }
  
      const userData = {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        dob: dob,
        email: email,
        gender: gender,
        username: username,
        password: password
      };
  
      // Save user data in local storage
      localStorage.setItem('userData', JSON.stringify(userData));
  
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Registration successful!'
      }).then(() => {
        // Redirect to login page
        window.location.href = 'index.html';
      });
    });
  });
  