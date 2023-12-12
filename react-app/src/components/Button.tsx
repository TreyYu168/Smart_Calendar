import {useState} from "react";

interface Props {
    onClick: () => void
}
function Button({onClick} : Props) {
    const [style, setStyle] = useState('primary')
    const [buttonText, setButtonText] = useState('Click Me')
    return (
        <button className={'btn btn-' + style}
                onClick={() => {
                    setStyle('secondary');
                    setButtonText('Clicked');
                    onClick()
                }}>
            {buttonText}
        </button>
    )
}

export default Button