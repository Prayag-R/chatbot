(function () {
  const iframe = document.createElement("iframe");

  // your deployed chatbot URL
  iframe.src = "https://chatbot-seven-self-48.vercel.app";

  // Start small (button mode)
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "70px";
  iframe.style.height = "70px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "50%";
  iframe.style.overflow = "hidden";
  iframe.style.zIndex = "9999";
  iframe.style.background = "transparent";
  iframe.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
  iframe.style.transition = "all 0.3s ease-in-out";

  document.body.appendChild(iframe);

  let expanded = false;

  // expand / collapse on click
  iframe.addEventListener("click", () => {
    if (!expanded) {
      iframe.style.width = "420px";
      iframe.style.height = "600px";
      iframe.style.borderRadius = "20px";
      iframe.style.bottom = "20px";
      iframe.style.right = "20px";
      expanded = true;
    } else {
      iframe.style.width = "70px";
      iframe.style.height = "70px";
      iframe.style.borderRadius = "50%";
      expanded = false;
    }
  });
})();
