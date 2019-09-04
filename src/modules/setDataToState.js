export default function setDataToState(elementId, setter, state) {
  let data = document.getElementById(elementId).value;
  setter({ ...state, [elementId]: data });
}
