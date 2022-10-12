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