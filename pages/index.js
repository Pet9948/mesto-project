// Массив с карточками.
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Профиль
const popupProfile = document.querySelector("#popupProfile");

// Берём информацию о полях из профиля
const profileUserName = document.querySelector(".profile__user-name");
const profileUserDescription = document.querySelector(".profile__user-description");

// Присваиваем значения полей новым переменным.
const profileName = popupProfile.querySelector('input[name="profileName"]');
const profileInfo = popupProfile.querySelector('input[name="profileInfo"]');

// Карточки
const elements = document.querySelector(".elements");
const elementsСards = elements.querySelector(".elements__cards");
const cardTemplate = document.querySelector("#card").content;

// Добавляем свои карточки.
const popupAddCards = document.querySelector("#popupAddCards");

// Берём значения который вводит пользоваель.
const cardName = popupAddCards.querySelector('input[name="cardName"]');
const cardLink = popupAddCards.querySelector('input[name="cardLink"]');

// Развёртывание картинок.
const popupImage = document.querySelector("#imageLarge");
const PopupImageText = popupImage.querySelector('.popup__image-text');
const PopupImageContainer = popupImage.querySelector('.popup__image');

// Записываем новые значения в value.
function openProfilePopup() {
  profileName.value = profileUserName.textContent;
  profileInfo.value = profileUserDescription.textContent;
  togglePopup(popupProfile); //Открытие попапа
}

// Меняем в профиле информацию.
function handleProfileForm(evt) {
  evt.preventDefault();
  const nameInput = profileName;
  const jobInput = profileInfo;
  profileUserName.textContent = nameInput.value;
  profileUserDescription.textContent = jobInput.value;
  togglePopup(popupProfile); // закрываем попап вручную
}

// Встраиваем 6 карточек из масива.
function createCardElement(name, link) {
  const cardElement = cardTemplate.querySelector(".elements__card").cloneNode(true);
  const cardImage = cardElement.querySelector(".elements__image");
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener('click', openImageLarge);
  cardElement.querySelector(".elements__title").textContent = name;
  elementsСards.prepend(cardElement);
  cardElement.querySelector('.elements__trash-can').addEventListener('click', deleteCard);
  cardElement.querySelector('.elements__love-button').addEventListener('click', addLike);
}

// Функции открытия попапов
function togglePopup(popup) {
  popup.classList.toggle("popup_opened");
}

function openAddCards() {
  togglePopup(popupAddCards); //Открытие попапа
}

function openImageLarge(evt) {
  togglePopup(popupImage); //Открытие попапа
  const cardImage = evt.target;
  const card = cardImage.closest('.elements__card');
  const cardHeading = card.querySelector('.elements__title');
  PopupImageContainer.src = cardImage.src;
  PopupImageContainer.alt = cardImage.alt;
  PopupImageText.textContent = cardHeading.textContent;
}

// Функция лайков.
function addLike(evt) {
  like = evt.target.classList.toggle('elements__love-button_active');
}

function handleCardForm(evt) {
  evt.preventDefault();
  createCardElement(cardName.value, cardLink.value);
  cardName.value = '';
  cardLink.value = '';
  togglePopup(popupAddCards); // закрываем попап вручную
}

// Функция удаление картинок.
function deleteCard(evt) {
  const card = evt.target.closest(".elements__card");
  card.remove();
}

// Попап профиля
document.querySelector(".profile__button-edit").addEventListener("click", openProfilePopup); // Кнопка открытия попапа.
popupProfile.querySelector(".popup__button-close").addEventListener("click", () => togglePopup(popupProfile)); // Закрытие на крестик.
popupProfile.addEventListener("submit", handleProfileForm);

// Попап Добавления мест.
document.querySelector(".profile__button-add").addEventListener("click", openAddCards); // Кнопка открытия попапа.
popupAddCards.querySelector(".popup__button-close").addEventListener("click", () => togglePopup(popupAddCards)); // Закрытие на крестик.
popupAddCards.addEventListener("submit", handleCardForm);

// Закрытие попапа с большой картинкой.
popupImage.querySelector(".popup__button-close").addEventListener("click", () => togglePopup(popupImage)); // Закрытие на крестик.

// Добавляем 6 карточек из масива.
initialCards.forEach((card) => createCardElement(card.name, card.link));
