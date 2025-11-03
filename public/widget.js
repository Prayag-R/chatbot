(function () {
  const iframe = document.createElement('iframe');
  iframe.src = 'https://chatbot-seven-self-48.vercel.app/embed';
  iframe.style.position = 'fixed';
  iframe.style.bottom = '20px';
  iframe.style.right = '20px';
  iframe.style.width = '360px';
  iframe.style.height = '480px';
  iframe.style.border = 'none';
  iframe.style.outline = 'none';
  iframe.style.overflow = 'hidden';
  iframe.style.zIndex = '9999';
  iframe.style.borderRadius = '16px';
  iframe.style.boxShadow = '0 4px 24px rgba(0,0,0,0.15)';
  iframe.style.display = 'none'; // optional if toggleable
  document.body.appendChild(iframe);
})();