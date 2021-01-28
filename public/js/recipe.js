function deleteRecipe(id, url) {
    var confirm = window.confirm("Are you sure you want to delete the recipe?");
    if (confirm == true) {
        fetch(url + '/recipe/' + id, {
            method: 'DELETE',
        })
        .then( (response) => {
            if (response.status == 200) {
                window.location.href = url
                console.log("Redirecting...")
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } else {
        return;
    }
}