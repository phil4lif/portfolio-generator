const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template.js');

const promptUser = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your name? (Required)',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log('You must enter your name!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'github',
                message: 'Enter your Github Username',
                validate: githubInput => {
                    if (githubInput) {
                        return true;
                    } else {
                        console.log('You must enter your github account name!');
                        return false;
                    }
                }
            },
            {
                type: 'confirm',
                name: 'confirmAbout',
                message: 'Would you like to include an about me section?',
                default: true
            },
            {
                type: 'input',
                name: 'about',
                message: 'Provide a little info about yourself:',
                when: ({ confirmAbout }) => {
                    if (confirmAbout) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        ]);
};

const promptProject = (portfolioData) => {
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
    ===================================
    Add a New Project to Your Portfolio
    ====================================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the project?',
            validate: projectNameInput => {
                if (projectNameInput) {
                    return true;
                } else {
                    console.log('You must enter the project name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project',
            validate: descInput => {
                if (descInput) {
                    return true;
                } else {
                    console.log('You must enter a description of the project!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'link',
            message: 'Link to the project',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('You must enter a link to the project!')
                }
            }
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
            name: 'confirmAddProject',
            message: 'Would you like to add another project?',
            default: false
        }
    ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData)
            } else {
                return portfolioData;
            }

        })
};
    const mockData = {
        name: 'Lernantino',
        github: 'lernantino',
        confirmAbout: true,
        about:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
        projects: [
          {
            name: 'Run Buddy',
            description:
              'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
            languages: ['HTML', 'CSS'],
            link: 'https://github.com/lernantino/run-buddy',
            feature: true,
            confirmAddProject: true
          },
          {
            name: 'Taskinator',
            description:
              'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
            languages: ['JavaScript', 'HTML', 'CSS'],
            link: 'https://github.com/lernantino/taskinator',
            feature: true,
            confirmAddProject: true
          },
          {
            name: 'Taskmaster Pro',
            description:
              'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
            languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
            link: 'https://github.com/lernantino/taskmaster-pro',
            feature: false,
            confirmAddProject: true
          },
          {
            name: 'Robot Gladiators',
            description:
              'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
            languages: ['JavaScript'],
            link: 'https://github.com/lernantino/robot-gladiators',
            feature: false,
            confirmAddProject: false
          }
        ]
      };

    const pageHTML = generatePage(mockData)
        fs.writeFile('./dist/index.html', pageHTML, err => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Portfolio Complete! Check out index.html to see the output!');
            
            fs.copyFile('./src/style.css', './dist/style.css', err => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('Style sheet copied successfully!');
            })
        });