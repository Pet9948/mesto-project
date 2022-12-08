import './pages/index.css'
import * as validate from './components/validate.js'
import { createCard } from './components/card.js'
import { openPopup, closePopup } from './components/modal.js'
import {
  selectorsForm,
  popupProfile,
  profileUserName,
  profileUserDescription,
  profileName,
  popupImage,
  profileInfo,
  initialCards,
  elementsСards,
} from './components/constants.js'

// Записываем новые значения в value.
function openProfilePopup() {
  profileName.value = profileUserName.textContent
  profileInfo.value = profileUserDescription.textContent
  openPopup(popupProfile) //Открытие попапа
}

// Меняем в профиле информацию.
function handleProfileForm(evt) {
  evt.preventDefault()
  const nameInput = profileName
  const jobInput = profileInfo
  profileUserName.textContent = nameInput.value
  profileUserDescription.textContent = jobInput.value
  closePopup(popupProfile) // закрываем попап вручную
}

function addCard(card, container) {
  container.prepend(card)
}

function addCards() {
  initialCards.forEach((item) =>
    addCard(createCard(item.name, item.link), elementsСards),
  )
}

// Добавляем 6 карточек из масива.
initialCards.forEach((card) => createCard(card.name, card.link))

// Попап профиля
document
  .querySelector('.profile__button-edit')
  .addEventListener('click', openProfilePopup) // Кнопка открытия попапа.
popupProfile
  .querySelector('.popup__button-close')
  .addEventListener('click', () => closePopup(popupProfile)) // Закрытие на крестик.
popupProfile.addEventListener('submit', handleProfileForm)

// Закрытие попапа с большой картинкой.
popupImage
  .querySelector('.popup__button-close')
  .addEventListener('click', () => closePopup(popupImage)) // Закрытие на крестик.

addCards()
validate.enableValidation(selectorsForm)
