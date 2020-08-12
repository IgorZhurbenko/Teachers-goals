// JavaScript source code

function normalizeString(str) {
    if (!str) return str;
    return (str[0].toUpperCase() + str.slice(1)).split('_').join(' ');
}

function uploadFields(list, field)
{
    res = [];
    for (var line of list)
    {
        res.push(line[field])
    }
    return res;
}

function determineIndicatorsVisibility(optionsLine)
{
    var i = 0;
    while (optionsLine['_' + String(i)] != undefined)
    {
        if (!optionsLine['_' + String(i)].Value)
        {
            indicatorsContainer.hidden = true;
            return false;
        }
        i++;
    }
    indicatorsContainer.hidden = false;
    return true;
}

class Options {
    constructor(optionsGiven, appendTo, onselect, name) {

        var newRow = document.createElement('tr');
        var newColumn = document.createElement('td');

        appendTo.appendChild(newRow);
        newRow.appendChild(newColumn);


        var selector = document.createElement('select');

        var options = optionsGiven.filter(function (item, pos) {
            return optionsGiven.indexOf(item) == pos;
        });
        options.sort();
        if (options.find(elem => elem == "") == undefined) {
            options.unshift('');
        }

        this.options = options;
        this.selector = selector;

        for (var option of options) {
            var newOption = document.createElement('option');
            newOption.value = option.replace('_', ' ');
            newOption.innerHTML = normalizeString(option.split('__').join('-'));
            selector.appendChild(newOption);
        }

        var label = document.createElement('p');
        label.innerHTML = name + ' ';
        label.style.color = 'white';
        this.label = label;

        newColumn.appendChild(label);

        var newColumn = document.createElement('td');
        newRow.appendChild(newColumn);
        newColumn.appendChild(selector);
        selector.onchange = onselect;
    }

    get Value() {
        return this.options[this.selector.selectedIndex]
    }

    set Value(value) {
        for (var i in this.selector) {
            if (this.options[i] == value) {
                this.selector.selectedIndex = i;
                return;
            }
        }
    }

    switch(onoff) {
        this.label.hidden = this.selector.hidden = !Boolean(onoff);
    }
}

class OptionsLine {
    constructor(OptionsList, appendTo, optionsNames, bindingWords) {
        var self = this;

        var table = document.createElement('table');
        table.setAttribute('class', 'table');

        appendTo.appendChild(table);
        var tbody = document.createElement('tbody');
        table.appendChild(tbody);
        
        for (var num in OptionsList) {
            var i = Number(num);

            if (typeof (OptionsList[num][0]) == typeof ('')) {
                this['_' + String(i)] = new Options(OptionsList[i], tbody,
                    function () {
                        var j = 1;
                        while (self['_' + String(Number(this.owner.number) + j)] != undefined) {
                            var isNotEmpty = Boolean(self['_' + String(Number(this.owner.number) + j - 1)].Value);
                            var isNotHidden = !Boolean(self['_' + String(Number(this.owner.number) + j - 1)].selector.hidden);
                            self['_' + String(Number(this.owner.number) + j)].switch(
                                isNotEmpty
                                && isNotHidden &&
                                self['_' + String(Number(this.owner.number + 1) + (j - 1))] != undefined)
                            j++;
                        }
                        j = 0;
                        self.signature.innerHTML = "";
                        while (self['_' + Number(j)] != undefined && self['_' + j].Value) {
                            var bindingWord = Boolean(bindingWords[j]) ? bindingWords[j] : "";
                            self.signature.innerHTML = self.signature.innerHTML + " " + self['_' + j].Value + " " + bindingWord;

                            j++;
                        }
                        determineIndicatorsVisibility(self);

                    }, optionsNames[i]);
            }
            else
            {
                var problemsNames = uploadFields(OptionsList[i], 'problem');
                    this['_' + String(i)] = new Options(problemsNames, tbody,
                    function () {
                        var j = 1;
                        while (self['_' + String(Number(this.owner.number) + j)] != undefined) {
                            var isNotEmpty = Boolean(self['_' + String(Number(this.owner.number) + j - 1)].Value);
                            var isNotHidden = !Boolean(self['_' + String(Number(this.owner.number) + j - 1)].selector.hidden);
                            self['_' + String(Number(this.owner.number) + j)].switch(
                                isNotEmpty
                                && isNotHidden &&
                                self['_' + String(Number(this.owner.number + 1) + (j - 1))] != undefined)
                            j++;
                        }
                        j = 0;
                        self.signature.innerHTML = "";
                        while (self['_' + Number(j)] != undefined && self['_' + j].Value) {
                            var bindingWord = Boolean(bindingWords[j]) ? bindingWords[j] : "";
                            self.signature.innerHTML = self.signature.innerHTML + " " + self['_' + j].Value + " " + bindingWord;

                            j++;
                        }

                        this.problemsInfo = OptionsList[0];
                        window.indicators = this.problemsInfo[this.selectedIndex-1]['indicators'];

                        while (window.indicatorsList.firstChild) {
                            window.indicatorsList.removeChild(window.indicatorsList.firstChild);
                        }

                        for (var indicator of window.indicators)
                        {
                            var newLine = document.createElement('li');
                            newLine.innerHTML = indicator;
                            window.indicatorsList.appendChild(newLine);
                        }

                        determineIndicatorsVisibility(self);

                    }, optionsNames[i]);
            }
            this["_" + i].selector.owner = this["_" + i];
            this["_" + i].switch(num < 1);
            this["_" + i].number = i;

            if (OptionsList.length - num <= 2) { break; }
        }

        this.signature = document.createElement('h4');
        this.signature.style.textAlign = 'center';
        appendTo.appendChild(this.signature);

        window.indicatorsContainer = document.createElement('div');
        window.indicatorsContainer.style.marginLeft = '40px';
        var indicatorsLabel = document.createElement('p');
        indicatorsLabel.innerHTML = 'Индикаторы достижения цели профессионального развития:';
        
        window.indicatorsContainer.appendChild(indicatorsLabel);
        
        window.indicatorsList = document.createElement('ul');
        window.indicatorsContainer.appendChild(window.indicatorsList);
        appendTo.appendChild(window.indicatorsContainer);

        determineIndicatorsVisibility(self);
        
    }

    GetValue(index) {
        return this['_' + String(index)].Value
    }

    setVisibilities()
    {
        

    }
}


