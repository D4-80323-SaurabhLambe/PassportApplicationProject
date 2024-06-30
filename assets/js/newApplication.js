// Initialize application object from localStorage or create new if empty
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                    form.classList.add('was-validated');
                } else {
                    event.preventDefault(); // Prevent the default form submission
                    // If the form is valid, save the form data
                    let formId = form.getAttribute('id');
                    let fields;
                    let formIndex;

                    switch (formId) {
                        case 'passportServiceForm':
                            fields = ["application_type", "passport_booklet_type", "validity_required"];
                            formIndex = "passportServiceForm";
                            break;
                        case 'passportApplicantForm':
                            fields = [
                                "given_name", "surname", "known_by_other_names", "changed_name",
                                "previous_name", "gender", "dob", "place_of_birth", "district",
                                "state", "region_country", "citizenship", "aadharNo", "pan",
                                "voterNo", "employment_type", "organization_name", "education",
                                "distinguishing_mark", "father_name", "mother_name", "spouse_name", "non_ecr"
                            ];
                            formIndex = "passportApplicantForm";
                            break;
                        case 'passportAddressForm':
                            fields = [
                                "house_no_street", "address_lane1", "address_lane2",
                                "village_town_city", "present_district", "present_state", "present_pin",
                                "country", "mobile_no", "telephone_no", "email"
                            ];
                            formIndex = "passportAddressForm";
                            break;
                        case 'passportEmergencyForm':
                            fields = [
                                "emergency_name", "emergency_address", "emergency_contact_no",
                                "emergency_contact_email", "emergency_city", "present_district",
                                "emergency_pincode", "present_state"
                            ];
                            formIndex = "passportEmergencyForm";
                            break;
                        case 'passportOtherForm':
                            fields = [
                                "criminal_proceedings_pending", "warrant_summons_pending", "arrest_warrant_issued",
                                "departure_prohibited", "convicted_moral_turpitude", "refused_passport",
                                "passport_impounded", "passport_revoked", "granted_citizenship", "held_foreign_passport",
                                "surrendered_indian_passport", "renounced_indian_citizenship"
                            ];
                            formIndex = "passportOtherForm";
                            break;
                        default:
                            return;
                    }

                    saveFormData(formId, fields, formIndex);
                }
            }, false);
        });
    }, false);
})();

let application = JSON.parse(localStorage.getItem("application")) || {
    passportServiceForm: {},
    passportApplicantForm: {},
    passportAddressForm: {},
    passportEmergencyForm: {},
    passportOtherForm: {},
    passportDeclarationForm: {},
};

// Function to collect form data into the specific form object within the application object
function collectFormData(formId, fields, formIndex) {
    let form = document.getElementById(formId);
    fields.forEach((field) => {
        let input = form.querySelector(`[name="${field}"]`);
        if (input) {
            if (input.type === "radio") {
                let checked = form.querySelector(`[name="${field}"]:checked`);
                application[formIndex][field] = checked ? checked.value : null;
            } else if (input.type === "checkbox") {
                let checkboxes = form.querySelectorAll(`[name="${field}"]`);
                if (checkboxes.length > 1) {
                    application[formIndex][field] = [];
                    checkboxes.forEach((checkbox) => {
                        if (checkbox.checked) {
                            application[formIndex][field].push(checkbox.value);
                        }
                    });
                } else {
                    application[formIndex][field] = input.checked;
                }
            } else if (input.tagName === "SELECT") {
                if (input.multiple) {
                    let selectedOptions = Array.from(input.selectedOptions).map(
                        (option) => option.value
                    );
                    application[formIndex][field] = selectedOptions;
                } else {
                    application[formIndex][field] = input.value;
                }
            } else if (input.tagName === "TEXTAREA") {
                application[formIndex][field] = input.value;
            } else {
                application[formIndex][field] = input.value;
            }
        }
    });
}

// Function to generate a 10-digit unique application number
function generateApplicationNo() {
    let digits = '0123456789';
    let applicationNo = '';
    for (let i = 0; i < 10; i++) {
        applicationNo += digits[Math.floor(Math.random() * 10)];
    }
    return applicationNo;
}

// Function to show the next tab
function showNextTab() {
    let activeTab = document.querySelector(".nav-tabs .nav-link.active");
    if (activeTab) {
        let nextTab = activeTab.parentElement.nextElementSibling;
        if (nextTab) {
            nextTab.querySelector(".nav-link").click();
        }
    }
}

// Function to show the previous tab
function showPreviousTab() {
    let activeTab = document.querySelector(".nav-tabs .nav-link.active");
    if (activeTab) {
        let previousTab = activeTab.parentElement.previousElementSibling;
        if (previousTab) {
            previousTab.querySelector(".nav-link").click();
        }
    }
}

