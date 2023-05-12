export function handleEditor(onEditorView = null) {
  // console.log(Webflow.env("editor"));
  if (Webflow.env("editor") !== undefined) {
    if (onEditorView !== null) onEditorView();
    console.log("Webflow Editor View");
    return true;
  } else {
    return false;
  }
}
