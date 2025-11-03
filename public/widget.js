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
  iframe.style.border = "0";
  iframe.style.borderRadius = "50%";
  iframe.style.overflow = "hidden";
  iframe.style.zIndex = "9999";
  iframe.style.background = "transparent";
  iframe.style.boxSizing = "border-box";
  iframe.style.padding = "0";
  iframe.style.margin = "0";
  iframe.style.pointerEvents = "auto";
  iframe.style.transition = "all 0.3s ease-in-out";
  
  // Remove any possible visual artifacts
  iframe.style.webkitMaskImage = "-webkit-radial-gradient(white, black)";
  iframe.style.outline = "none";
  iframe.style.boxShadow = "none";

  document.body.appendChild(iframe);

  let expanded = false;

  // expand / collapse on click
  iframe.addEventListener("click", () => {
    if (!expanded) {
      iframe.style.width = "380px";
      iframe.style.height = "600px";
      iframe.style.borderRadius = "12px";
      iframe.style.bottom = "20px";
      iframe.style.right = "20px";
      iframe.style.background = "transparent";
      expanded = true;
    } else {
      iframe.style.width = "70px";
      iframe.style.height = "70px";
      iframe.style.borderRadius = "50%";
      expanded = false;
    }
  });
})();
