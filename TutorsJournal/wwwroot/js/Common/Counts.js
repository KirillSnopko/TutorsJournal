$(document).ready(function () {
    $(window).on('load', function () {
        $.get("../Student/Count", {},
            function (count) {
                $('#student_count').html(count['count']);
            }
        );
        $.get("../Subject/Count", {},
            function (count) {
                $('#subject_count').html(count['count']);
            }
        );
    });
});
