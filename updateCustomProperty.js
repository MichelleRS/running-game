export function getCustomProperty(element, property) {
  // this function gets the css properties of the element (ex: .ground) and the value of the specified css property (ex: --left)
  // getComputedStyle: method returns an object containing values of all css properties of element
  // getPropertyValue: method interface returns string containing value of the specified css property
  // parseFloat: converts string to a floating point number
  // OR if there is no value, default to 0
  return parseFloat(getComputedStyle(element).getPropertyValue(property)) || 0;
}

export function setCustomProperty(element, property, value) {
  // set a new value for the property in its css style declaration
  element.style.setProperty(property, value);
}

export function incrementCustomProperty(element, property, incrementBy) {
  setCustomProperty(
    element,
    property,
    // get current value and add the incremented value
    getCustomProperty(element, property) + incrementBy
  );
}
