import './pages/index.css'
import * as validate from './components/validate.js'
import { createCard } from './components/card.js'
import { openPopup, closePopup, openAddCards } from './components/modal.js'
import {
  selectorsForm,
  profileUserName,
  profileUserDescription,
  profileName,
  popupImage,
  profileInfo,
  initialCards,
  elementsСards,
  cardLink,
  cardName,
  cardPopupHeadingInput,
  cardPopupLinkInput,
  cardPopupSubmitButton,
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

function handleCardForm(evt) {
  evt.preventDefault()
  addCard(createCard(cardName.value, cardLink.value), elementsСards)
  evt.target.reset()
  validate.toggleButtonState([cardPopupHeadingInput, cardPopupLinkInput], cardPopupSubmitButton, selectorsForm);
  closePopup(popupAddCards) // закрываем попап вручную
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

// Попап Добавления мест.
document
  .querySelector('.profile__button-add')
  .addEventListener('click', openAddCards) // Кнопка открытия попапа.
popupAddCards
  .querySelector('.popup__button-close')
  .addEventListener('click', () => closePopup(popupAddCards)) // Закрытие на крестик.
popupAddCards.addEventListener('submit', handleCardForm)

addCards()
validate.enableValidation(selectorsForm)
