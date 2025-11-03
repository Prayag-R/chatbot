(function () {
  const iframe = document.createElement('iframe');
  iframe.src = 'https://chatbot-seven-self-48.vercel.app/embed';
  iframe.style.position = 'fixed';
  iframe.style.bottom = '20px';
  iframe.style.right = '20px';
  iframe.style.width = '400px';
  iframe.style.height = '600px';
  iframe.style.border = 'none';
  iframe.style.background = 'transparent';
  iframe.allowTransparency = 'true';
  iframe.style.overflow = 'hidden';
  iframe.style.zIndex = '9999';
  iframe.style.boxShadow = 'none';
  iframe.style.borderRadius = '50%';
  document.body.appendChild(iframe);
})();