"use strict"
function Expand() {
    $(".contentvisible").toggle();
    $(".contentexpanded").slideToggle("slow");
}
function openModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
}
function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
}
function SeeHiddenDivs() {
    $('#NewRemove').removeClass('hidden');
    $('#NewSuccess').removeClass('hidden');
};
function HideDivs() {
    $('#NewRemove').addClass('hidden');
    $('#NewSuccess').addClass('hidden');
}
var myExtObject = (function () {
    return {
        openModal: function () {
            openModal();
        }
    }
})(myExtObject || {});