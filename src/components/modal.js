import { handleCardForm } from './card.js'
import { presskeyEsc } from './constants.js'

// Функции открытия попапов.

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

// Попап Добавления мест.
document
  .querySelector('.profile__button-add')
  .addEventListener('click', openAddCards) // Кнопка открытия попапа.
popupAddCards
  .querySelector('.popup__button-close')
  .addEventListener('click', () => closePopup(popupAddCards)) // Закрытие на крестик.
popupAddCards.addEventListener('submit', handleCardForm)