// Function to save form data to local storage and show SweetAlert
function saveFormData(formId, fields, formIndex) {
    collectFormData(formId, fields, formIndex);
    // Save application data to localStorage
    localStorage.setItem("application", JSON.stringify(application));

    // Show Swal success message with application number
    Swal.fire({
        title: "Saved!",
        text: `Your form data has been saved.`,
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
    });
}

// Attach event listeners to the Next and Previous buttons
document.querySelectorAll("#nextBtn").forEach((button) => {
    button.addEventListener("click", showNextTab);
});

document.querySelectorAll("#previousBtn").forEach((button) => {
    button.addEventListener("click", showPreviousTab);
});

// Function to save all form data and show SweetAlert
function submitAllData() {
    // Generate application number if not already generated
    if (!application.application_no) {
        application.application_no = generateApplicationNo();
    }
    
    // Set status to pending if not already set
    if (application.status === undefined) {
        application.status = false; // Pending
    }

    // Save the complete application object to local storage
    localStorage.setItem("application", JSON.stringify(application));

    // Show success message with application number and redirect to user dashboard
    Swal.fire({
        title: "Submitted!",
        text: `Your application has been submitted successfully. Application No: ${application.application_no}`,
        icon: "success",
    }).then(() => {
        window.location.href = "userDashboard.html"; // Replace with your actual dashboard URL
    });
}

// Add event listeners for form save buttons for each form
document.getElementById("saveBtnService").addEventListener("click", (event) => {
    event.preventDefault();
    let form = document.getElementById("passportServiceForm");
    if (form.checkValidity()) {
        saveFormData(
            "passportServiceForm",
            ["application_type", "passport_booklet_type", "validity_required"],
            "passportServiceForm"
        );
    } else {
        form.classList.add('was-validated');
    }
});

document.getElementById("saveBtnApplicant").addEventListener("click", (event) => {
    event.preventDefault();
    let form = document.getElementById("passportApplicantForm");
    if (form.checkValidity()) {
        saveFormData(
            "passportApplicantForm",
            [
                "given_name", "surname", "known_by_other_names", "changed_name",
                "previous_name", "gender", "dob", "place_of_birth", "district",
                "state", "region_country", "citizenship", "aadharNo", "pan",
                "voterNo", "employment_type", "organization_name", "education",
                "distinguishing_mark", "father_name", "mother_name", "spouse_name", "non_ecr"
            ],
            "passportApplicantForm"
        );
    } else {
        form.classList.add('was-validated');
    }
});

document.getElementById("saveBtnAddress").addEventListener("click", (event) => {
    event.preventDefault();
    let form = document.getElementById("passportAddressForm");
    if (form.checkValidity()) {
        saveFormData(
            "passportAddressForm",
            [
                "house_no_street", "address_lane1", "address_lane2",
                "village_town_city", "present_district", "present_state", "present_pin",
                "country", "mobile_no", "telephone_no", "email"
            ],
            "passportAddressForm"
        );
    } else {
        form.classList.add('was-validated');
    }
});

document.getElementById("saveBtnEmergency").addEventListener("click", (event) => {
    event.preventDefault();
    let form = document.getElementById("passportEmergencyForm");
    if (form.checkValidity()) {
        saveFormData(
            "passportEmergencyForm",
            [
                "emergency_name", "emergency_address", "emergency_contact_no",
                "emergency_contact_email", "emergency_city", "present_district",
                "emergency_pincode", "present_state"
            ],
            "passportEmergencyForm"
        );
    } else {
        form.classList.add('was-validated');
    }
});

document.getElementById("saveBtnOther").addEventListener("click", (event) => {
    event.preventDefault();
    let form = document.getElementById("passportOtherForm");
    if (form.checkValidity()) {
        saveFormData(
            "passportOtherForm",
            [
                "criminal_proceedings_pending", "warrant_summons_pending", "arrest_warrant_issued",
                "departure_prohibited", "convicted_moral_turpitude", "refused_passport",
                "passport_impounded", "passport_revoked", "granted_citizenship", "held_foreign_passport",
                "surrendered_indian_passport", "renounced_indian_citizenship"
            ],
            "passportOtherForm"
        );
    } else {
        form.classList.add('was-validated');
    }
});

// Add event listener for final submit button
document.getElementById("submitBtn").addEventListener("click", function (event) {
    // Prevent default form submission
    event.preventDefault();

    // Check all forms for validity
    let allFormsValid = true;
    document.querySelectorAll('.needs-validation').forEach(form => {
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            allFormsValid = false;
        }
    });

    if (allFormsValid) {
         // Save data from declaration form to local storage
         saveFormData(
            "passportDeclarationForm",
            [
                "declaration_place", "declaration_date"
            ],
            "passportDeclarationForm"
        );
        // Save all form data before final submission
        submitAllData();
    }
});
