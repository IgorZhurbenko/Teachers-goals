import openpyxl


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
        obj1['indicators'] = []
        #currentline+=1
        while (empty(doc['A' + str(currentline)].value) or doc['b' + str(currentline)].value == obj1['level']):
            cl = line()
            addIfNotEmpty(obj1['problems'],cl['d'])
            addIfNotEmpty(obj1['tools'],cl['h'])
            addIfNotEmpty(obj1['methods'],cl['f'])
            addIfNotEmpty(obj1['indicators'],cl['j'])
            currentline+=1
            cl = line()
        obj0['levels'].append(obj1)
        #currentline += 1
        if cl['a'].count('/') > 3:
            break;    

    res.append(obj0)
    if cl['a'].count('/') > 3:
        break;
    currentline += 1
    

a = open('generatedfromexcel.js', 'w')

filecontent = 'SubjectsList = []; \n SubjectsInfoJson = {}; \n'

for subj in res:
    filecontent += 'SubjectsInfoJson[' + '"' + subj['subject'].replace('-','__') + '".replace(" ","_")' + '] = ' + str(subj['levels']).replace('-','__') + '\n'
    filecontent += 'SubjectsList.push(' + '"' + subj['subject'].replace('-','__') + '".replace(" ","_")' + '); \n\n\n'

a.write(filecontent)
a.close()


