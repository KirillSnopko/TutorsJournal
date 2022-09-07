
$(document).ready(function () {
    $(window).on('load', function () {

        var li = '<li class="list-group-item d-flex justify-content-between align-items-center">';
        var div2 = '</div>';
        var ul1 = '<ul class="list-group">';
        var ul2 = '</ul>';
        var current_id_student = window.location.href.split('Course?idStudent=')[1];
        mapCourses = new Map();
        mapSub = new Map();
        mapGrade = new Map();
        mapTopics = new Map();

        $.get("Course/Courses?id=" + current_id_student, {},
            function (data) {

                $(data).each(function (index, item) {
                    var content = '<div class="card text-center">';
                    var id = item.id;
                    var subjectId = item.subjectId;
                    var subject = item.subject;
                    var grade = item.gradeLevel;
                    var lessons = item.lessons;
                    var initPrice = item.initPrice;
                    var goals = item.goals;

                    mapCourses.set(id, item);


                    content += '<div class="card-header">' +
                        '<ul class="nav nav-pills card-header-pills">' + courseSettings(id, subjectId) + ul2 + div2;
                    content += '<div class="card-body ">' + '<h5 class="card-title fs-3 ">' + subject + '</h5>' + ' <span class="badge rounded-pill bg-danger">' + grade + 'класс</span>' + '<span class="badge rounded-pill bg-success">' + initPrice + 'BYN</span>';
                    var lessons_table = new String();
                    var result = 0;
                    mapLessons = new Map();
                    if (lessons != null && lessons.length > 0) {
                        for (let x of lessons) {
                            mapLessons.set(x.id, x);
                        }
                        console.log(mapLessons);
                        var size = 0;
                        var sum = 0;
                        mapLessons.forEach((value, key) => {
                            if (value.isEvaluated) {
                                sum += value.percentOfDecision;
                                size++;
                            }
                        });
                        result = sum / size;

                        lessons_table = '<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#lessons' + id + '" aria-expanded="false" >Уроки<span class="badge bg-secondary">' + mapLessons.size + 'шт</span></button>';

                        lessons_table += '<div class="collapse" id="lessons' + id + '">';
                        lessons_table += lessonsList(mapLessons) + div2;
                    } else {
                        lessons_table += '<p> Список уроков пуст</p>';
                    }
                    content += '<span class="badge bg-black">' + result + '%</span><br/>';
                    content += '<p class="card-text bg-info float-start">Цель курса: ' + goals + '</p><br/>';
                    content += lessons_table;
                    content += div2 + div2;
                    var div = 'course' + id;
                    $('#courses').append('<div id="' + div + '"></div><br/><br/>');
                    $('#' + div).html(content);
                });
                console.log('Курсы:' + mapCourses);

                $(".create_course").click(function (e) {
                    $('#idStudent').val(current_id_student);
                });

                $(".add_lesson").click(function (e) {
                    var b = e.target.getAttribute('data-value').split('/');
                    var courseid = parseInt(b[0]);
                    var subjectId = parseInt(b[1]);
                    console.log(courseid + '/' + subjectId);


                    $('#idCourse').val(courseid);
                    $('#cur_price').val(mapCourses.get(courseid).initPrice + 'BYN');

                    var selectTopic = new String();

                    $.get("Subject/GetTopics?idSubject=" + subjectId + '&grade=' + mapCourses.get(courseid).gradeLevel, {}, function (date) {
                        var topics = date.topics;
                        console.log(date);
                        selectTopic += '<select class= "form-select form-select-sm" aria - label=".form-select-lg example" name="topic" >';
                        selectTopic += ' <option value="" selected>Выберите тему</option>';
                        if (topics != null) {
                            for (let x of topics) {
                                console.log(x.description);
                                selectTopic += '<option value="' + x.description + '">' + x.description + '</option>';
                            }
                        }
                        selectTopic += '</select >';
                        console.log(selectTopic);
                        $('#select_topic').html(selectTopic);
                    });
                });

                //edit course
                $(".edit_course").click(function (e) {
                    var b = parseInt(e.target.getAttribute('data-value'));
                    price = parseInt(mapCourses.get(b).initPrice);
                    goal = mapCourses.get(b).goals;

                    $('input[name="price"]', edit_course).val(price);
                    $('input[name="goal"]', edit_course).val(goal);
                    $('input[name="id"]', edit_course).val(b);
                });

                $('.del_course').click(function (e) {
                    var b = parseInt(e.target.getAttribute('data-value'));
                    $('input[name="id"]', delete_course).val(b);
                });

                $('.evaluate').click(function (e) {
                    var b = parseInt(e.target.getAttribute('data-value'));
                    $('input[name="id"]', evaluate).val(b);
                });

                $('.edit_lesson').click(function (e) {
                    var b = parseInt(e.target.getAttribute('data-value'));
                    var lesson = mapLessons.get(b);
                    var task = lesson.task;
                    var comment = lesson.comment;
                    var dateTime = moment(lesson.date);
                    var date = new String(dateTime.format("YYYY-MM-DD"));
                    console.log(date);
                    var time = dateTime.format("HH:mm")
                    $('input[name="id"]', edit_lesson).val(b);
                    $('textarea[name="task"]', edit_lesson).val(task);
                    $('textarea[name="comment"]', edit_lesson).val(comment);
                    $('input[name="date"]', edit_lesson).val(date);
                    $('input[name="time"]', edit_lesson).val(time);
                });

                $('.del_lesson').click(function (e) {
                    var b = parseInt(e.target.getAttribute('data-value'));
                    $.post("/Course/DeleteLesson", { id: b },
                        function (status) {
                            if (status['status'] == 200) {
                                location.reload();
                            } else {
                                alert(status['message']);
                            }
                        });
                });

                $('.close').click(function (e) {
                    var b = parseInt(e.target.getAttribute('data-value'));
                    $.post("/Course/CloseLesson", { id: b },
                        function (status) {
                            if (status['status'] == 200) {
                                location.reload();
                            } else {
                                alert(status['message']);
                            }
                        });
                });
                $('.cancel').click(function (e) {
                    var b = parseInt(e.target.getAttribute('data-value'));
                    $.post("/Course/CancelLesson", { id: b },
                        function (status) {
                            if (status['status'] == 200) {
                                location.reload();
                            } else {
                                alert(status['message']);
                            }
                        });
                });
                $(".excel").click(function (e) {
                    var id = parseInt(e.target.getAttribute('data-value'));
                    window.open("/Export/Excel?idCourse=" + id);
                });

            });


        //create course
        $.get("Subject/GetSubjects", {}, function (date) {
            $(date).each(function (index, item) {
                var id = item.id;
                var name = item.name;
                var topics = item.topics;
                mapTopics.set(id, topics);
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
            console.log(mapTopics);
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

        function courseSettings(id, subjectId) {
            return '<li class="nav-item">' +
                '<button type="button" class="btn btn-outline-success add_lesson" data-bs-toggle="modal" data-bs-target="#create_lesson"  data-value = "' + id + '/' + subjectId + '" >Добавить урок</button>' +
                '</li>' +
                '<li class="nav-item">' +
                '<button type="button" class="btn btn-outline-warning edit_course" data-bs-toggle="modal" data-bs-target="#course_edit"  data-value = "' + id + '" >Редактировать</button>' +
                '</li>' +
                '<li class="nav-item">' +
                '<button type="button" class="btn btn-success excel"   data-value = "' + id + '" >Excel</button>' +
                '</li>' +
                '<li class="nav-item">' +
                '<button type="button" class="btn btn-outline-danger del_course" data-bs-toggle="modal" data-bs-target="#course_delete"  data-value = "' + id + '" >Удалить</button>' +
                '</li>';
        }


        function lessonSettings(id, isCompleted, isCanceled, isEvaluated) {
            var divDrop = '<div class="dropdown">' +
                '<button class="btn btn-outline-info dropdown-toggle" type="button" id="dropdownMenuButton' + id + ' " data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                'Настройки </button>';
            var but_del = '<a class="dropdown-item del_lesson"  data-value = "' + id + '">Удалить</a>';
            var but_evaluate = '<a class="dropdown-item evaluate" " data-bs-toggle="modal" data-bs-target="#evaluate_lesson" data-value = "' + id + '">Оценить</a>';
            var but_close = '<a class="dropdown-item close" data-value = "' + id + '">Закрыть</a>';
            var but_cancel = '<a class="dropdown-item cancel"  data-value = "' + id + '">Отменить</a>';
            var but_edit = '<a class="dropdown-item edit_lesson"  data-bs-toggle="modal" data-bs-target="#edit_lesson" data-value = "' + id + '" >Редактировать</a>';
            var ul_1 = ' <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton' + id + '">';
            var ul_2 = '</ul>';

            if (isCanceled || isEvaluated) {
                return divDrop + ul_1 + but_del + ul_2 + div2;
            }
            if (isCompleted) {
                return divDrop + ul_1 + but_evaluate + but_del + ul_2 + div2;
            } else {
                return divDrop + ul_1 + but_del + but_close + but_cancel + but_edit + ul_2 + div2;
            }
        }

        function lessonsList(lessons) {

            var str = '<table class="table">' +
                '<thead>' +
                '<tr>' +
                '<th scope="col">#</th>' +
                '<th scope="col">Тема</th>' +
                '<th scope="col">Дата</th>' +
                '<th scope="col">Задание</th>' +
                '<th scope="col">Результат</th>' +
                '<th scope="col">BYN</th>' +
                '<th scope="col">Комментарий</th>' +
                '<th scope="col">Настройки</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';
            var x = 0;

            lessons.forEach((value, key) => {
                console.log('lessons: ' + key + ' --' + value);
                var buttons;
                if (value.isCompleted && !value.isCanceled) {
                    str += '<tr class="table-success">';
                } else if (value.isCanceled) {
                    str += '<tr class="table-danger">';
                }
                else {
                    str += '<tr class="table-primary">';
                }
                console.log("isCompleted: " + value.isCompleted, 'isCanceled: ' + value.isCanceled + 'isEvaluated: ' + value.isEvaluated);
                buttons = lessonSettings(key, value.isCompleted, value.isCanceled, value.isEvaluated)

                var date = moment(value.date);
                moment.locale('ru');
                str += '<th scope="row">' + x++ + '</th>' +
                    '<td scope="col">' + value.topic + '</td>' +
                    '<td scope="col">' + date.format('DD.MM.YY HH-mm') + '</td>' +
                    '<td scope="col">' + value.task + '</td>' +
                    '<td scope="col">' + value.percentOfDecision + '%</td>' +
                    '<td scope="col">' + value.price + '</td>' +
                    '<td scope="col">' + value.comment + '</td>' +
                    '<td scope="col">' + buttons + '</td>' +
                    '</tr >';
            });

            str += '</tbody>' + '</table>';
            return str;
        }
    });
});
