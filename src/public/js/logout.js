const logout = document.getElementById('logout');

logout.addEventListener('click', (evt) => {
    evt.preventDefault();
    fetch('/logout', {
        method: "POST"
    })
})