function determineBadge(licenseChoices) {
  let badge = "";
  switch (licenseChoices) {
    case "MIT":
      badge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
      break;
    case "APACHE 2.0":
      badge = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
      break;
    case "GPL 3.0":
      badge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
      break;
    case "BSD3":
      badge = "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
      break;
    default:
      badge = "";
  }
  return badge;
}


const generateMarkdown = (userResponses, userInfo) => {
  const badge = determineBadge(userResponses.license);
  const badge2 = `![Badge for GitHub repo top language](https://img.shields.io/github/languages/top/${userResponses.username}/${userResponses.repo}?style=flat&logo=appveyor)`;
  return `
${badge} 
${badge2}
# Project-Title
${userResponses.title}


## Description 
${userResponses.description}

## Table of Contents
       
* [Installation](#installation)
            
* [Usage](#usage)
            
* [Contributing](#contributing)
            
* [Tests](#tests)

* [License](#license)
            
* [Questions](#questions)

## <a name="installation"></a> :computer: Installation
To install necessary dependencies, run the following command:

\`\`\`
${userResponses.install}
\`\`\`

## Usage 
${userResponses.usage}

## Contributing
${userResponses.contributing}

## Tests
To run test, run the following command:<br>
\`\`\`
${userResponses.tests}
\`\`\`

## License
This project is licensed under the ${userResponses.license} license.

## Questions
            

 ![Developer Profile Picture](${userInfo.avatar_url})

 GitHub: [@${userInfo.login}](${userInfo.url})

If you want to see more of my work please click here ${userInfo.repo}.

If you have any questions about the repo ${userResponses.email}
`;
};

module.exports = generateMarkdown;
