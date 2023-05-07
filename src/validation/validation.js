/*------------ To validate string ----------------- */
const isValidString = function (value) {
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}
/*------------ To validate user name ----------------- */
const isValidName = function (name) {
    let regex = /^[a-z A-Z ]+$/
    return regex.test(name)

};

/*------------ To validate user email ----------------- */
const isValidEmail = function (value) {
    const regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return regex.test(value)
};

/*------------ To validate user password ----------------- */
const isValidPassword = function(password){
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/
    return regex.test(password)
  }

module.exports = { isValidString, isValidName, isValidEmail, isValidPassword }