const form = document.querySelector('.form-message')
form.addEventListener('submit', (e) => {
	e.preventDefault()
	const formData = new FormData(form)
	formData.append('category', 'messages')
	axios
		.post('https://smflx-b64a687ce7fc.herokuapp.com/api/v1/messages', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		.then((res) => {
			console.log(res)
			alert('Audio Message uploaded successfully!')
		})
		.catch((err) => {
			console.log(err)
			alert('An error occurred!')
		})
})
