export default class Customizator {
  constructor() {
    this.btnsBlock = document.createElement("div");
    this.colorPicker = document.createElement("input");
    this.clear = document.createElement("div");
    this.scale = localStorage.getItem("scale") || 1;
    this.color = localStorage.getItem("color") || "#ffffff";
    this.btnsBlock.addEventListener("click", (e) => this.onScaleChange(e));
    this.colorPicker.addEventListener("input", (e) => this.onColorChange(e));
    this.clear.addEventListener("click", ()=> this.reset());

  }
  onScaleChange(e) {
    let scale;
    const body = document.body;
    if (e) {
      this.scale = e.target.value.replace(/x/g, "");
    }
    const recursy = (elements) => {
      elements.childNodes.forEach(node => {
        if (node.nodeName === "#text" && node.nodeValue.replace(/\s+/g, "").length > 0) {
          if (!node.parentNode.getAttribute("data-fz")) {
            // let parent = node.parentNode;
            let value = window.getComputedStyle(node.parentNode, null).fontSize;
            node.parentNode.setAttribute("data-fz", +value.replace(/px/g, ""));
            node.parentNode.style.fontSize = node.parentNode.getAttribute("data-fz") * this.scale + "px";
          } else {
            node.parentNode.style.fontSize = node.parentNode.getAttribute("data-fz") * this.scale + "px";
          }
        } else {
          recursy(node);
        }
      });
    };
    recursy(body);
    localStorage.setItem("scale", this.scale);
  }

  onColorChange(e) {
    document.body.style.backgroundColor =e.target.value;
    localStorage.setItem("color", e.target.value);
  }

  setBg() {
    document.body.style.backgroundColor = this.color;
    this.colorPicker.value = this.color;
  }

  reset() {
    localStorage.clear();
    this.scale = 1;
    this.color = "#ffffff";
    this.setBg();
    this.onScaleChange();
  }

  render() {
    this.setBg();
    this.onScaleChange();

    let inputScaleS = document.createElement("input");
    let inputScaleM = document.createElement("input");
    let panel = document.createElement("div");

    this.colorPicker.setAttribute("type", "color");
    this.colorPicker.setAttribute("value", "#ffffff");
    this.colorPicker.classList.add("color");

    this.clear.innerHTML = "&times";
    this.clear.classList.add("clear");


    inputScaleS.setAttribute("type", "button");
    inputScaleM.setAttribute("type", "button");
    inputScaleS.setAttribute("value", "1x");
    inputScaleM.setAttribute("value", "1.5x");

    inputScaleM.classList.add("scale_btn");
    inputScaleS.classList.add("scale_btn");

    panel.classList.add("panel");

    this.btnsBlock.classList.add("scale");
    this.btnsBlock.append(inputScaleS, inputScaleM);
    panel.append(this.btnsBlock, this.colorPicker, this.clear);

    document.body.append(panel);
  }
}