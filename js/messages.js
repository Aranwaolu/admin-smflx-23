const initMessages = () => {
	document.getElementById('messages--main-container').style.display = 'none'

	axios
		.get('https://smflx-b64a687ce7fc.herokuapp.com/api/v1/messages')
		.then((res) => setMessages(res.data.data))
		.catch((err) => console.error(err))
}

const setMessages = (messages) => {
	document.getElementById('message-loader').style.display = 'none'
	document.getElementById('messages--main-container').style.display = 'block'

	createMessagesList(messages)
}

const createMessagesList = (messages) => {
	const numberOfMessagesDiv = document.querySelector('.messages-summary-bg')
	numberOfMessagesDiv.textContent = messages.length

	// Select the container element where you want to populate the HTML snippet
	const container = document.getElementById('table-content')

	// Loop through the data list
	messages.forEach((message) => {
		// Create the main div element
		const messageDiv = document.createElement('div')
		messageDiv.className = 'table-headings t-content'

		// Create the image block div
		const imageBlock = document.createElement('div')
		imageBlock.id = 'w-node-_75926f57-b87a-763b-205a-f2132dff4e22-d0b960ed'
		imageBlock.className = 'table-image-block'

		// Create the image element
		const image = document.createElement('img')
		image.src = message.image_url
		image.loading = 'lazy'
		image.alt = message.title
		image.className = 'message-img'

		// Create the title div element
		const titleDiv = document.createElement('div')
		titleDiv.id = 'w-node-b8e2dc2c-a392-6054-eae6-452b619bf7e7-d0b960ed'
		titleDiv.className = 'table-th t-content title'
		titleDiv.textContent = message.title

		// Append the image and title divs to the image block
		imageBlock.appendChild(image)
		imageBlock.appendChild(titleDiv)

		// Create the minister div element
		const ministerDiv = document.createElement('div')
		ministerDiv.className = 'table-th t-content'
		ministerDiv.textContent = message.minister

		// Create the date of the message
		const dateDiv1 = document.createElement('div')
		dateDiv1.className = 'table-th t-content'
		dateDiv1.textContent = message.date.slice(0, 10)

		// Create the createdAt data
		const dateDiv2 = document.createElement('div')
		dateDiv2.className = 'table-th t-content'
		dateDiv2.textContent = message.created_at

		const deleteBtn = document.createElement('button')
		deleteBtn.textContent = 'Delete'
		deleteBtn.className = 'delete-btn'
		deleteBtn.dataset.messageUuid = message.uuid

		deleteBtn.addEventListener('click', () => {
			showDeleteModal(deleteBtn.dataset.messageUuid)
		})

		// Append all the elements to the main div
		messageDiv.appendChild(imageBlock)
		messageDiv.appendChild(ministerDiv)
		messageDiv.appendChild(dateDiv1)
		messageDiv.appendChild(dateDiv2)
		messageDiv.appendChild(deleteBtn)

		// Append the main div to the container element
		container.appendChild(messageDiv)
	})
}

const showDeleteModal = (messageUuid) => {
	let yesBtn = document.getElementById('messages-modal-button-yes')
	yesBtn.dataset.messageUuid = messageUuid

	document.getElementById('messages--confirm-delete-modal').style.display = 'flex'
}

let yesBtn = document.getElementById('messages-modal-button-yes')
yesBtn.addEventListener('click', () => {
	let id = yesBtn.dataset.messageUuid
	if (Number(id) !== 0) {
		document.getElementById('delete-modal-title').textContent = 'Deleting message...'
		document.getElementById('modal-btn-group').style.display = 'none'
		console.log('gonna delete this message ', yesBtn.dataset.messageUuid)
		// axios
		// 	.delete(`https://smflx-b64a687ce7fc.herokuapp.com/api/v1/messages/${Number(id)}`)
		// 	.then((res) => resetModal())
		// 	.catch((err) => console.error(err))
	}
})

let noBtn = document.getElementById('messages-modal-button-close')
noBtn.addEventListener('click', () => {
	document.getElementById('messages--confirm-delete-modal').style.display = 'none'
})

const resetModal = () => {
	document.getElementById('delete-modal-title').textContent = 'Are you sure you want to delete this message?'
	document.getElementById('modal-btn-group').style.display = 'block'
	document.getElementById('messages-modal-button-yes').dataset.messageUuid = ''

	document.getElementById('messages--confirm-delete-modal').style.display = 'none'

	setTimeout(() => {
		document.location.reload()
	}, 1000)
}
