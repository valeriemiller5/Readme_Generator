const fs = require("fs");
const urls = require( 'shields-badge-url-custom' );
const inquire = require("inquirer");

inquire
    .prompt([
        {
            type: "input",
            name: "githubName",
            message: "Please entery your GitHub username:",
            validate: function (input) {
                const done = this.async();
                if (input == "") {
                    return done("You must enter a username")
                } else {
                    done(true)
                }
            }
        },
        {
            type: "input",
            name: "inputEmail",
            message: "Please enter your email address:",
            validate: function (input) {
                const done = this.async();
                if (input == "") {
                    return done("You must enter your email")
                } else {
                    done(true)
                }
            }
        },
        {
            type: "input",
            name: "inputTitle",
            message: "Please enter the title of your project:",
            validate: function (input) {
                const done = this.async();
                if (input == "") {
                    return done("You must enter a title")
                } else {
                    done(true)
                }
            }
        },
        {
            type: "input",
            name: "projectDescription",
            message: "Please give a brief description of your project:",
            validate: function (input) {
                const done = this.async();
                if (input == "") {
                    return done("You must enter a description")
                } else {
                    done(true)
                }
            }
        },
        {
            type: "input",
            name: "install",
            message: "How should the user install this project?",
            default: "npm i"
        },
        {
            type: "input",
            name: "testing",
            message: "How should the user test this code?",
            default: "npm test"
        },
        {
            type: "rawlist",
            name: "licensing",
            message: "Which license was used for this project?",
            choices: ["MIT", "Apache", "GNU", "Other", "No license was used"],
        },
        {
            type: "input",
            name: "contribution",
            message: "How can others contribute to this project?",
            validate: function (input) {
                const done = this.async();
                if (input == "") {
                    return done("You must enter a description")
                } else {
                    done(true)
                }
            }
        }
    ])
    .then(answers => {
        console.log(answers)
        // const myShield = "![github shield](https://img.shields.io/badge/MyApp-isAwesome-blueviolet)";
        const badge = urls({
            'label': 'license',
            'status': answers.licensing,
            'color': 'lightgreen'
        });
        let myShield;

        if(answers.licensing === "Other" || answers.licensing === "No license was used") {
            myShield = ""
        } else {
            myShield = `![github shield](${badge.image})`
        }
        // Due to template literal formatting, the spacing isn't "pretty" in the code, but renders well in the README
        const response = `# ${answers.inputTitle}
${myShield}

## Table of Contents
* [Installation](#installation)
* [Tests](#tests)
* [Usage](#usage)
* [LICENSE](#license)
* [Contributing](#contributing)
* [Questions?](#questions?)

## Installation
In order to install this project, run \`${answers.install}\` in the terminal

## Tests
To test this project, run \`${answers.testing}\` in the terminal

## Usage
${answers.projectDescription}

## License
This project uses the ${answers.licensing} license

## Contributing
Instructions for contributing:
${answers.contribution}

## Questions?
For questions, please contact the project owner, [${answers.githubName}](mailto:${answers.inputEmail}).
`
        fs.writeFile("README.md", response, err => {
            if (err) throw err;
            console.log("Success!");
        })
    });