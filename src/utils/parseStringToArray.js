module.exports = function parseStringToArray(arrayString){
    return arrayString.split(',').map(tech => tech.trim())
}