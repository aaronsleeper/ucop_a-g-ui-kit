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
