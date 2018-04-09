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
/* ------------------------------

Equations being used are from the link below
https://math.stackexchange.com/questions/592701/calculating-dimensions-of-rotated-rectangle-for-it-to-to-mask-original?rq=1

eventually this will be used to cover the entire <body>

for now i've sized it down by 1/2 so i can see what i'm doing

------------------------------ */

var angleOfRotation = .785;

function sizeBackground() {
    var rot = Math.round(180.0 * angleOfRotation / 3.1416);

    // get the viewport dimensions
    var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    // calculate the size of our rectangle
    var rw = (vh*Math.sin(angleOfRotation)) + (vw*Math.cos(angleOfRotation));
    var rh = (vw*Math.sin(angleOfRotation)) + (vh*Math.cos(angleOfRotation));
    console.log('vw: ' + vw, 'vh: ' + vh, 'rw: ' + Math.round(rw), 'rh: ' + Math.round(rh), 'rot: ' + rot);

    // set the values to custom props on the body
    document.body.style.setProperty('--vw', vw + 'px');
    document.body.style.setProperty('--vh', vh + 'px');
    document.body.style.setProperty('--rw', rw + 'px');
    document.body.style.setProperty('--rh', rh + 'px');
    document.body.style.setProperty('--rot', rot + 'deg');
    document.body.style.setProperty('--rtop', Math.round((vh - rh)/2) + 'px');
    document.body.style.setProperty('--rleft', Math.round((vw - rw)/2) + 'px');
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