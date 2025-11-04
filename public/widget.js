(function() {
  const iframe = document.createElement('iframe');
  iframe.src = 'https://chatbot-seven-self-48.vercel.app/embed'; // change to your Vercel domain
  iframe.style.position = 'fixed';
  iframe.style.bottom = '20px';
  iframe.style.right = '20px';
  iframe.style.width = '400px';
  iframe.style.height = '600px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '12px';
  iframe.style.zIndex = '9999';
  iframe.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
  iframe.style.background = 'transparent';
  iframe.style.outline = 'none';
  iframe.setAttribute('allow', 'clipboard-write; clipboard-read;');

  document.body.appendChild(iframe);
})();