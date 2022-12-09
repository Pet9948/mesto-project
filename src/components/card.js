import {
  cardTemplate,
  popupImageText,
  popupImageContainer,
  popupImage,
} from './constants.js'
import * as modal from './modal.js'

// Встраиваем 6 карточек из масива.
export function createCard(name, link) {
  const cardElement = cardTemplate
    .querySelector('.elements__card')
    .cloneNode(true)
  const cardImage = cardElement.querySelector('.elements__image')
  cardImage.src = link
  cardImage.alt = name
  cardImage.addEventListener('click', openImageLarge)
  cardElement.querySelector('.elements__title').textContent = name
  cardElement
    .querySelector('.elements__trash-can')
    .addEventListener('click', deleteCard)
  cardElement
    .querySelector('.elements__love-button')
    .addEventListener('click', addLike)
  return cardElement
}

// Открытие большого изображения.
export function openImageLarge(evt) {
  modal.openPopup(popupImage) //Открытие попапа
  const cardImage = evt.target
  const card = cardImage.closest('.elements__card')
  const cardHeading = card.querySelector('.elements__title')
  popupImageContainer.src = cardImage.src
  popupImageContainer.alt = cardImage.alt
  popupImageText.textContent = cardHeading.textContent
}

// Функция удаление картинок.
function deleteCard(evt) {
  const card = evt.target.closest('.elements__card')
  card.remove()
}

// Функция лайков.
function addLike(evt) {
  const like = evt.target.classList.toggle('elements__love-button_active')
}
