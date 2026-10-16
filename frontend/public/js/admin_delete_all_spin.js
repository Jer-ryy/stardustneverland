
const deleteAllButton = document.getElementById('deleteAll');
deleteAllButton.onclick = () => {
axios.delete(`${API_URL}/spin/all`)
.then(function (response) {
    console.log(response)
    window.location.reload()
})
.catch((error) => {
    console.log(error)
})
}