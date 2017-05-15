function windowAlert(textToDisplay) {
    if (document.body)
        window.alert(textToDisplay);
    else
        notSupported();
}
