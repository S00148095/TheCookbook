"use strict"
function Expand() {
    $(".contentvisible").toggle();
    $(".contentexpanded").slideToggle("slow");
}
function Dialog() {
    /* Doesn't work, no idea why, should prevent closing the modal by clicking outside or esc key
    window.REMODAL_GLOBALS = {
        NAMESPACE: 'remodal',
        DEFAULTS: {
            closeOnEscape: false,
            closeOnOutsideClick: false
        }
    }; */ 
    var inst = $('[data-remodal-id=modal]').remodal();
    inst.open();
}

var myExtObject = (function () {
    return {
        openModal: function () {
            Dialog();
        }
    }
})(myExtObject || {});