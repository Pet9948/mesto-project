import * as api from './api.js'
import * as modal from './modal.js'
import { deleteCardPopup } from './constants.js'

function hasBeenLikedByCurrentUser(card) {
  return card.likes.some((like) => like._id === api.userId)
}

// Функция обработки карточек.

export function createCard(
  card,
  cardTemplate,
  renderPreviewCallback,
  deletePopup,
) {
  const cardElement = cardTemplate
    .querySelector('.elements__card')
    .cloneNode(true)
  const heading = cardElement.querySelector('.elements__title')
  const likeCountText = cardElement.querySelector('.elements__love-count')
  const loveButton = cardElement.querySelector('.elements__love-button')
  const deleteButton = cardElement.querySelector('.elements__trash-can')

  // Добавление картинок и текста.
  const cardImage = cardElement.querySelector('.elements__image')
  heading.textContent = card.name
  cardImage.src = card.link
  cardImage.alt = card.name
  cardImage.addEventListener('click', () =>
    renderPreviewCallback(card.name, card.link),
  )

  // Текст лайков.
  likeCountText.textContent = card.likes.length

  // Добавляем активный лайк.
  if (hasBeenLikedByCurrentUser(card)) {
    loveButton.classList.add('elements__love-button_active')
  }

  // Функция управления лайками с сервера.
  loveButton.addEventListener('click', (evt) => {
    const isLiked = evt.target.classList.contains(
      'elements__love-button_active',
    )
    if (isLiked) {
      api
        .unsetLike(card._id)
        .then((data) => {
          evt.target.classList.toggle('elements__love-button_active')
          likeCountText.textContent = data.likes.length
        })
        .catch(api.handleError)
    } else {
      api
        .setLike(card._id)
        .then((data) => {
          evt.target.classList.toggle('elements__love-button_active')
          likeCountText.textContent = data.likes.length
        })
        .catch(api.handleError)
    }
  })

  // Скрытие и удаление картчоек.
  const cardOwnerId = card.owner._id
  if (api.userId !== cardOwnerId) {
    deleteButton.classList.add('elements__trash-can_hidden')
  } else {
    deleteButton.addEventListener('click', () => {
      modal.openPopup(deletePopup)

      deleteCardPopup
        .querySelector('.popup__button-close')
        .addEventListener('click', () => modal.closePopup(deletePopup)) // Закрытие на крестик.

      modal.setDeleteCardAction(() => {
        api
          .deleteCard(card._id)
          .then(() => {
            cardElement.remove()
            modal.closePopup(deletePopup)
          })
          .catch(api.handleError)
      })
    })
  }

  return cardElement
}
