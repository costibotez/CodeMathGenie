import { fileeditConstants } from "../constants/fileedit.constants";

export function openNewModal() {
  return { type: fileeditConstants.OPEN_NEW_MODAL };
}
export function openUpdateModal(index, lang, file) {
  return { type: fileeditConstants.OPEN_UPDATE_MODAL, index: index, lang: lang, file: file };
}
export function closeModal() {
  return { type: fileeditConstants.CLOSE_MODAL };
}
export function selectLanguageOfNew(lang) {
  return { type: fileeditConstants.SELECT_LANGUAGE_NEW, lang: lang };
}
