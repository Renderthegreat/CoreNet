class Element {
  constructor(tagName) {
    this.tagName = tagName;
    this.children = [];
    this.attributes = {};
    this.textContent = "";
  }
  setTextContent(text) {
    this.textContent = text;
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  getAttribute(name) {
    return this.attributes[name];
  }
  removeAttribute(name) {
    delete this.attributes[name];
  }
  appendChild(child) {
    this.children.push(child);
  }
  removeChild(child) {
    const index = this.children.indexOf(child);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }
  get innerHTML() {
    let html = `<${this.tagName}`;
    for (const attr in this.attributes) {
      html += ` ${attr}="${this.attributes[attr]}"`;
    }
    html += ">";
    if (this.textContent) {
      html += this.textContent;
    }
    this.children.forEach((child) => {
      html += child.innerHTML;
    });
    html += `</${this.tagName}>`;
    return html;
  }
  set innerHTML(html) {}
  styles = {};
}
class Document {
  constructor() {
    this.children.push(new Element("body"));
    this.children.push(new Element("head"));
  }
  createElement(tagName) {
    return new Element(tagName);
  }
  getElementById(id) {
    return this._search(this.body, "id", id);
  }
  getElementByClassName(className) {
    return this._search(this.body, "className", className);
  }
  getElementsByTagName(tagName){
    return this._search(this.body, "tagName", tagName);
  }
  addEventListener(eventType, callback) {
    if (!this.eventListeners[eventType]) {
      this.eventListeners[eventType] = [];
    }
    this.eventListeners[eventType].push(callback);
  }
  removeEventListener(eventType, callback) {
    if (this.eventListeners[eventType]) {
      const index = this.eventListeners[eventType].indexOf(callback);
      if (index !== -1) {
        this.eventListeners[eventType].splice(index, 1);
      }
    }
  }
  dispatchEvent(eventType) {
    if (this.eventListeners[eventType]) {
      this.eventListeners[eventType].forEach(callback => {
        callback();
      });
    }
  }
  _search(element, attribute, value) {
    if (
      (attribute === "tagName" && element.tagName === value) ||
      (attribute !== "tagName" && element.getAttribute(attribute) === value)
    ) {
      return element;
    }
    for (let child of element.children) {
      let result = this._search(child, attribute, value);
      if (result) return result;
    }
    return null;
  }
  _searchAll(element, attribute, value) {
    let results = [];
    if (
      (attribute === "tagName" && element.tagName === value) ||
      (attribute !== "tagName" && element.getAttribute(attribute) === value)
    ) {
      results.push(element);
    }
    for (let child of element.children) {
      results = results.concat(this._searchAll(child, attribute, value));
    }
    return results;
  }
  querySelector(selector) {
    if (selector.startsWith("#")) {
      return this.getElementById(selector.slice(1));
    }
    if (selector.startsWith(".")) {
      return this.getElementByClassName(selector.slice(1));
    }
    else {
      return this.getElementsByTagName(selector.slice(1));
    }
    return null;
  }
  querySelectorAll(selector) {
    if (selector.startsWith("#")) {
      return this._searchAll(this.body, "id", selector.slice(1));
    }
    if (selector.startsWith(".")) {
      return this._searchAll(this.body, "className", selector.slice(1));
    } else {
    }
    return null;
  }
  get body() {
    return this.children[0];
  }
  get head() {
    return this.children[1];
  }
  get innerHTML() {
    let html = `<html>`;
    this.children.forEach((child) => {
      html += child.innerHTML;
    });
    html += `</html>`;
    return html;
  }
  set innerHTML(html) {}
  children = [];
}

export { Document, Element };
