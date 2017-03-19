(function () {
    var currentNum = 0;

    $('body').on('change', '.gal_pic', function() {
        if ($(this).data('num') == currentNum) {
            currentNum++;
            var newInput = '<input class="form-control gal_pic" data-num="' + currentNum + '" name="gallery_' + currentNum + '" type="file">';
            $(newInput).appendTo('.gallery');
        }
    });
})();