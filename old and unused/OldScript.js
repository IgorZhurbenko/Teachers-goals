function switchPages(pageNumber) {
    document.getElementById('page' + String(pageNumber)).hidden = false;
    this.hidden = true;

    var i = 0;
    while (document.getElementById('page' + String(i))) {
        if (i != pageNumber) {
            document.getElementById('page' + String(i)).hidden = true;
            document.getElementById('button' + String(i)).hidden = false;
        }
        i++;
    }

    const button = document.getElementById('pageSwitcher');
}

function findLevel(arr, level) {
    for (var subjLevel of arr) {
        if (subjLevel['level'].replace('-', '__') == level.replace('-', '__')) { return subjLevel; }
    }
}
    var subject = '';

                for (var subj of SubjectsList) {
                    var newSubj = document.createElement('option');
                    newSubj.value = subj.replace(' ', '');
                    newSubj.innerHTML = normalizeString(subj);
                    document.getElementById('subjectSelect').appendChild(newSubj);
                }

                var subjectInfo = {};

                function selectSubject() {

        subject = document.getElementById('subjectSelect').options[document.getElementById('subjectSelect').selectedIndex].value;
                    subjectInfo = SubjectsInfoJson[subject];

                    var container = document.getElementById('levelSelect');

                    while (container.firstChild) {
        container.removeChild(container.firstChild);
                    }

                    var newLevel = document.createElement('option');
                    newLevel.innerHTML = '';
                    newLevel.value = '';
                    document.getElementById('levelSelect').appendChild(newLevel);

                    for (var subj of subjectInfo) {
                        var newLevel = document.createElement('option');
                        newLevel.innerHTML = normalizeString(subj['level']);
                        newLevel.value = subj['level'].replace(' ', '_');
                        document.getElementById('levelSelect').appendChild(newLevel);
                    }

                    document.getElementById('levelSelect').hidden = !subject;
                    document.getElementById('levelSelectLabel').hidden = !subject;

                    document.getElementById('levelSelect').onchange = function () {
        chosenLevel = document.getElementById('levelSelect').options[document.getElementById('levelSelect').selectedIndex].value;

                        var container = document.getElementById('mainContainer');

                        while (container.firstChild) {
        container.removeChild(container.firstChild);
                        }

                        new OptionsLine([findLevel(subjectInfo, chosenLevel)['problems'],
                        findLevel(subjectInfo, chosenLevel)['methods'],
                        findLevel(subjectInfo, chosenLevel)['tools'],
                        findLevel(subjectInfo, chosenLevel)['indicators']], document.getElementById('mainContainer'), headers, ['через', 'на основе']);
                    }

                }

                var headers = ['Проблема', 'Методический инструмент',
                    'Инструмент ИКТ',
                    'Индикаторы решения проблемы / достижения цели'];
            