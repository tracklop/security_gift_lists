/** NOTE - Generates a string of the current date and time in YYYY/MM/DD - HH:MM:SS format.
 *
 * @function getCurrentDateTime
 * @returns {string} The current date and time.
 * @example
 * // Returns the current date and time, e.g., "2023/07/21 - 13:45:30".
 * const dateTime = getCurrentDateTime();
 * console.log(dateTime);
 */
export const getCurrentDateTime = () => {
    const date_ob = new Date();
    const format = (n) => n.toString().padStart(2, '0');

    const year = date_ob.getFullYear();
    const month = format(date_ob.getMonth() + 1);
    const date = format(date_ob.getDate());
    const hours = format(date_ob.getHours());
    const minutes = format(date_ob.getMinutes());
    const seconds = format(date_ob.getSeconds());

    return `${year}/${month}/${date} - ${hours}:${minutes}:${seconds}`;
};
