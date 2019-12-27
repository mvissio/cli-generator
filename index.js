#!/usr/bin/env node

const shelljs = require('shelljs');
const figlet = require('figlet');
const chalk = require('chalk');
const inquirer = require('inquirer');

const fileCreatedMessage = pathName => {
    console.log(
        chalk.white.bold(
            `Fichero creado correctamente.\nUbicacion: ${pathName}`
        )
    );
};

const createFile = (name, extension) => {
    const pathFile = `${process.cwd()}/${name}.${extension}`;
    shelljs.touch(pathFile);
    return pathFile;
};

const configQuestions = () => {
    const listQuestions = [
        {
            name: 'FICHERO',
            type: 'input',
            message: '¿Como se llamara el fichero?'
        },
        {
            name: 'EXTENSION',
            type: 'list',
            message: 'Que extension tiene el fichero?',
            choices: ['.ts', '.js', '.css', '.scss', '.java', '.rb'],
            filter: function(val) {
                return val.split('.')[1];
            }
        }
    ];
    return inquirer.prompt(listQuestions);
};

const init = () => {
    console.log(
        chalk.green(
            figlet.textSync('File creator cli', {
                font: 'Crawford2',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        )
    );
};

const eject = async () => {
    init();
    const { FICHERO, EXTENSION } = await configQuestions();
    const pathFile = createFile(FICHERO, EXTENSION);
    fileCreatedMessage(createFile(FICHERO, EXTENSION));
};

eject();
