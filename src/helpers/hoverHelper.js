import {colorToRgbString} from './colorHelper';

const addHightlight = (divElem, linkElem, line1Elem, line2Elem, color) => {
    linkElem.style.border = `2px solid ${colorToRgbString(color, 0.5)}`;
    line1Elem.style.stroke = colorToRgbString(color, 0.5);
    line2Elem.style.stroke = colorToRgbString(color, 0.5);
    divElem.style.border = `2px solid ${colorToRgbString(color, 0.5)}`;
}

const removeHightlight = (divElem, linkElem, line1Elem, line2Elem, color) => {
    linkElem.style.border = `2px solid rgba(50, 50, 50, 0.1)`;
    line1Elem.style.stroke = colorToRgbString(color, 0.15);
    line2Elem.style.stroke = colorToRgbString(color, 0.15);
    divElem.style.border = `0px`;
}


export const handleHoverLink = (linkRef, linkKey, line1Ref, line2Ref, data, isMouseOver) => {
    // linkRef.current.style.backgroundColor = 'blue'
    const {color} = data;

    // Find the corresponding div with the entitykey and highlight it
    const divElem = document.getElementById(`comment-div-${linkKey}`);
    if (!divElem) {
        return;
    }

    if (isMouseOver) {
        addHightlight(divElem, linkRef.current, line1Ref.current, line2Ref.current, color);
    }
    else {
        removeHightlight(divElem, linkRef.current, line1Ref.current, line2Ref.current, color);
    }    
}

export const handleHoverComment = (divRef, key, color, isMouseOver) => {
    const linkElem = document.getElementById(`comment-span-${key}`);
    const line1Elem = document.getElementById(`svg-line1-${key}`);
    const line2Elem = document.getElementById(`svg-line2-${key}`);
    if (!linkElem || !line1Elem || !line2Elem) {
        return;
    }

    if (isMouseOver) {
        addHightlight(divRef.current, linkElem, line1Elem, line2Elem, color);
    }
    else {
        removeHightlight(divRef.current, linkElem, line1Elem, line2Elem, color);
    }
}
