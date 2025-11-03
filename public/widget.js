(function() {
  const iframe = document.createElement('iframe');
  iframe.src = 'https://chatbot-seven-self-48.vercel.app/embed'; // change to your Vercel domain
  iframe.style.position = 'fixed';
  iframe.style.bottom = '20px';
  iframe.style.right = '20px';
  iframe.style.width = '80px';
  iframe.style.height = '80px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '12px';
  iframe.style.zIndex = '9999';
  iframe.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
  iframe.style.transition = 'width 0.3s ease, height 0.3s ease';
  iframe.style.overflow = 'hidden';
  iframe.setAttribute('allow', 'clipboard-write; clipboard-read;');

  document.body.appendChild(iframe);

  // Listen for messages from the iframe
  window.addEventListener('message', (event) => {
    if (event.data.action === 'open') {
      iframe.style.width = '320px';
      iframe.style.height = '525px';
    } else if (event.data.action === 'close') {
      iframe.style.width = '80px';
      iframe.style.height = '80px';
    }
  });
})();