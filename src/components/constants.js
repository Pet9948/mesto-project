// Константы работы с формами.
export const selectorsForm = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible',
}

// Информация о полях профиля
const profile = document.querySelector('.profile');
export const profileEditButton = profile.querySelector('.profile__button-edit')
export const profileUserName = profile.querySelector('.profile__user-name')
export const profileUserDescription = profile.querySelector('.profile__user-description',)

// Редактирование профиля.
const popupProfile = document.querySelector('#popupProfile')
export const profileUserForm = popupProfile.querySelector(selectorsForm.formSelector);
export const profileUserSubmitButton = profileUserForm.querySelector(selectorsForm.submitButtonSelector);

// Присваиваем значения полей новым переменным.
export const profileName = popupProfile.querySelector(
  'input[name="profileName"]',
)
export const profileInfo = popupProfile.querySelector(
  'input[name="profileInfo"]',
)

// Карточки
export const cardTemplate = document.querySelector('#card').content
export const elements = document.querySelector('.elements')
export const addButton = document.querySelector('.profile__button-add')
export const elementsCards = document.querySelector('.elements__cards')

// Добавляем свои карточки.
export const popupAddCards = document.querySelector('#popupAddCards')

// Берём значения который вводит пользоваель.
export const cardName = popupAddCards.querySelector('input[name="cardName"]')
export const cardLink = popupAddCards.querySelector('input[name="cardLink"]')

// Развёртывание картинок.
export const popupImage = document.querySelector('#imageLarge')
export const popupImageText = popupImage.querySelector('.popup__image-text')
export const popupImageContainer = popupImage.querySelector('.popup__image')
export const presskeyEsc = 'Escape'


export const cardPopup = document.querySelector('#popupAddCards')
export const cardPopupForm = cardPopup.querySelector(selectorsForm.formSelector)
export const cardPopupSubmitButton = cardPopupForm.querySelector(selectorsForm.submitButtonSelector)
export const cardPopupHeadingInput = cardPopupForm.querySelector("#cardName")
export const cardPopupLinkInput = cardPopupForm.querySelector("#link")
export const deleteCardPopup = document.querySelector('.popup_type_delete-card')

// аватар
export const profileImageContainer = document.querySelector(".profile__image-container");
export const profileImage = document.querySelector(".profile__image");
export const avatarPopup = document.querySelector(".popup_type_avatar");
export const avatarForm = avatarPopup.querySelector(selectorsForm.formSelector);
export const newAvatarLinkInput = avatarForm.querySelector("#avatar-link");
export const avatarPopupSubmitButton = avatarForm.querySelector(selectorsForm.submitButtonSelector);

export const timeoutDelay = 1000;
