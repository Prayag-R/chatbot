(function () {
  const iframe = document.createElement("iframe");
  iframe.src = "https://chatbot-seven-self-48.vercel.app/embed"; // your chatbot URL
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "70px"; // small default size (just the button)
  iframe.style.height = "70px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "50%";
  iframe.style.overflow = "hidden";
  iframe.style.zIndex = "9999";
  iframe.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  iframe.style.transition = "all 0.3s ease-in-out";
  iframe.style.pointerEvents = "auto";

  // Add to the page
  document.body.appendChild(iframe);

  let expanded = false;

  iframe.addEventListener("click", () => {
    if (!expanded) {
      iframe.style.width = "400px";
      iframe.style.height = "550px";
      iframe.style.borderRadius = "20px";
      expanded = true;
    } else {
      iframe.style.width = "70px";
      iframe.style.height = "70px";
      iframe.style.borderRadius = "50%";
      expanded = false;
    }
  });
})();