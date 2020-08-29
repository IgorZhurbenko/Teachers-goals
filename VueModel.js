var app = new Vue(
    {
        el: '#app',
        data: {
            activePage: 0,
            pages: [
                {
                    title: "Описание конструктора",
                    data: AboutConstructor.split('\n')
                },
                {
                    title: "Онлайн конструктор"
                },
                {
                    title: "Описание инструментов ИКТ",
                    Itools: tools
                }
            ],
            chosenLevelIndex: null,
            chosenSubject: null,
            chosenMethod: null,
            chosenTool: null,
            chosenProblem: null,
            subjectsInfo: SubjectsInfo,
            subjectsList: SubjectsList
        },
        computed: {
            subjects: function () {
                return this.subjectsList
            },
            levels: function () {
                return !!this.chosenSubject ? this.subjectsInfo[this.chosenSubject] : []
            },
            chosenLevel: function () {
                return this.chosenSubject && this.chosenLevelIndex ? this.subjectsInfo[this.chosenSubject][this.chosenLevelIndex] : null;
            },
            methods: function () {
                return !!this.chosenLevel ? this.chosenLevel.methods : []
            },
            tools: function () {
                return !!this.chosenLevel ? this.chosenLevel.tools : []
            },
            problems: function () {
                return !!this.chosenLevel ? this.chosenLevel.problems : []
            },
            indicators: function () {
                return !!this.chosenLevel && !!this.chosenProblem ? this.chosenProblem.indicators : []
            },
            formulatedAim: function () {

                if (this.chosenProblem && this.chosenMethod && this.chosenTool && this.chosenSubject && this.chosenLevel) {
                    return this.chosenProblem.problem + ' через ' + this.chosenMethod + ' на основе ' + this.chosenTool
                }
                else { return "1"; }

            }
        }
    })