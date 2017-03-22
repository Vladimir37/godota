(function() {
    $('#divider').click(function() {
        var newsText = $('#news-text').val();
        $('#news-text').val(newsText + ' ###cut###');
        return false;
    });

    $('#symbols').click(function() {
        $('#symbolsModal').modal('show');
        return false;
    });

    $('.symbol_add').click(function() {
        var newsText = $('#news-text').val();
        var tag = '${' + $(this).attr('alt') + '}';
        $('#news-text').val(newsText + tag);
        $('#symbolsModal').modal('hide');
        return false;
    });
})();