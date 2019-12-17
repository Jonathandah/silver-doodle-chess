# Silver Doodle Chess

## Style Guide

Our code structure is formated with ESLint and will be set up as the one in the link:
https://github.com/airbnb/javascript/tree/master/react. Class names is named and structured with (BEM)[http://getbem.com/naming/].

## Architecture

Our app is made with (React)[https://reactjs.org/] and is styled through (Sass)[https://sass-lang.com/] for easy structuring. The project will contain:

1. GLOBAL - A global folder which contains functions, components and endpoints which is needed globaly in the application.

2. VIEWS - A folder that is structured by child folders which represents all the views,ex. "Home" folder contains a Home.JSX file that will be built as the Home view. The same folder will also contain styling for that component and other necessary components to complete that view.

3. TESTS - All the tests for the the front-end will be put in the "test" folder, test made for the back-end will be put in a seperate test folder in the backend folder. The test for the front-end will be built with (Enzyme)[https://airbnb.io/enzyme/docs/api/] and (Jest)[https://jestjs.io/] meanwhile the tests for the back-end will be built with (Chai)[https://www.chaijs.com/] and (Mocha)[https://mochajs.org/].

## Branching

The project will follow GitFlow amd contain two branches that will exist through out the entire project, "Master" and "Develop". No direct pushes will be made to either Master or Develop. To merge code with these two branches a pull request is necessary. After 2 approved reviews `(one of them has to be by Niklas Silfverström)` the pull request can be merged with Master or Develop.

Before merging Develop in to Master a clean up has to be done in a temporarily branch called "Release". When the clean up is made, create a pull request for Master AND Develop.

Hotfixes in the Master branch will be made in a temporarily branch called "Hotfix", create pull request for merging the new code with Master.

Feature branches will be named: `(Developer name)-(feature/issue)` ex. "Jonathan-Form-component-for-adding-games"

## Work Procedures

Scrum and Kanban will be used through out the project. Three "Daily stand-ups" will occur per week, Monday, Wednesday and Friday at 10:00:00 through our Slack channel.

We will have a Sprint meeting every Wednesday through either Discord or face to face if possible. All merges will be made on Tuesdays to have a functional app on the Sprint meeting. This meeting will contain a demo on the current porgress, planning for the next sprint and will be documented and published on Github.

The backlog and issues can be found on Github through this link: https://github.com/Jonathandah/silver-doodle-chess/projects/1. WIP-limit will be set to 8 in the "In progress" column, do not exceed this limit!
