/*
 * @Author: mengpeng
 * @Date: 2023-07-09 10:07:59
 * @Last Modified by: mengpeng 
 * @Last Modified time: 2023-07-09 11:07:58 
 */

import dayjs from 'dayjs';
import chalk from 'chalk';

export const log = (msg) => {
    const log = `${dayjs().format('YYYY-MM-DD HH:mm:ss')} - ${msg}`;
    console.log(log);
};

export const logInfo = (msg) => {
    log(chalk.blue(msg));
};

export const logWarn = (msg) => {
    log(chalk.yellow(msg));
};

export const logSuccess = (msg) => {
    log(chalk.green(msg));
};
