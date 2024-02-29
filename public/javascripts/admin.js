function approveAd(adId) {
    fetch(`/admin/api/ads/approve/${adId}`, { method: 'PUT' })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}
//delet function
// admin.js
function deleteAd(adId) {
    // Send an AJAX request to delete the ad
    fetch(`/admin/api/ads/delete/${adId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            // Check if the delete operation was successful
            if (data.message === 'Ad deleted successfully') {
                // Remove the deleted ad card from the DOM
                const adCard = document.getElementById(`adCard-${adId}`);
                if (adCard) {
                    adCard.remove();
                }
            } else {
                console.error('Failed to delete ad:', data.error);
            }
        })
        .catch(error => {
            console.error('Error deleting ad:', error);
        });
}
