# Metric-Imperial Converter

This is the boilerplate for the Metric-Imperial Converter project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/metric-imperial-converter


## The sites I referred
- For debugging, I referred [this site](https://blog.logrocket.com/how-to-debug-node-js-apps-in-visual-studio-code/).  
I tried to debug in node.js (my case using Express too) for the first time to do.  
Also, I asked about why I went through some functions in node_modules even though I designated them as skipped folders. I found it out by chatGPT, it was because like below. at the time, I set a breakpoint on the line having "res.send()"

    >The skipFiles option in your launch.json is designed to prevent the debugger from stopping inside these files, but it does not prevent the files from appearing in the call stack. The call stack is just a representation of the sequence of function calls that led to the current point in the program's execution. It's common and expected for Express internal functions to appear in the call stack when debugging an Express application.  


- Some number of MDN sites. such as [exec method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec).

- When I used chai, of course, I went to [munual site](https://www.chaijs.com/api/assert/#method_equal).

- Super useful regex site.https://regex101.com/

## Points I struggled

- Regex for checking and dividing numbers and a unit.
- Understanding a little of jQuery code. I thought I had to do something on the express side, but if on jQuery side there is a written method for fetching data, it was fine just to send data using the res parameter.

