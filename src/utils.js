export function setCaretPosition(el, pos) {
  if (!el) { return }
  // NOTE: Modern browsers
  if (el.setSelectionRange) {
    el.focus()
    el.setSelectionRange(pos, pos)

    // NOTE: IE8 and below
  } else if (el.createTextRange) {
    const range = el.createTextRange()
    range.collapse(true)
    range.moveEnd('character', pos)
    range.moveStart('character', pos)
    range.select()
  }
}
