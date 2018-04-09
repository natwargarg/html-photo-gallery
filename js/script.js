/*
* # Responsive Image Gallery #
* Functnality : 
* On clicking next button the next image will be loaded, selected and shown.
* On clicking prev button the previous image will be loaded, selected and shown.
* The selected image thumbnail should be highlighted from the rest using a white border.
* @author - NG
* @Modify-Date: 09/04/2018 
*/

var gallaryApp = {
    'imageList': [],
    'selectedIndex': 0
};

(function (_app) {
    "use strict";
    /*
    * function called when user clicked on any thumbnails.
    */
    _app.thumbnail_onClick = function (event) {
        /* unselect all thmbnails */
        document.querySelectorAll(".thumbnail-img").forEach((thumb) => thumb.classList.remove("thumbnail-img-selected"));
        /* load large image for thumbnail selected */
        document.querySelector(".big-img").src = event.target.src.replace("thumbs", "largePics");
        /* select clicked image as selected */
        event.target.classList.add("thumbnail-img-selected");
        _app.selectedIndex = parseInt(event.target.getAttribute("data-index"));

    }

    /*
    * function called when user clicked on next prev nav button
    */
    _app.nav_onClick = function (isNext) {

        /* unselect all thmbnails */
        document.querySelectorAll(".thumbnail-img").forEach((thumb) => thumb.classList.remove("thumbnail-img-selected"));

        /* change selected thumb index when user clicked on next or prev button */
        _app.selectedIndex = isNext ? ((_app.selectedIndex + 1) % _app.imageList.length) : ((_app.selectedIndex - 1) % _app.imageList.length);
        _app.selectedIndex = (_app.selectedIndex < 0) ? _app.imageList.length - 1 : _app.selectedIndex;
        let imgdata = _app.imageList[_app.selectedIndex];
        let thumbElement = document.querySelector('img[data-index="' + _app.selectedIndex + '"]');

        /* select clicked image as selected */
        thumbElement.classList.add("thumbnail-img-selected");
        /*load large image */
        document.querySelector(".big-img").src = imgdata.large_url;
    }


    /* Create gallary */
    _app.createGallary = function () {
        let _index = 0;
        _app.imageList.forEach(
            (image) => {
                let _thumbElement = document.createElement('img');
                _thumbElement.src = image.thumb_url;
                _thumbElement.alt = image.description;
                _thumbElement.id = image.id;
                _thumbElement.setAttribute('data-index', _index);
                _thumbElement.className = "thumbnail-img";
                if (_index === 0) {
                    _thumbElement.classList.add("thumbnail-img-selected");
                }
                document.querySelector(".thumbnails").appendChild(_thumbElement);
                _index++;
            }
        );
    }

    /* load images data from external json file*/

    function getImageData() {
        var request = new XMLHttpRequest();
        request.overrideMimeType("application/json");
        request.open('GET', '/resource/images.json', true);
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == "200") {
                _app.imageList = JSON.parse(request.responseText);
            }
        };
        request.send(null);
    }
    getImageData();

})(gallaryApp);