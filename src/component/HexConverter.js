import { useState } from "react"

const HEX_PATTERN = /^#[a-fA-F0-9]{6}$/;

export default function HexConverter () {

  const [hexColor, setColor] = useState({
    code: '',
    rgb: '#ffffff',
    validate: true,
    error: false,
  });

  const handleColorChange = (evt) => {
    setColor((prevColor) => ({...prevColor, code: evt.target.value}));

    if (hexColor.code.length > 5) {
      setColor((prevState) => ({...prevState, validate: true}));
    }
    setColor((prevColor) => ({...prevColor, error: false}));
  };

  const hexToRgb = (hex) => {
    const red = parseInt(hex.slice(1, 3), 16);
    const green = parseInt(hex.slice(3, 5), 16);
    const blue = parseInt(hex.slice(5, 7), 16);
    
    return [red, green, blue];
  };

  const validateInput = () => {
  const backgroundColorElement = document.querySelector('.main');

    if (hexColor.code.length === 7 && HEX_PATTERN.test(hexColor.code)) {
        backgroundColorElement.style.backgroundColor = hexColor.code;
        setColor((prevColor) => ({...prevColor, rgb: hexColor.code}));
    }

    if (hexColor.code.length === 7 && !HEX_PATTERN.test(hexColor.code)) {
      setColor((prevColor) => ({...prevColor, error: true}));
      backgroundColorElement.style.backgroundColor = '#AA4412';
    }

    if (hexColor.code.length > 7) {
      setColor((prevColor) => ({...prevColor, error: true}));
      backgroundColorElement.style.backgroundColor = '#AA4412';
    }
    setColor((prevState) => ({...prevState, validate: false}));
  }

  if (hexColor.validate) {
    validateInput();
  }

  return (
    <div className="main">
      <div className="color-input">
        <input value={hexColor.code} onInput={handleColorChange} placeholder="Type Hex code" className="color-input-field"/>
      </div>
      <div>
        <input value={ hexColor.error? 'Wrong Hex Code!' : `rgb (${hexToRgb(hexColor.rgb)})` || hexColor.rgb} readOnly className="color-output-field"/>
      </div>
    </div>
  )
}