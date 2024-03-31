import boxen from 'boxen';
import { getCurrentDateTime } from './time.util.js';
import { Sequelize } from 'sequelize';

/** NOTE - Logs a message in a styled box with a title and border color.
 *
 * @function boxenLog
 * @param {Object} options - Contains log, title, and color properties.
 * @param {any} options.log - The content to log.
 * @param {string} [options.title=""] - Optional title for the log.
 * @param {string} [options.color="blue"] - Border color, default is blue.
 * @example
 * // Logs "Hello World" with no title and blue border.
 * boxenLog({ log: "Hello World" });
 * @example
 * // Logs "I love unicorns" with the title "I'm a title" and magenta border.
 * boxenLog({ log: "I love unicorns", title: "I'm a title", color: "magenta" });
 */
export const boxenLog = ({ log, title = '', color = 'blue' }) => {
    const logTitle = title ? title.concat(' - ', getCurrentDateTime()) : getCurrentDateTime();

    console.log(
        '\n' +
            boxen(log, {
                title: logTitle,
                titleAlignment: 'left',
                borderStyle: 'round',
                padding: 1,
                borderColor: color,
                fullscreen: (width, height) => [width - width / 4],
            }),
    );
};

/** NOTE - Logs an error in a styled box indicating an error condition.
 *
 * @function boxenError
 * @param {Error|Sequelize.Error} err - The error to log, with extra info if it's a Sequelize error.
 * @example
 * // Logs a Sequelize error with additional instructions.
 * boxenError(new Sequelize.Error('Database connection failed'));
 */
export const boxenError = (err) => {
    if (err instanceof Sequelize.Error) {
        err += '\n\n# Please look at the last logged request to see where this error is coming from.';
    }
    console.log(
        '\n' +
            boxen(`${err}`, {
                title: `ERROR - ${getCurrentDateTime()}`,
                titleAlignment: 'left',
                borderStyle: 'round',
                padding: 1,
                borderColor: 'redBright',
                fullscreen: (width, height) => [width - width / 4],
            }),
    );
};

export default {
    boxenLog,
    boxenError,
};
