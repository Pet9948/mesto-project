import './pages/index.css'
import * as validate from './components/validate.js'
import {
  openPopup,
  closePopup,
  deleteCardAfterConfirm,
} from './components/modal.js'
import {
  selectorsForm,
  profileUserName,
  profileUserDescription,
  profileName,
  popupImage,
  profileInfo,
  elementsCards,
  cardPopupHeadingInput,
  cardPopupLinkInput,
  cardPopupSubmitButton,
  profileImageContainer,
  profileImage,
  avatarPopup,
  avatarForm,
  newAvatarLinkInput,
  avatarPopupSubmitButton,
  timeoutDelay,
  profileEditButton,
  profileUserForm,
  profileUserSubmitButton,
  addButton,
  cardPopupForm,
  cardTemplate,
  deleteCardPopup,
  popupImageText,
  popupImageContainer,
  popupAddCards,
} from './components/constants.js'
import * as api from './components/api.js'
import * as cards from './components/card.js'

// Открытие попапа для изменения профиля.
function openProfilePopup() {
  profileName.value = profileUserName.textContent
  profileInfo.value = profileUserDescription.textContent

  validate.hideAllInputsError(profileUserForm, selectorsForm) // Проверка валидности кнопок.

  validate.toggleButtonState(
    [profileName, profileInfo],
    profileUserSubmitButton,
    selectorsForm,
  )

  openPopup(popupProfile) //Открытие попапа
}

// Сохранение изменений в профиле и отправка на сервер.
function saveProfilePopup(evt) {
  evt.preventDefault()

  profileUserSubmitButton.textContent = 'Сохранение...'

  api
    .updateProfileInfo(profileName.value, profileInfo.value)
    .then((data) => {
      profileUserName.textContent = data.name
      profileUserDescription.textContent = data.about

      closePopup(popupProfile) // Закрытие попапа
    })
    .catch((err) => console.log(`Ошибка ${err.status}`))
    .finally(() =>
      setTimeout(
        () => (profileUserSubmitButton.textContent = 'Сохранить'),
        timeoutDelay,
      ),
    )
}

// Вызов окна изменения профиля.
profileEditButton.addEventListener('click', openProfilePopup)
profileUserForm
  .querySelector('.popup__button-close')
  .addEventListener('click', () => closePopup(popupProfile)) // Закрытие на крестик.
profileUserForm.addEventListener('submit', saveProfilePopup)

// Сохранение изменений Аватарки и отправка на сервер.
function saveprofileImagePopup(evt) {
  evt.preventDefault()

  avatarPopupSubmitButton.textContent = 'Сохранение...'

  const newLink = newAvatarLinkInput.value
  api
    .updateAvatar(newLink)
    .then((data) => {
      profileImage.src = data.avatar
      closePopup(avatarPopup) //Закрытие попапа
    })
    .catch(api.handleError)
    .finally(() => {
      setTimeout(
        () => (avatarPopupSubmitButton.textContent = 'Сохранить'),
        timeoutDelay,
      )
    })
}

// Вызов окна изменения аватарки.
profileImageContainer.addEventListener('click', renderprofileImagePopup)
avatarForm.addEventListener('submit', saveprofileImagePopup)
avatarPopup
  .querySelector('.popup__button-close')
  .addEventListener('click', () => closePopup(avatarPopup)) // Закрытие на крестик.

// Открытие попапа с добавлением карточек.
function renderNewCardPopup() {
  cardPopupForm.reset()
  validate.hideAllInputsError(cardPopupForm, selectorsForm) // Проверка валидности кнопок.
  validate.toggleButtonState(
    [cardPopupHeadingInput, cardPopupLinkInput],
    cardPopupSubmitButton,
    selectorsForm,
  )

  openPopup(popupAddCards) //Открытие попапа
}
// Сохранение изменений в карточках и отправка на сервер.
function saveNewCardPopup(evt) {
  evt.preventDefault()

  cardPopupSubmitButton.textContent = 'Создание...'
  api
    .createCard(cardPopupHeadingInput.value, cardPopupLinkInput.value)
    .then((data) => {
      const tempCard = cards.createCard(
        data,
        cardTemplate,
        renderPreviewPopup,
        deleteCardPopup,
      )
      elementsCards.prepend(tempCard)

      closePopup(popupAddCards) // Закрытие попапа
    })
    .catch(api.handleError)
    .finally(() =>
      setTimeout(
        () => (cardPopupSubmitButton.textContent = 'Создать'),
        timeoutDelay,
      ),
    )
}

//  Раскрываем попапа большой картинки.
function renderPreviewPopup(name, link) {
  popupImageContainer.src = link
  popupImageContainer.alt = name
  popupImageText.textContent = name
  openPopup(popupImage) //Открытие попапа
}

// Закрытие попапа с большой картинкой.
popupImage
  .querySelector('.popup__button-close')
  .addEventListener('click', () => closePopup(popupImage)) // Закрытие на крестик.

// Вызов попапа для добавления новых карточек.
addButton.addEventListener('click', renderNewCardPopup)
cardPopupForm.addEventListener('submit', saveNewCardPopup)
popupAddCards
  .querySelector('.popup__button-close')
  .addEventListener('click', () => closePopup(popupAddCards)) // Закрытие на крестик.

// Удаление карточек.
deleteCardPopup.addEventListener('submit', (evt) => {
  evt.preventDefault()

  deleteCardAfterConfirm()
})

// Попап смены аватрки.
function renderprofileImagePopup() {
  avatarForm.reset()
  validate.hideAllInputsError(avatarForm, selectorsForm) // Проверка валидности кнопок.
  validate.toggleButtonState(
    [newAvatarLinkInput],
    avatarPopupSubmitButton,
    selectorsForm,
  )
  openPopup(avatarPopup) //Открытие попапа
}

validate.enableValidation(selectorsForm)

// Загрузка информации с сервера.
Promise.all([api.getProfileData(), api.getInitialCards()])
  .then((data) => {
    api.setUserId(data[0]._id)

    profileUserName.textContent = data[0].name
    profileUserDescription.textContent = data[0].about
    profileImage.src = data[0].avatar

    data[1].reverse().forEach((card) => {
      const tempCard = cards.createCard(
        card,
        cardTemplate,
        renderPreviewPopup,
        deleteCardPopup,
      )
      elementsCards.prepend(tempCard)
    })
  })
  .catch(api.handleError)
