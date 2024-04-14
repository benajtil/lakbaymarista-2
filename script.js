// script.js

// Function to handle form submission
function submitReview() {
    // Get values from form fields
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var rating = document.getElementById('rating').value;
    var comment = document.getElementById('comment').value;

    // Create an XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the request parameters
    xhr.open('POST', 'submit_rating.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Set up the callback function
    xhr.onload = function() {
        if (xhr.status === 200) {
            alert(xhr.responseText); // Display response from server
        } else {
            alert('Request failed. Status code: ' + xhr.status);
        }
    };

    // Send the request
    xhr.send('name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email) + '&rating=' + encodeURIComponent(rating) + '&comment=' + encodeURIComponent(comment));
}


$(document).ready(function() {
    $.ajax({
        url: 'fetch_reviews.php', // PHP script to fetch reviews
        type: 'GET',
        success: function(response) {
            // Parse JSON response
            var reviews = JSON.parse(response);
            // Loop through reviews and create HTML elements to display them
            for (var i = 0; i < reviews.length; i++) {
                var reviewHTML = "<div>";
                reviewHTML += "<p><strong>Name: </strong>" + reviews[i].name + "</p>";
                reviewHTML += "<p><strong>Rating: </strong>" + reviews[i].rating + "</p>";
                reviewHTML += "<p><strong>Comment: </strong>" + reviews[i].comment + "</p>";
                reviewHTML += "</div>";
                $('#reviewsContainer').append(reviewHTML);
            }
        }
    });
});


// Fetch reviews from the server and display them on the homepage
function fetchReviews() {
    fetch('fetch_reviews.php') // PHP script to fetch reviews from the database
        .then(response => response.json())
        .then(reviews => {
            const reviewsContainer = document.getElementById('reviews');
            reviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.classList.add('review');
                reviewElement.innerHTML = `
                    <p>Name: ${review.name}</p>
                    <p>Email: ${review.email}</p>
                    <p>Rating: ${review.rating}</p>
                    <p>Comment: ${review.comment}</p>
                `;
                reviewsContainer.appendChild(reviewElement);
            });
        })
        .catch(error => console.error('Error fetching reviews:', error));
}

// Call fetchReviews function to display reviews when the page loads
window.addEventListener('load', fetchReviews);
