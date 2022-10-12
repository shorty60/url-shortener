// 貼至記事本function
function copyToClipboard() {
  // Get the text field
  const copyText = document.querySelector('#urlGenerated')

  // Select the text field
  copyText.select()
  copyText.setSelectionRange(0, 99999) // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value.trim())

  // Alert the copied text
  alert('URL Copied: ' + copyText.value)
}

// 前端表單驗證，阻擋不合規表單
const urlInputForm = document.querySelector('#url-input-form')
const submitButton = document.querySelector('#submit-button')

submitButton.addEventListener('click', event => {
  urlInputForm.classList.add('was-validated')
})

urlInputForm.addEventListener('submit', event => {
  if (!urlInputForm.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
  }
})
