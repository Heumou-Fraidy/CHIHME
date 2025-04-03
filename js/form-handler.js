document.getElementById('appointment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formDataObj = {};
    formData.forEach((value, key) => { formDataObj[key] = value });
    
    // Prepare email data
    const emailData = {
        to: "fraidyheumou@gmail.com",
        subject: "New Appointment Request: " + formDataObj.subject,
        message: `
            New appointment request details:
            
            Name: ${formDataObj.name}
            Email: ${formDataObj.email}
            Phone: ${formDataObj.phone || 'Not provided'}
            Date: ${formDataObj.date}
            Appointment Type: ${formDataObj.appointment_type}
            Subject: ${formDataObj.subject}
            
            Message:
            ${formDataObj.message}
        `
    };
    
    // Send the data using EmailJS service
    emailjs.send('service_iwk5tme', 'template_li89ao5', emailData, 'wAXPD3Z9bahWpYb87')
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Your appointment request has been sent successfully! We will contact you shortly.');
            document.getElementById('appointment-form').reset();
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send your appointment request. Please try again later or contact us directly.');
        });
});