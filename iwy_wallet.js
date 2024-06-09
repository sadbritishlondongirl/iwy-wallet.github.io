document.getElementById('email-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const emailInput = document.getElementById('email');
  const submitButton = document.querySelector('.request-early-access');
  const successMessage = document.getElementById('success-message');

  submitButton.classList.add('loading');
  submitButton.textContent = 'Sending...';

  const botToken = '7413652980:AAHiwgCfzvzfzGYzOHep0UUoOrGcyxIOv2I';
  const chatId = '6426297503';
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
      alert('There was an error sending your request. Please try again.');
    }
  })
  .catch(error => {
    alert('There was an error sending your request. Please try again.');
    console.error('Error:', error);
  });
});

document.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, { passive: false });

document.addEventListener('focusout', function(event) {
  if (event.target.tagName === 'INPUT') {
    window.scrollTo(0, 0);
  }
});
