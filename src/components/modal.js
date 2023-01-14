import { presskeyEsc } from './constants.js'
let deleteCardAction;

// Функции открытия попапов.

export function setDeleteCardAction(action) {
  deleteCardAction = action;
}

export function openPopup(popup) {
  document.addEventListener('keydown', closePopupPressEsc)
  popup.classList.add('popup_opened')
}

export function closePopup(popup) {
  document.removeEventListener('keydown', closePopupPressEsc)
  popup.classList.remove('popup_opened')
}

export function openAddCards() {
  openPopup(popupAddCards) //Открытие попапа
}

export function deleteCardAfterConfirm() {
  deleteCardAction();
}

// Функция закрытия попапов по ESC

function closePopupPressEsc(evt) {
  if (evt.key === presskeyEsc) {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

// Закрытие попапа на оверлей.
document.querySelectorAll('.popup').forEach((popup) =>
  popup.addEventListener('mousedown', (evt) => {
    if (
      evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close-button')
    ) {
      closePopup(popup) // закрываем попап
    }
  }),
)
