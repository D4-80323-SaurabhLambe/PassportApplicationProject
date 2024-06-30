document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const name = form.querySelector('input[name="name"]').value.trim();
      const email = form.querySelector('input[name="email"]').value.trim();
      const subject = form.querySelector('select[name="subject"]').value;
      const message = form.querySelector('textarea[name="message"]').value.trim();
  
      // Enable Bootstrap validation
      if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add("was-validated");
        return;
      }
  
      // Validate the fields
      if (!name || !email || !subject || !message) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "All fields are required!",
        });
        return;
      }
  
      // Custom validation for name
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(name)) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Name must contain only letters!",
        });
        return;
      }
  
      // Custom validation for email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please enter a valid email address!",
        });
        return;
      }
  
      if (name && email && subject && message) {
        // Store feedback data in local storage
        const feedbackData = {
          name: name,
          email: email,
          subject: subject,
          message: message,
        };
  
        let feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];
        feedbackList.push(feedbackData);
        localStorage.setItem("feedbackList", JSON.stringify(feedbackList));
  
        // Display SweetAlert message and redirect to userDashboard.html
        Swal.fire({
          icon: "success",
          title: "Feedback Submitted",
          text: "Thank you for your feedback!",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "userDashboard.html";
          }
        });
  
        // Clear form fields
        form.reset();
        form.classList.remove("was-validated");
      } else {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please fill out all fields correctly.",
        });
      }
    });
  });
  