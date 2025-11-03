(function () {
  const iframe = document.createElement('iframe');
  iframe.src = 'https://chatbot-seven-self-48.vercel.app/embed'; // your deployed chatbot
  iframe.style.position = 'fixed';
  iframe.style.bottom = '20px';
  iframe.style.right = '20px';
  iframe.style.width = '420px'; // give a little room for the full bubble
  iframe.style.height = '650px';
  iframe.style.border = 'none';
  iframe.style.background = 'transparent';
  iframe.allowTransparency = 'true';
  iframe.style.overflow = 'hidden';
  iframe.style.zIndex = '9999';
  iframe.style.borderRadius = '20px'; // smooth corners instead of circle
  iframe.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  iframe.style.pointerEvents = 'auto';
  document.body.appendChild(iframe);
})();