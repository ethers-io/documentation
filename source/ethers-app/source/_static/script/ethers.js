function pad(value) {
    value = String(value);
    while (value.length < 3) { value = '0' + value; }
    return value;
}
function setupSlideshow(el) {
    var frame = document.createElement('div');
    frame.className = 'frame';
    el.appendChild(frame);

    var clipper = document.createElement('div');
    clipper.className = 'clipper';
    frame.appendChild(clipper);

    var backButton = document.createElement('div');
    backButton.className = 'button back';
    backButton.textContent = '\u25C0';
    frame.appendChild(backButton);

    var nextButton = document.createElement('div');
    nextButton.className = 'button next';
    nextButton.textContent = '\u25B6';
    frame.appendChild(nextButton);

    var pageButtons = document.createElement('div');
    pageButtons.className = 'page-buttons';
    frame.appendChild(pageButtons);

    var topic = el.getAttribute('data-topic');
    var count = parseInt(el.getAttribute('data-count'));

    var current = 0;

    var img = null;

    function show(slide, direction) {
        var antiDirection = null;

        var oldImg = img;

        img = document.createElement('div');
        img.className = 'image';

        var selected = pageButtons.querySelector('.selected');
        if (selected) { selected.classList.remove('selected'); }

        pageButtons.querySelector('.page-' + slide).classList.add('selected');

        // Only null on the bootstrap call
        if (direction) {
            var antiDirection = (direction === 'left') ? 'right': 'left';
            img.classList.add('slide-in-' + antiDirection);

            setTimeout(function() {
                oldImg.classList.add('slide-out-' + direction)
                img.classList.remove('slide-in-' + antiDirection);
                setTimeout(function() {
                    oldImg.remove();
                    console.log('rem');
                }, 1000);
            });
        }

        img.style.backgroundImage = 'url(_static/slideshows/' + topic + '/slide-' + slide + '.jpg)';
        clipper.appendChild(img);

        current = slide;

        img.onclick = function() {
            show((current + 1) % count, 'left');
        };
    }

    backButton.onclick = function() {
        show((current + count - 1) % count, 'right');
    };

    nextButton.onclick = function() {
        show((current + 1) % count, 'left');
    };

    for (var i = 0; i < count; i++) {
        (function(i) {
            var pageButton = document.createElement('div');
            pageButtons.appendChild(pageButton);

            pageButton.className = 'page-' + i;

            pageButton.onclick = function() {
                if (current < i) {
                    show(i, 'left');
                } else if (current > i) {
                    show(i, 'right');
                }
            };
        })(i);
    }

    // Bootstrap the slideshow
    show(0);
}

document.addEventListener('DOMContentLoaded', function() {
    Array.prototype.forEach.call(document.body.querySelectorAll('.slideshow'), function(el) {
        setupSlideshow(el);
    });
});
