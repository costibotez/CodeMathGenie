export const OPEN_USER_MODAL = "OPEN_USER_MODAL";
export function openModal(isOpen) {
  return { type: OPEN_USER_MODAL, isOpen: isOpen };
}
