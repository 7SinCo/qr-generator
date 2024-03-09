const textEl = document.querySelector("#data");
const sizeEl = document.querySelector("#size");
const logoEl = document.querySelector("#logo");
const marginQREl = document.querySelector("#marginQR");
const clearEl = document.querySelector("#clear");
const marginEl = document.querySelector("#margin");
const dotModeEl = document.querySelector("#dot");
const dotColorEl1 = document.querySelector("#dot-color-1");
const dotColorEl2 = document.querySelector("#dot-color-2");
const cornersEl = document.querySelector("#corners");
const cornersColorEl = document.querySelector("#corners-color");
const bgEl = document.querySelector("#bg-color");
const logoSizeEl = document.querySelector("#logo-size");
const dlEl = document.querySelector("#btn-dl");
const copyEl = document.querySelector("#btn-copy");
const typeEl = document.querySelector("#canvas-type");

let op = {
  width: sizeEl.value * 10,
  height: sizeEl.value * 10,
  margin: 0,
  data: textEl.value,
  dotsOptions: {
    color: "#4267b2",
    type: "square",
    gradient: {
      type: "linear",
      colorStops: [
        {
          offset: 0,
          color: "#000",
        },
        {
          offset: 1,
          color: "#000",
        },
      ],
    },
  },
  backgroundOptions: {
    color: "#fff",
  },
  imageOptions: {},
  cornersSquareOptions: {},
};

render();

sizeEl.addEventListener("input", (e) => {
  op.width = e.target.value * 10;
  op.height = e.target.value * 10;
  render();
});

marginQREl.addEventListener("input", (e) => {
  op.margin = e.target.value * 10;
  render();
});

textEl.addEventListener("keyup", (e) => {
  op.data = e.target.value;
  render();
});

marginEl.addEventListener("input", (e) => {
  op.imageOptions = { margin: e.target.value };
  render();
});

dotModeEl.addEventListener("change", (e) => {
  op.dotsOptions.type = e.target.value;
  render();
});

dotColorEl1.addEventListener("input", (e) => {
  op.dotsOptions.gradient.colorStops[0].color = e.target.value;
  render();
});

dotColorEl2.addEventListener("input", (e) => {
  op.dotsOptions.gradient.colorStops[1].color = e.target.value;
  render();
});

cornersEl.addEventListener("change", (e) => {
  op.cornersSquareOptions.type = e.target.value;
  render();
});

bgEl.addEventListener("input", (e) => {
  op.backgroundOptions.color = e.target.value;
  op.backgroundOptions.color1 = e.target.value;
  op.backgroundOptions.color2 = e.target.value;
  render();
});

logoSizeEl.addEventListener("input", (e) => {
  op.imageOptions = { imageSize: e.target.value };
  render();
});

var qrCode;

function render() {
  qrCode = new QRCodeStyling(op);
  let canvasEl = document.querySelector("#canvas");
  canvasEl.innerHTML = "";
  qrCode.append(canvasEl);
  canvasEl.nextElementSibling.innerHTML = `<b>${op.width}</b> X <b>${op.height}</b>`;
}

function copyImage() {
  const canvas = document.querySelector("canvas");
  canvas.toBlob(function (blob) {
    const item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([item]);
  });
}

function browse() {
  logoEl.click();
}

logoEl.addEventListener("change", (e) => {
  let file = e.target.files[0];
  let reader = new FileReader();
  reader.onload = () => {
    op.image = reader.result;
    render();
  };
  reader.readAsDataURL(file);
});

clearEl.addEventListener("click", (e) => {
  delete op.image;
  render();
});

dlEl.addEventListener("click", (e) => {
  qrCode.download({ name: "qr", extension: `${typeEl.value}` });
});

copyEl.addEventListener("click", (e) => {
  let timeout;
  copyImage();
  copyEl.classList.add("copy-done");
  copyEl.innerHTML =
    "Listo <i class='fa-solid fa-circle-check icon-green'></i>";
  timeout = setTimeout(revertText, 1500);
});

function revertText() {
  copyEl.classList.remove("copy-done");
  copyEl.innerHTML = "Copiar <i class='fa-solid fa-copy'></i>";
}
