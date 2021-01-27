/**
 * @desc VALIDATES INPUT FIELDS
 * @param {*} value VALUE PASSED
 * @returns {Boolean} BOOLEAN
 */
const isEmpty = value => (typeof value === 'string' ? value.trim() === '' : value);

/**
 * @function isEmail
 * @param {*} value
 * @return {*} boolean
 */
const isEmail = (value) => {
  const regex = /([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ /* eslint-disable-line */
  return regex.test(value);
};


/**
 * @function isName
 * @param {*} value
 * @returns {Boolean} BOOLEAN
 */
const isName = value => ((/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/ig).test(value));


module.exports = {
 isEmail, isEmpty, isName
};