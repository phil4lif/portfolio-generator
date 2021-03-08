const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);


// fs.writeFile('./index.html', pageHTML, err => {
//     if (err) throw err;

//     console.log('Portfolio Complete! Check out index.html to see the output!')
// });
const promptUser = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your name?'
            },
            {
                type: 'input',
                name: 'github',
                message: 'Enter your Github Username'
            },
            {
                type: 'input',
                name: 'about',
                message: 'Provide a little info about yourself:'
            }
        ]);
};

const promptProject = () => {
    console.log(`
    ===================================
    Add a New Project to Your Portfolio
    ====================================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project'
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'How did you build it?',
            choices: ['JavaScript', 'Node.js', 'React', 'React-Native', 'Flutter', 'Swift', 'Kotlin', 'Java', 'Objective-C', 'Dart', 'HTML', 'CSS', 'Angular', 'Vue', 'PHP']
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like this to be your featured project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'comfirmAddProject',
            message: 'Would you like to add another project?',
            default: false
        }
    ]);
};
promptUser().then(answers => console.log(answers));