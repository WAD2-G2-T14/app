# Shopping-Club

Welcome to Team 14's repository for our Shopping Club web application. Before contributing, have a look at the guides to familiarise yourself with the contribution guidelines and git workflow. Have fun coding!

## Quick Start
1. Clone the repository and place it in your htdocs / www folder
2. Start MAMP / WAMP
3. Start contributing

## Git Workflow
We have 2 general branches, namely **main** and **development**

Branch | Description
------ | -----------
Main | This branch is our master branch which contains stable and working code. PR to this branch!
Development | This branch is for testing code and may contain unstable code with bugs! Features and pages in development will be tested here. Merge feature branches in here!

### Workflow
1. Create a new feature branch from `main`
2. Commit changes and test locally on your feature branch
3. Merge changes to `development`
4. Test locally before pushing to `orgin/development`
5. If all tests are ok, pull from `main`
6. Create a new Pull Request to `main`

### Branch Naming
Our branches are named according to this convention: **trello task id**-feature-description-here
<br>
e.g. *101-create-login-page*

## Style Guide
Functions should be named using PascalCase, while variables use camelCase.

### Javascript Functions
Usage of both normal and arrow functions are ok!
```javascript
function FunctionName() {
   // Some code here
}
```
or
```javascript
const FunctionName = () => {
    // Some code here
}
```

#### Handler
These functions are event handlers and are triggered when the user performs an action. They shoud be named *handle*EventHere.

```javascript
const HandlePurchaseButtonClick = () => {
    // Some code here
}
```

#### Renderer
These functions will edit and change the HTML document, by rendering new content or displaying components. They should be named *Render*Something.

```javascript
const RenderCards = () => {
    // Some code here
}
```

*... following parts are still under construction*
