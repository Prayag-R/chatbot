(function () {
  const iframe = document.createElement("iframe");
  iframe.src = "https://chatbot-seven-self-48.vercel.app";
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "70px";
  iframe.style.height = "70px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "50%";
  iframe.style.zIndex = "9999";
  iframe.style.transition = "all 0.3s ease-in-out";
  iframe.style.cursor = "pointer";
  iframe.style.pointerEvents = "auto";
  iframe.style.overflow = "hidden";
  
  document.body.appendChild(iframe);

  let expanded = false;
  iframe.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!expanded) {
      iframe.style.width = "400px";
      iframe.style.height = "650px";
      iframe.style.borderRadius = "12px";
      expanded = true;
    } else {
      iframe.style.width = "70px";
      iframe.style.height = "70px";
      iframe.style.borderRadius = "50%";
      expanded = false;
    }
  });
})();