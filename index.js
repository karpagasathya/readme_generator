// External packages
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

// Internal modules
const api = require("./utils/githubApi.js");
const generateMarkdown = require("./utils/generateMarkdown.js");

// Inquirer prompts for userResponses
const questions = [
  {
    type: "input",
    message: "Enter your GitHub username?",
    name: "username",
    validate: function (answer) {
      if (answer.length === " ") {
        return console.log("A valid GitHub username is required.");
      }
      return true;
    },
  },
  {
    type: "email",
    message: "Enter your email?",
    name: "email",
    validate: function (answer) {
      if (answer.length === " ") {
        return console.log("A valid email is required.");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "What is your project repository name?",
    name: "repo",
    default: "readme_generator",
    validate: function (answer) {
      if (answer.length === " ") {
        return console.log("A valid Github repo is required.");
      }
      return true;
    },
  },

  {
    type: "input",
    message: "What is your project title?",
    name: "title",
    default: "Readme generator",
  },

  {
    type: "input",
    message: "Write a short description of your project?",
    name: "description",
    default: "Project Description",
  },

  {
    type: "input",
    message: "What command should be used to install dependencies? ",
    name: "install",
    default: "npm i",
  },

  {
    type: "input",
    message: "What does the user need to know about using the repo?",
    name: "usage",
  },
  {
    type: "input",
    message: "What does the user need to know about contributing to the repo? ",
    name: "contributing",
  },
  {
    type: "input",
    message: "What command should be used to run tests?",
    name: "test",
    default: "npm run test",
  },

  {
    type: "list",
    message: "What kind of license should your project have?",
    name: "license",
    choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD3", "None"],
  },
];

const writeToFile = (fileName, data) => {
  fs.writeFile(fileName + ".md", data, (error) => (error ? console.error(error) : console.log(`${fileName + ".md"} file is generated!`)));
};

const writeFileAsync = util.promisify(writeToFile);

// Main function
const init = async () => {
  try {
    const userResponses = await inquirer.prompt(questions);
    // console.log(userResponses);
    console.log("Thank you for your responses!");

    const userInfo = await api.getUser(userResponses);
    // console.log(userInfo);

    const markdown = generateMarkdown(userResponses, userInfo);
    await writeFileAsync("generatedReadme", markdown);
  } catch (error) {
    console.log(error);
  }
};

init();
