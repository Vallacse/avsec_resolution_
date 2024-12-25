// script.js

document
    .getElementById("certificate-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form data
        const name = document.getElementById("name").value;
        const photo = document.getElementById("photo").files[0];
        const message = document.getElementById("message").value;

        // Display data in the popup
        document.getElementById("popup-name").textContent = name;
        document.getElementById("popup-message").textContent = message;

        // Show the uploaded photo in the popup
        const photoReader = new FileReader();
        photoReader.onload = function (e) {
            document.getElementById("popup-photo").src = e.target.result;
        };

        if (photo) {
            photoReader.readAsDataURL(photo);
        }

        // Display the popup
        document.getElementById("popup").style.display = "flex";
    });

// Close the popup
document.getElementById("close-popup").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
    document.resolution.reset();
});

// Print the certificate
document.getElementById("print-btn").addEventListener("click", function () {
    const name = document.getElementById("popup-name").textContent;
    const message = document.getElementById("popup-message").textContent;
    const photoSrc = document.getElementById("popup-photo").src;
    // const dated = document.getElementById("date").textContent;

    // Create the certificate content
    const certificateContent = `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vertical Certificate</title>
<style>
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.certificate {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-image: url(./certificate.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    width: 50%;
    max-width: 800px;
    height: 100%;
    max-height: 1200px;
    border: 5px solid #333;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
}

.left-panel {
    width: 20%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 45px;
    padding-top: 70px;
    gap: 40px;
}

.left-panel img {
    max-width: 60px;
    margin-bottom: 20px;
    border-radius: 500px;
    padding-top: 10px;
}

.left-panel h1 {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-size: 24px;
    color: #333;
    margin: 0;
    font-weight: bold;
}

.right-panel {
    flex: 1;
    padding: 40px;
    text-align: center;
}

.right-panel .photo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #333;
    margin: 10px auto;
}

.right-panel .recipient {
    font-size: 20px;
    color: #555;
}

.right-panel .name {
    font-size: 28px;
    font-weight: bold;
    color: #333;
    margin: 5px 0;
}

.right-panel .content {
    font-size: 18px;
    color: #555;
    margin: 10px 0;
}

.right-panel .course-name {
    font-size: 22px;
    font-weight: bold;
    color: #333;
}

.footer {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
}

.footer .signature {
    text-align: left;
    font-size: 16px;
}

.footer .signature-line {
    width: 150px;
    border-top: 2px solid #333;
    margin-top: 5px;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .certificate {
        flex-direction: column;
        width: 90%;
        height: auto;
        max-height: none;
    }

    .left-panel {
        width: 100%;
        padding: 20px;
        text-align: center;
    }

    .left-panel img {
        max-width: 80px;
    }

    .left-panel h1 {
        font-size: 20px;
        margin-top: 10px;
        transform: unset;
        writing-mode: unset;
    }

    .right-panel {
        padding: 20px;
        text-align: center;
    }

    .right-panel .photo {
        width: 80px;
        height: 80px;
    }

    .right-panel .name {
        font-size: 24px;
    }

    .right-panel .content {
        font-size: 16px;
    }

    .right-panel .course-name {
        font-size: 18px;
    }

    .footer .signature {
        text-align: center;
        font-size: 14px;
    }

    .footer .signature-line {
        width: 100px;
    }
}

@media (max-width: 480px) {
    .certificate {
        width: 100%;
        height: auto;
    }

    .left-panel {
        width: 100%;
        padding: 10px;
        text-align: center;
    }

    .left-panel img {
        max-width: 70px;
    }

    .left-panel h1 {
        font-size: 18px;
        margin-top: 5px;
        transform: unset;
        writing-mode: unset;
    }

    .right-panel .photo {
        width: 70px;
        height: 70px;
    }

    .right-panel .name {
        font-size: 20px;
    }

    .right-panel .content {
        font-size: 14px;
    }

    .right-panel .course-name {
        font-size: 16px;
    }

    .footer .signature {
        text-align: center;
        font-size: 12px;
    }

    .footer .signature-line {
        width: 80px;
    }
}
</style>
</head>
<body>
    <div class="certificate">
        <!-- Left panel with vertical logo and title -->
        <div class="left-panel">
            <img src="./logo.png" alt="" class="">
            <h1>Certificate of Achievement</h1>
        </div>

        <!-- Right panel with recipient details -->
        <div class="right-panel">
            <p class="recipient">This is to certify that</p>
            <img src="${photoSrc}" alt="Recipient Photo" class="photo">
            <h2 class="name">${name}</h2>
            <p class="content">has successfully completed</p>
            <h3 class="course-name">"${message}"</h3>
            <div class="footer">
                <div class="signature">
                    <p>AVS Engineering College</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;

    // Open a new window and write the certificate content to it
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(certificateContent);
    printWindow.document.close();

    let date = new Date();

    let formattedDate = date.toLocaleDateString();

    // Trigger the print dialog
    printWindow.print();

    // Close the popup after printing
    document.getElementById("popup").style.display = "none";
});

// Show or hide custom resolution field based on "Other" selection
function checkOtherOption() {
    var messageValue = document.getElementById("message").value;
    if (messageValue === "OTHERS") {
        document.getElementById("otherResolution").style.display = "block";
    } else {
        document.getElementById("otherResolution").style.display = "none";
    }
}

// Show or hide custom category field based on "Other" selection
function checkCategoryOther() {
    var categoryValue = document.getElementById("category").value;
    if (categoryValue === "Other") {
        document.getElementById("otherCategory").style.display = "block";
    } else {
        document.getElementById("otherCategory").style.display = "none";
    }
}

// Handle form submission
document
    .getElementById("certificate-form")
    .addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        var name = document.getElementById("name").value;
        var photoFile = document.getElementById("photo").files[0];
        var message = document.getElementById("message").value;
        var category = document.getElementById("category").value;

        // Handle custom message (if selected "OTHERS")
        if (message === "OTHERS") {
            message = document.getElementById("othermessage").value;
        }

        // Handle custom category (if selected "Other")
        if (category === "Other") {
            category = document.getElementById("otherCategoryInput").value;
        }

        // Display popup with data
        document.getElementById("popup-name").textContent = name;
        document.getElementById("popup-message").textContent = message;
        document.getElementById("popup-category").textContent = category;

        // Display photo preview
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("popup-photo").src = e.target.result;
        };
        reader.readAsDataURL(photoFile);

        // Show the popup
        document.getElementById("popup").style.display = "block";
    });

// Close the popup
document.getElementById("close-popup").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
});

document.getElementById("download-btn").addEventListener("click", function () {
    const name = document.getElementById("popup-name").textContent;
    const message = document.getElementById("popup-message").textContent;
    const photoSrc = document.getElementById("popup-photo").src;

    // Create the certificate content as before
    const certificateContent1 = `


 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate of Achievement</title>
    <style>
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.certificate {
    background-image: url(./background.jpeg);
    background-repeat: no-repeat;
    background-size: cover;
    width: 80%;
    height: 130vh;
    max-width: 800px;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    border: 5px solid #333;
}

.header {
    margin-bottom: 30px;
}

.logo {
    max-width: 150px;
}

h1 {
    font-size: 36px;
    color: #333;
    font-weight: bold;
    margin-top: 10px;
}

.content {
    margin-top: 30%;
}

.recipient {
    font-size: 20px;
    color: #555;
    margin-bottom: 5%;
}

.name {
    font-size: 32px;
    font-weight: bold;
    color: #333;
    margin: 10px 0;
}

.has_completed {
    font-size: 18px;
    color: #555;
}

.course-name {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin: 20px 120px;
    width: 350px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
}

.date {
    font-size: 16px;
    color: #777;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.signature {
    text-align: left;
    font-size: 16px;
}

.signature-line {
    width: 150px;
    border-top: 2px solid #333;
    margin-top: 5px;
}

.seal {
    text-align: right;
}

.seal-img {
    max-width: 80px;
}

.recipient-photo {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #4CAF50;
}


@media (max-width: 768px) {

body {
    font-family: 'Arial', sans-serif;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
}
    .certificate {
        margin-left: 50px;
        padding-left: 50px;
        width: 600px;
        height: 800px;
    }
    
    .course-name {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin: 20px 50px;
    width: 400px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
}
}

@media (max-width: 520px) {
    .certificate {
        width: 400px;
        height: 600px;
    }
}

    </style>
</head>
<body>
    <div class="certificate">
        <div class="content">
            <p class="recipient">This is to certify that</p>
            <img src="${photoSrc}" alt="Recipient Photo" class="recipient-photo">
            <h2 class="name">${name}</h2>
            <p class="has_completed">My Resolution Is</p>
            <h3 class="course-name">"${message}"</h3>
        </div>
    </div>
</body>
</html>

`;

    // Open a new window and write the certificate content to it
    const printWindow = window.open("", "", "width=600,height=700");
    printWindow.document.write(certificateContent1);
    printWindow.document.close();

    // Wait until the content is fully loaded in the new window
    printWindow.onload = function () {
        // Use html2canvas to capture the content as an image
        html2canvas(printWindow.document.body).then(function (canvas) {
            // Convert the canvas to JPG format
            const imgData = canvas.toDataURL("image/jpeg");

            // Create a link to download the image
            const link = document.createElement("a");
            link.href = imgData;
            link.download = "certificate.jpg"; // Set the filename
            link.click(); // Trigger the download

            // Close the print window after downloading the image
            printWindow.close();
        });
    };
});
