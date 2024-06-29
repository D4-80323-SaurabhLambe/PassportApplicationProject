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
