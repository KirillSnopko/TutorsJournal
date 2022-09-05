
$(document).ready(function () {
    $(window).on('load', function () {

        var li = '<li class="list-group-item d-flex justify-content-between align-items-center">';
        var div2 = '</div>';
        var ul1 = '<ul class="list-group">';
        var ul2 = '</ul>';
        var current_id_student = window.location.href.split('Course?idStudent=')[1];
        mapCourses = new Map();
        mapLessons = new Map();
        mapSub = new Map();
        mapGrade = new Map();

        $.get("Course/Courses?id=" + current_id_student, {},
            function (data) {


                $(data).each(function (index, item) {
                    var content = '<div class="card text-center">';
                    var id = item.id;
                    var subject = item.subject;
                    var grade = item.gradeLevel;
                    var lessons = item.lessons;
                    var initPrice = item.initPrice;
                    var goals = item.goals;


                    content += '<div class="card-header">' + '<ul class="nav nav-pills card-header-pills">' + subjectSettings(id) + ul2 + div2;
                    content += '<div class="card-body">' + '<h5 class="card-title fs-3 ">' + subject + ' <span class="badge bg-primary">' + grade + 'класс</span>' + '</h5> ';


                    //if (topics != null) {

                    //    var topicView = ul1
                    //    var temp = new Map();
                    //    const groupByGradLevel = topics.reduce((group, topic) => {
                    //        const { gradeLevel } = topic;
                    //        group[gradeLevel] = group[gradeLevel] ?? [];
                    //        group[gradeLevel].push(topic);
                    //        mapTop.set(topic.id, topic);
                    //        temp.set(gradeLevel, group[gradeLevel]);
                    //        return group;
                    //    }, {});

                    //    temp.forEach((value, key) => { topicView += card_body3(key, value); })
                    //    topicView += ul2;
                    //    content += topicView;
                    //}
                    content += div2 + div2;
                    var div = 'course' + id;
                    $('#courses').append('<div id="' + div + '"></div><br/><br/>');
                    $('#' + div).html(content);
                });

                $(".create_course").click(function (e) {
                    $('#idStudent').val(current_id_student);
                });

                ////create course
                //$(".create_course").click(function (e) {
                //    $('#idStudent').val(current_id_student);

                //    $.get("Subject/GetSubjects", {}, function (date) {
                //        $(date).each(function (index, item) {
                //            var id = item.id;
                //            var name = item.name;
                //            var topics = item.topics;
                //            if (topics != null) {
                //                topics.reduce((group, topic) => {
                //                    const { subjectId } = topic;
                //                    group[subjectId] = group[subjectId] ?? [];

                //                    var flag = true;
                //                    group[subjectId].forEach(function (item, index, array) {
                //                        if (item == topic.gradeLevel) { flag = false; }
                //                    });

                //                    if (flag) {
                //                        group[subjectId].push(topic.gradeLevel);
                //                    }

                //                    mapGrade.set(subjectId, group[subjectId]);

                //                    return group;
                //                }, {});
                //            }
                //            mapSub.set(id, name);
                //        });
                //    });

                //    var selectSubject = new String();
                //    mapSub.forEach((value, key) => {
                //        selectSubject += '<form-check form-check-inline float-start">' +
                //            '<input type="radio" class="form-check-input select" id="subject_select' + key + '" name="subject" value="' + key + '">' +
                //            '<label class="form-check-label" for="subject_select' + key + '">' + value + '</label></div><br />'

                //    });
                //    $('#select_subject').html(selectSubject);

                //    //$("[id^='subject_select']").click(function (e) {
                //    //    $('#select_grade').html('');
                //    //    var id = this.id.split('subject_select')[1];
                //    //    var selectGrade = new String();
                //    //    selectGrade += '<select class= "form-select form-select-sm" aria - label=".form-select-lg example" >';
                //    //    selectGrade += ' <option selected>Выберите класс</option>';
                //    //    var arr = mapGrade.get(parseInt(id));

                //    //    for (let x of arr) {
                //    //        selectGrade += ' <option value="' + x + '">' + x + 'класс' + '</option>';
                //    //    }

                //    //    selectGrade += '</select >';

                //    //    $('#select_grade').html(selectGrade);
                //    //});


                //});



                ////console.log(current_id_student);
                ////console.log(mapSub);
                ////console.log(mapGrade);
            });


        //create course
        $.get("Subject/GetSubjects", {}, function (date) {
            $(date).each(function (index, item) {
                var id = item.id;
                var name = item.name;
                var topics = item.topics;
                if (topics != null) {
                    topics.reduce((group, topic) => {
                        const { subjectId } = topic;
                        group[subjectId] = group[subjectId] ?? [];

                        var flag = true;
                        group[subjectId].forEach(function (item, index, array) {
                            if (item == topic.gradeLevel) { flag = false; }
                        });

                        if (flag) {
                            group[subjectId].push(topic.gradeLevel);
                        }

                        mapGrade.set(subjectId, group[subjectId]);

                        return group;
                    }, {});
                }
                mapSub.set(id, name);
            });
            var selectSubject = new String();
            mapSub.forEach((value, key) => {
                selectSubject += '<form-check form-check-inline float-start">' +
                    '<input type="radio" class="form-check-input select" id="subject_select' + key + '" name="subject" value="' + key + '">' +
                    '<label class="form-check-label" for="subject_select' + key + '">' + value + '</label></div><br />'

            });
            $('#select_subject').html(selectSubject);

            $("[id^='subject_select']").click(function (e) {
                $('#select_grade').html('');
                var id = this.id.split('subject_select')[1];
                var selectGrade = new String();
                selectGrade += '<select class= "form-select form-select-sm" aria - label=".form-select-lg example" name="grade" >';
                selectGrade += ' <option selected>Выберите класс</option>';
                var arr = mapGrade.get(parseInt(id));

                for (let x of arr) {
                    selectGrade += ' <option value="' + x + '">' + x + 'класс' + '</option>';
                }

                selectGrade += '</select >';

                $('#select_grade').html(selectGrade);
            });
        });












        ////subject delete
        //$(".del_sub").click(function (e) {
        //    var b = e.target.getAttribute('data-value');
        //    $('#idSubject_delete').val(b);
        //});

        ////rename subject
        //$(".ren_sub").click(function (e) {
        //    var b = parseInt(e.target.getAttribute('data-value'));
        //    name = mapSub.get(b);
        //    $('#idSubject_rename').val(b);
        //    $('#new_name').val(name);
        //});

        ////add topic
        //$(".add_top").click(function (e) {
        //    var b = e.target.getAttribute('data-value');
        //    console.log('add:' + b);
        //    $('#idSubject_top').val(b);
        //});

        ////delete topic
        //$(".del_top").click(function (e) {
        //    var b = e.target.getAttribute('data-value');
        //    console.log('del' + b);
        //    $('#idTopic_delete').val(b);
        //});

        ////change topic
        //$(".chan_top").click(function (e) {
        //    var b = parseInt(e.target.getAttribute('data-value'));
        //    gradeLevel = mapTop.get(b).gradeLevel;
        //    description = mapTop.get(b).description;
        //    console.log('change:' + b + ' gl:' + gradeLevel + ' desc:' + description);
        //    $('#cur_grad').val(gradeLevel);
        //    $('#cur_desc').val(description);
        //    $('#idTopic_change').val(b);
        //});



        function subjectSettings(id) {
            return '<li class="nav-item">' +
                '<button type="button" class="btn btn-outline-success add_lesson" data-bs-toggle="modal" data-bs-target="#create_lesson"  data-value = "' + id + '" >Добавить урок</button>' +
                '</li>' +
                '<li class="nav-item">' +
                '<button type="button" class="btn btn-outline-warning additionally" data-bs-toggle="modal" data-bs-target="#course_additionally"  data-value = "' + id + '" >Дополнительно</button>' +
                '</li>' +
                '<li class="nav-item">' +
                '<button type="button" class="btn btn-outline-warning edit_course" data-bs-toggle="modal" data-bs-target="#course_edit"  data-value = "' + id + '" >Редактировать</button>' +
                '</li>' +
                '<li class="nav-item">' +
                '<button type="button" class="btn btn-outline-danger del_course" data-bs-toggle="modal" data-bs-target="#course_delete"  data-value = "' + id + '" >Удалить</button>' +
                '</li>';
        }


        function topicSettings(id, description) {
            return li + '<div class="dropdown">' +
                '<button class="btn btn-outline-info dropdown-toggle" type="button" id="dropdownMenuButton' + id + ' " data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                description +
                ' </button>' +
                '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton' + id + '">' +
                '<a class="dropdown-item chan_top" href="#" data-bs-toggle="modal" data-bs-target="#change_topic" data-value = "' + id + '" >Изменить тему</a>' +
                '<a class="dropdown-item del_top" href="#" data-bs-toggle="modal" data-bs-target="#delete_topic"  data-value = "' + id + '" >Удалить</a>' +
                ' </div>' +
                '</div></li>';
        }

        function card_body3(key, value) {
            var str = new String();
            for (let topic of value) {
                str += (topicSettings(topic.id, topic.description));
            }

            return li +
                '<button type="button" class="btn btn-primary btn-block" data-bs-toggle="collapse" data-bs-parent="#parent" data-bs-target="#topic' + key + '" aria-expanded="false" aria-controls="#topic' + key + '" >' +
                key + 'класс' +
                ' <span class="badge bg-danger">' + value.length + '</span></button></li>' + '<div id="topic' + key + '" class="collapse">' + ul1 + str + ul2 + '</div>';
        }




    });
});
