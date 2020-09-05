var firstLetterToUpperCase = function (str)
{
    return str[0].toUpperCase() + str.slice(1)
}

var allCapitalise = function(arr)
{
    let res = []
    for (let str of arr) {
        res.push(firstLetterToUpperCase(str))
    }
    return res;
}