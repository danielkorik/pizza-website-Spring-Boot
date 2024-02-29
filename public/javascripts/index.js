function clearSearch() {
    // Get the search input element
    const searchInput = document.querySelector('input[name="search"]');

    // Clear the search input value
    searchInput.value = '';

    // Submit the form to fetch all ads
    searchInput.closest('form').submit();
}