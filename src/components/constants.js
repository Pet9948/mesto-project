// Константы работы с формами.
export const selectorsForm = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible',
}

export const popupProfile = document.querySelector('#popupProfile')

// Берём информацию о полях из профиля
export const profileUserName = document.querySelector('.profile__user-name')
export const profileUserDescription = document.querySelector(
  '.profile__user-description',
)

// Присваиваем значения полей новым переменным.
export const profileName = popupProfile.querySelector(
  'input[name="profileName"]',
)
export const profileInfo = popupProfile.querySelector(
  'input[name="profileInfo"]',
)

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
export const elements = document.querySelector('.elements')
export const elementsСards = elements.querySelector('.elements__cards')
export const cardTemplate = document.querySelector('#card').content

// Добавляем свои карточки.
export const popupAddCards = document.querySelector('#popupAddCards')

// Берём значения который вводит пользоваель.
export const cardName = popupAddCards.querySelector('input[name="cardName"]')
export const cardLink = popupAddCards.querySelector('input[name="cardLink"]')

// Развёртывание картинок.
export const popupImage = document.querySelector('#imageLarge')
export const popupImageText = popupImage.querySelector('.popup__image-text')
export const popupImageContainer = popupImage.querySelector('.popup__image')
export const presskeyEsc = 'Esc'
