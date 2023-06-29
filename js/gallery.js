const initGallery = () => {
	document.getElementById('photos--main-container').style.display = 'none'

	axios
		.get('https://smflx-b64a687ce7fc.herokuapp.com/api/v1/photos')
		.then((res) => setPhotos(res.data.data))
		.catch((err) => console.error(err))
}

const setPhotos = (photos) => {
	document.getElementById('photo-loader').style.display = 'none'
	document.getElementById('photos--main-container').style.display = 'block'

	createGalleryList(photos)
}

const createGalleryList = (photos) => {
	const numberOfPhotosDiv = document.querySelector('.photos-summary-bg')
	numberOfPhotosDiv.textContent = photos.length

	const container = document.getElementById('photo-grid')

	photos.forEach((photo) => {
		// Create the main div element
		const photoDiv = document.createElement('div')
		photoDiv.className = 'photo-box'

		// Create the image element
		const image = document.createElement('img')
		image.src = photo.image_url
		image.loading = 'lazy'
		image.alt = photo.title
		image.className = 'smflx-photo'

		const deleteBtn = document.createElement('button')
		deleteBtn.textContent = 'Delete'
		deleteBtn.className = 'delete-btn'
		deleteBtn.dataset.photoId = photo.id

		deleteBtn.addEventListener('click', () => {
			showDeleteModal(deleteBtn.dataset.photoId)
		})

		// Append all the elements to the main div
		photoDiv.appendChild(image)
		photoDiv.appendChild(deleteBtn)

		// Append the main div to the container element
		container.appendChild(photoDiv)
	})
}

const showDeleteModal = (photoId) => {
	let yesBtn = document.getElementById('gallery-modal-button-yes')
	yesBtn.dataset.galleryId = photoId

	document.getElementById('gallery--confirm-delete-modal').style.display = 'flex'
}

let yesBtn = document.getElementById('gallery-modal-button-yes')
yesBtn.addEventListener('click', () => {
	let id = yesBtn.dataset.galleryId
	if (Number(id) !== 0) {
		document.getElementById('delete-modal-title').textContent = 'Deleting photo...'
		document.getElementById('modal-btn-group').style.display = 'none'
		axios
			.delete(`https://smflx-b64a687ce7fc.herokuapp.com/api/v1/photos/${Number(id)}`)
			.then((res) => resetModal())
			.catch((err) => console.error(err))
	}
})

let noBtn = document.getElementById('gallery-modal-button-close')
noBtn.addEventListener('click', () => {
	document.getElementById('gallery--confirm-delete-modal').style.display = 'none'
})

const resetModal = () => {
	document.getElementById('delete-modal-title').textContent = 'Are you sure you want to delete this photo?'
	document.getElementById('modal-btn-group').style.display = 'block'
	document.getElementById('gallery-modal-button-yes').dataset.galleryId = ''

	document.getElementById('gallery--confirm-delete-modal').style.display = 'none'

	setTimeout(() => {
		document.location.reload()
	}, 1000)
}
