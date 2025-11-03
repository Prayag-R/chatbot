(function () {
  const iframe = document.createElement("iframe");

  // your deployed chatbot URL
  iframe.src = "https://chatbot-seven-self-48.vercel.app";
  
  // Allow necessary permissions
  iframe.setAttribute("sandbox", "allow-same-origin allow-scripts allow-popups allow-forms allow-presentation");
  iframe.setAttribute("allow", "microphone; camera");
  iframe.title = "Chatbot Widget";

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
  iframe.style.boxSizing = "border-box";
  iframe.style.padding = "0";
  iframe.style.margin = "0";
  iframe.style.transition = "all 0.3s ease-in-out";
  iframe.style.cursor = "pointer";
  
  document.body.appendChild(iframe);

  let expanded = false;

  // Expand/collapse on click
  iframe.addEventListener("click", () => {
    if (!expanded) {
      iframe.style.width = "380px";
      iframe.style.height = "600px";
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