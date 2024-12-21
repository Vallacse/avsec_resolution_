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
    <title>Certificate of Achievement</title>
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
    background-color: #fff;
    width: 80%;
    max-width: 1000px;
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
    margin-bottom: 30px;
}

.recipient {
    font-size: 20px;
    color: #555;
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
    margin: 20px 0;
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
    .certificate {
        width: 90%;
    }

    .header h1 {
        font-size: 30px;
    }

    .name {
        font-size: 28px;
    }

    .course-name {
        font-size: 22px;
    }

    .recipient-photo {
        width: 100px;
        height: 100px;
    }
}

    </style>
</head>
<body>
    <div class="certificate">
        <div class="header">
            <h1>Certificate of Resolution</h1>
        </div>
        <div class="content">
            <p class="recipient">This is to certify that</p>
            <img src="${photoSrc}" alt="Recipient Photo" class="recipient-photo">
            <h2 class="name">${name}</h2>
            <p class="has_completed">Your Resolution Is</p>
            <h3 class="course-name">"${message}"</h3>
        </div>
        <div class="footer">
            <div class="signature">
                <p>*Immediately do this</p>
                <div class="signature-line"></div>
            </div>
            <div class="seal">
                <img src="./logo.jpg" alt="Seal" class="seal-img">
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
  document.getElementById("certificate-form").addEventListener("submit", function (e) {
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
  
