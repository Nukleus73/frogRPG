const blob = document.getElementById("cursor");

document.body.onpointermove = event => {
    const { clientX, clientY } = event;

    blob.animate({
        left: clientX + "px",
        top: clientY + "px"
    }, {duration: 100, fill: "forwards"})
}