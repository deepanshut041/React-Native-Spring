/**
 * Validates whether a field has a value
 * @param {String} value - Value which need to be validated
 * @param {string} fieldName - The field to validate
 * @returns {string} - The error message
 */
export const required = (value: String, fieldName: String): string =>
    value === undefined || value === null || value === ""
        ? `${fieldName} must be populated`
        : "";

/**
* Validates whether a field is a valid email
* @param {String} value - Value which need to be validated
* @param {string} fieldName - The field to validate
* @returns {string} - The error message
*/
export const isEmail = (value: String, fieldName: String): string =>
    value && value.search(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ? `${fieldName} must be in a valid email format`
        : "";

/**
* Validates whether a field is within a certain amount of characters
* @param {String} value - Value which need to be validated
* @param {string} fieldName - The field to validate
 * @param {number} length - The maximum number of characters
* @returns {string} - The error message
*/
export const maxLength = (value: String, fieldName: String, length: number): string =>
    value && value.length > length
        ? `${fieldName} can not exceed ${length} characters`
        : "";

/**
* Validates whether a field is within a certain amount of characters
* @param {String} value - Value which need to be validated
* @param {string} fieldName - The field to validate
 * @param {number} length - The maximum number of characters
* @returns {string} - The error message
*/
export const minLength = (value: String, fieldName: String, length: number): string =>
    value && value.length < length
        ? `${fieldName} must be minimum ${length} characters`
        : "";