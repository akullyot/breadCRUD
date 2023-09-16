//This requires React and the basic, skeleton HTML generator for every page
const React = require('react');
//Identification: the function skeletonHTML from skeletonHTMLDefault.jsx that has been exported to node.modules
//Purpose: Generates the basic backbone of every HTML page 
//Note: React components must be PascalCase
const Default = require('./layouts/Default.jsx');

function generateError404Children()
{
    return(
        <Default>
        <main>
            <h1> Error 404: Page Not Found</h1>
            <img src = 'assets/error404.jpg' id = "errorImage"></img>
            <p> Oops, sorry, this page does not seem to exist! Please Press back or use the home bar to choose a different path</p>

        </main>
        </Default>
    );
}

//export 
module.exports = generateError404Children;