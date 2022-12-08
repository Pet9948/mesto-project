// Валидация форм

function showInputError(formElement, inputElement, errorMessage, selectorsForm) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(selectorsForm.inputErrorClass)
  errorElement.classList.add(selectorsForm.errorClass)
  errorElement.textContent = errorMessage
}

function hideInputError(formElement, inputElement, selectorsForm) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(selectorsForm.inputErrorClass)
  errorElement.classList.remove(selectorsForm.errorClass)
  errorElement.textContent = ''
}

export function hideAllInputsError(formElement, selectorsForm) {
  const inputList = Array.from(
    formElement.querySelectorAll(selectorsForm.inputSelector),
  )
  inputList.forEach((inputElement) =>
    hideInputError(formElement, inputElement, selectorsForm),
  )
}

function checkInputValidity(formElement, inputElement, selectorsForm) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity('')
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      selectorsForm,
    )
  } else {
    hideInputError(formElement, inputElement, selectorsForm)
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid)
}

export function toggleButtonState(inputList, buttonElement, selectorsForm) {
  inputList.forEach((inputElement) => inputElement.setCustomValidity(''))
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectorsForm.inactiveButtonClass)
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(selectorsForm.inactiveButtonClass)
    buttonElement.disabled = false
  }
}

function setEventListeners(formElement, selectorsForm) {
  const inputList = Array.from(
    formElement.querySelectorAll(selectorsForm.inputSelector),
  )
  const buttonElement = formElement.querySelector(
    selectorsForm.submitButtonSelector,
  )

  // Проверки кнопки.

  toggleButtonState(inputList, buttonElement, selectorsForm)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, selectorsForm)
      toggleButtonState(inputList, buttonElement, selectorsForm)
    })
  })
}

export function enableValidation(selectorsForm) {
  const forms = Array.from(document.querySelectorAll(selectorsForm.formSelector))
  forms.forEach((formElement) => setEventListeners(formElement, selectorsForm))
}
