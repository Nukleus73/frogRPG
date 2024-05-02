const blob = document.getElementById("cursor");

gameContainer.onpointermove = event => {
    const { clientX, clientY } = event;
    const containerRect = gameContainer.getBoundingClientRect();

    blob.animate({
        left: (clientX - containerRect.left) + "px",
        top: (clientY - containerRect.top) + "px"
    }, {duration: 100, fill: "forwards"})
}
