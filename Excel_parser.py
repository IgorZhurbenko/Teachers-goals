import openpyxl


def log(message):
    f = open('out.txt', 'w')
    f.write(str(message))
    f.close()

def empty(string : str):
    return string == None or string.strip() == ''
    
def addIfNotEmpty(arr : list, string : str):
    if not empty(string):
        arr.append(string.strip())


wb = openpyxl.load_workbook('./all.xlsx')
doc = wb.get_sheet_by_name('all')

currentline = 3

res = []

def line():
    global currentline, doc
    obj = {}
    obj['a'] = doc['a' + str(currentline)].value
    obj['b'] = doc['b' + str(currentline)].value
    obj['d'] = doc['d' + str(currentline)].value
    obj['f'] = doc['f' + str(currentline)].value
    obj['h'] = doc['h' + str(currentline)].value
    obj['j'] = doc['j' + str(currentline)].value
    return obj

while (str(doc['A' + str(currentline)].value).count('/') < 5):
    obj0 = {}
    obj0['subject'] = doc['A' + str(currentline)].value
    obj0['levels'] = []
    while (str(doc['A' + str(currentline)].value).count('*') < 1):
        obj1 = {}
        obj1['level'] = doc['b' + str(currentline)].value
        obj1['problems'] = []
        obj1['tools'] = []
        obj1['methods'] = []
        #obj1['indicators'] = []
        #currentline+=1

        problem = {}
        problem['problem'] = line()['d']
        problem['indicators'] = []

        while (empty(doc['A' + str(currentline)].value) or doc['b' + str(currentline)].value == obj1['level']):
            cl = line()
            problemName = cl['d'] if bool(cl['d']) else problemName
            if problem['problem'] == problemName:
                addIfNotEmpty(problem['indicators'],cl['j'])
            else:
                obj1['problems'].append(problem)
                problem = {}
                problem['problem'] = problemName
                problem['indicators'] = []
                addIfNotEmpty(problem['indicators'],cl['j'])

            addIfNotEmpty(obj1['tools'],cl['h'])
            addIfNotEmpty(obj1['methods'],cl['f'])
            #addIfNotEmpty(obj1['indicators'],cl['j'])
            currentline+=1
            cl = line()
        obj1['problems'].append(problem)
        obj0['levels'].append(obj1)
        #currentline += 1
        if cl['a'].count('/') > 3:
            break;    

    res.append(obj0)
    if cl['a'].count('/') > 3:
        break;
    currentline += 1
    
#print(res[0])

a = open('generatedfromexcel.js', 'w')

filecontent = 'SubjectsList = []; \n SubjectsInfoJson = {}; \n'

for subj in res:
    filecontent += 'SubjectsInfoJson[' + '"' + subj['subject'].replace('-','__') + '".split(" ").join("_")' + '] = ' + str(subj['levels']).replace('-','__') + '\n'
    filecontent += 'SubjectsList.push(' + '"' + subj['subject'].replace('-','__') + '".split(" ").join("_")' + '); \n\n\n'

a.write(filecontent)
a.close()


