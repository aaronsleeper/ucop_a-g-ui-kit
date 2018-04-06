/* -- -- -- -- -- -- -- -- -- --
Tooltips
-- -- -- -- -- -- -- -- -- -- */

// Init
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
/* -- -- -- -- -- -- -- -- -- --
Loader Animation
-- -- -- -- -- -- -- -- -- -- */

// Init
var loader = document.getElementsByClassName('loader')

for (var i = 0; i < loader.length; i++) {
    var animation = bodymovin.loadAnimation({
        container: loader[i],
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'animations/loader.json'
    })
}
var angleOfRotation = 45;

function sizeBackground() {
    // get the viewport dimensions
    var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    // calculate the size of our rectangle
    var rw = (vh*Math.sin(angleOfRotation)) + (vw*Math.cos(angleOfRotation));
    var rh = (vw*Math.sin(angleOfRotation)) + (vh*Math.cos(angleOfRotation));
    console.log('vw: ' + vw, 'vh: ' + vh, 'rw: ' + Math.round(rw), 'rh: ' + Math.round(rh));

    // set the values to custom props on the body
    document.body.style.setProperty('--rw', rw + 'px');
    document.body.style.setProperty('--rh', rh + 'px');
}

// Run all the functions
// on load
window.addEventListener('load', function() {
	sizeBackground();
});
// on resize
window.addEventListener('resize', function() {
	sizeBackground();
});