document.getElementById('email-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const emailInput = document.getElementById('email');
  const submitButton = document.querySelector('.request-early-access');
  const successMessage = document.getElementById('success-message');

  submitButton.classList.add('loading');
  submitButton.textContent = 'Sending...';

  const botToken = 'YOUR_BOT_TOKEN';
  const chatId = 'YOUR_CHAT_ID';
  const text = `New early access request from: ${emailInput.value}`;

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.ok) {
      submitButton.classList.remove('loading');
      submitButton.textContent = 'Request early access';
      successMessage.style.display = 'block';
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 5000);
    } else {
      throw new Error('Failed to send message');
    }
  })
  .catch((error) => {
    submitButton.classList.remove('loading');
    submitButton.textContent = 'Request early access';
    alert('Error sending email. Please try again.');
  });
});

document.getElementById('email').addEventListener('focus', function() {
  document.body.style.height = 'calc(100% - 216px)';  // Adjust height when keyboard is open
});

document.getElementById('email').addEventListener('blur', function() {
  document.body.style.height = '100%';  // Restore height when keyboard is closed
});
