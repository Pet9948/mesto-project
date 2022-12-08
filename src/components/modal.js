// Функции открытия попапов.

export function OpenPopup(popup) {
  document.addEventListener('keydown', closePopupPressEsc)
  popup.classList.add('popup_opened')
}

export function ClosePopup(popup) {
  document.removeEventListener('keydown', closePopupPressEsc)
  popup.classList.remove('popup_opened')
}

export function openAddCards() {
  OpenPopup(popupAddCards) //Открытие попапа
}

// Функция закрытия попапов по ESC

function closePopupPressEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    ClosePopup(openedPopup)
  }
}

// Закрытие попапа на оверлей.
document.querySelectorAll('.popup').forEach((popup) =>
  popup.addEventListener('mousedown', (evt) => {
    if (
      evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close-button')
    ) {
      ClosePopup(popup) // закрываем попап
    }
  }),
)
