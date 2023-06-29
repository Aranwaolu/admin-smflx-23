const photoForm = document.querySelector('.form-photos')
photoForm.addEventListener('submit', (e) => {
	e.preventDefault()
	const formData = new FormData(photoForm)
	axios
		.post('https://smflx-b64a687ce7fc.herokuapp.com/api/v1/photos', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		.then((res) => {
			console.log(res)
			alert('Photos uploaded successfully!')
		})
		.catch((err) => {
			console.log(err)
			alert('An error occurred!')
		})
})
