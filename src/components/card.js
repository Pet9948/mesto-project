import * as modal from './modal.js'

// Массив с карточками.
export const initialCards = [
  {
    name: 'Архыз',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
]

// Карточки
const elements = document.querySelector('.elements')
const elementsСards = elements.querySelector('.elements__cards')
const cardTemplate = document.querySelector('#card').content

// Добавляем свои карточки.
const popupAddCards = document.querySelector('#popupAddCards')

// Берём значения который вводит пользоваель.
const cardName = popupAddCards.querySelector('input[name="cardName"]')
const cardLink = popupAddCards.querySelector('input[name="cardLink"]')

// Развёртывание картинок.
export const popupImage = document.querySelector('#imageLarge')
const popupImageText = popupImage.querySelector('.popup__image-text')
const popupImageContainer = popupImage.querySelector('.popup__image')

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

export function addCard(card, container) {
  container.prepend(card)
}

export function addCards() {
  initialCards.forEach((item) =>
    addCard(createCard(item.name, item.link), elementsСards),
  )
}

// Открытие большого изображения.
export function openImageLarge(evt) {
  modal.OpenPopup(popupImage) //Открытие попапа
  const cardImage = evt.target
  const card = cardImage.closest('.elements__card')
  const cardHeading = card.querySelector('.elements__title')
  popupImageContainer.src = cardImage.src
  popupImageContainer.alt = cardImage.alt
  popupImageText.textContent = cardHeading.textContent
}

export function handleCardForm(evt) {
  evt.preventDefault()
  addCard(createCard(cardName.value, cardLink.value), elementsСards)
  evt.target.reset()
  modal.ClosePopup(popupAddCards) // закрываем попап вручную
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
