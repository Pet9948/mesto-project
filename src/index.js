import './pages/index.css'
import * as validate from './components/validate.js'
import { createCard, addCards, handleCardForm, initialCards, popupImage } from './components/card.js'
import { OpenPopup, ClosePopup, openAddCards } from './components/modal.js'

// Константы работы с формами.
const selectorsForm = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible',
}

// Профиль
const popupProfile = document.querySelector('#popupProfile')

// Берём информацию о полях из профиля
const profileUserName = document.querySelector('.profile__user-name')
const profileUserDescription = document.querySelector(
  '.profile__user-description',
)

// Присваиваем значения полей новым переменным.
const profileName = popupProfile.querySelector('input[name="profileName"]')
const profileInfo = popupProfile.querySelector('input[name="profileInfo"]')

// Записываем новые значения в value.
function openProfilePopup() {
  profileName.value = profileUserName.textContent
  profileInfo.value = profileUserDescription.textContent
  OpenPopup(popupProfile) //Открытие попапа
}

// Меняем в профиле информацию.
function handleProfileForm(evt) {
  evt.preventDefault()
  const nameInput = profileName
  const jobInput = profileInfo
  profileUserName.textContent = nameInput.value
  profileUserDescription.textContent = jobInput.value
  ClosePopup(popupProfile) // закрываем попап вручную
}

// Попап профиля
document
  .querySelector('.profile__button-edit')
  .addEventListener('click', openProfilePopup) // Кнопка открытия попапа.
popupProfile
  .querySelector('.popup__button-close')
  .addEventListener('click', () => ClosePopup(popupProfile)) // Закрытие на крестик.
popupProfile.addEventListener('submit', handleProfileForm)

// Попап Добавления мест.
document
  .querySelector('.profile__button-add')
  .addEventListener('click', openAddCards) // Кнопка открытия попапа.
popupAddCards
  .querySelector('.popup__button-close')
  .addEventListener('click', () => ClosePopup(popupAddCards)) // Закрытие на крестик.
popupAddCards.addEventListener('submit', handleCardForm)

// Закрытие попапа с большой картинкой.
popupImage
  .querySelector('.popup__button-close')
  .addEventListener('click', () => ClosePopup(popupImage)) // Закрытие на крестик.

// Добавляем 6 карточек из масива.
initialCards.forEach((card) => createCard(card.name, card.link))

addCards()
validate.enableValidation(selectorsForm)
