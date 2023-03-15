export function handleEditor(onEditorView) {
  const html = document.documentElement;
  const config = { attributes: true, childList: false, subtree: false };

  const callback = (mutationList) => {
    for (const mutation of mutationList) {
      if (mutation.type === "attributes") {
        [
          ...document.querySelectorAll(
            ".w-editor-bem-EditSiteButton , .w-editor-bem-EditorMainMenu"
          ),
        ].forEach((item) => {
          item.onclick = () => {
            onEditorView();
          };
        });
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(html, config);
}
