$(document).ready(function () {
    $(window).on('load', function () {

        var li = '<li class="list-group-item d-flex justify-content-between align-items-center">';
        var div2 = '</div>';
        var ul1 = '<ul class="list-group">';
        var ul2 = '</ul>';

        $.get("Subject/GetSubjects", {},
            function (credits) {
                mapSub = new Map();
                mapTop = new Map();
                $(credits).each(function (index, item) {
                    var content = '<div class="card text-center">';
                    var id = item.id;
                    var name = item.name;
                    mapSub.set(id, name);
                    content += '<div class="card-header">' + '<ul class="nav nav-pills card-header-pills">' + subjectSettings(id) + ul2 + div2;
                    content += '<div class="card-body">' + '<h5 class="card-title fs-3 ">' + name + '</h5> ';

                    var topics = item.topics;
                    if (topics != null) {

                        var topicView = ul1
                        var temp = new Map();
                        const groupByGradLevel = topics.reduce((group, topic) => {
                            const { gradeLevel } = topic;
                            group[gradeLevel] = group[gradeLevel] ?? [];
                            group[gradeLevel].push(topic);
                            mapTop.set(topic.id, topic);
                            temp.set(gradeLevel, group[gradeLevel]);
                            return group;
                        }, {});

                        temp.forEach((value, key) => { topicView += card_body3(key, value); })
                        topicView += ul2;
                        content += topicView;
                    }
                    content += div2 + div2;
                    var div = 'subject' + id;
                    $('#subjects').append('<div id="' + div + '"></div><br/><br/>');
                    $('#' + div).html(content);
                });

                //subject delete
                $(".del_sub").click(function (e) {
                    var b = e.target.getAttribute('data-value');
                    $('#idSubject_delete').val(b);
                });

                //rename subject
                $(".ren_sub").click(function (e) {
                    var b = parseInt(e.target.getAttribute('data-value'));
                    name = mapSub.get(b);
                    $('#idSubject_rename').val(b);
                    $('#new_name').val(name);
                });

                //add topic
                $(".add_top").click(function (e) {
                    var b = e.target.getAttribute('data-value');
                    console.log('add:' + b);
                    $('#idSubject_top').val(b);
                });

                //delete topic
                $(".del_top").click(function (e) {
                    var b = e.target.getAttribute('data-value');
                    console.log('del' + b);
                    $('#idTopic_delete').val(b);
                });

                //change topic
                $(".chan_top").click(function (e) {
                    var b = parseInt(e.target.getAttribute('data-value'));
                    gradeLevel = mapTop.get(b).gradeLevel;
                    description = mapTop.get(b).description;
                    console.log('change:' + b + ' gl:' + gradeLevel + ' desc:' + description);
                    $('#cur_grad').val(gradeLevel);
                    $('#cur_desc').val(description);
                    $('#idTopic_change').val(b);
                });

            });

        function subjectSettings(id) {
            return '<li class="nav-item">' +
                '<button type="button" class="btn btn-outline-success add_top" data-bs-toggle="modal" data-bs-target="#create_topic"  data-value = "' + id + '" >Добавить тему</button>' +
                '</li>' +
                '<li class="nav-item">' +
                '<button type="button" class="btn btn-outline-warning ren_sub" data-bs-toggle="modal" data-bs-target="#subject_rename"  data-value = "' + id + '" >Переименовать</button>' +
                '</li>' +
                '<li class="nav-item">' +
                '<button type="button" class="btn btn-outline-danger del_sub" data-bs-toggle="modal" data-bs-target="#subject_delete"  data-value = "' + id + '" >Удалить</button>' +
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
