const messageForm = document.querySelector('.form-message')
const submitLabel = document.querySelector('.audio-messsage--upload')
submitLabel.addEventListener('click', (e) => {
	e.preventDefault()

	document.querySelector('.audio-messsage--upload > span').textContent = 'Submitting'
	let btnSpinner = document.querySelector('.audio-messsage--upload-svg')
	btnSpinner.style.display = 'inline-flex'

	const formData = new FormData(messageForm)
	formData.append('category', 'messages')
	axios
		.post('https://smflx-b64a687ce7fc.herokuapp.com/api/v1/messages', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		.then((res) => {
			console.log(res)

			document.querySelector('.audio-messsage--upload > span').textContent = 'Submit'
			btnSpinner.style.display = 'none'
			document.getElementById('message-form-done').style.display = 'flex'
		})
		.catch((err) => {
			console.log(err)

			document.querySelector('.audio-messsage--upload > span').textContent = 'Submit'
			btnSpinner.style.display = 'none'
			document.getElementById('message-form-fail').style.display = 'flex'
		})
})

const closeDoneBtn = document.querySelector('.message-form-done-btn')
closeDoneBtn.addEventListener('click', () => {
	document.getElementById('message-form-done').style.display = 'none'
})

const closeFailBtn = document.querySelector('.message-form-fail-btn')
closeFailBtn.addEventListener('click', () => {
	document.getElementById('message-form-fail').style.display = 'none'
})
