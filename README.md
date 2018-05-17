# About
Test Server is an express Web server for:
* Running automated cases
* Managing test runners
* Interfacing with Practitest API

# Requires  
* Node 10.x

# Setup 
* Recommended OS OSX
* Setup `PRACTITEST_KEY` environment variable 
    * On OSX Terminal:
        * Run `nano .bash_profile` 
        * Add: 
            > `#Practitest`
            >
            > `export PRACTITEST_KEY=(Get Key From Paul or Walter)`
        * Save `Control + X`
        * Restart Terminal
* Install Visual Studio Code (Recommended)
    * Install ESLint plugin 
    * Install GitLens plugin
* Install Git
* Check out from Bitbucket using Git 
    * URL for check out can be fond in Bitbucket under `Clone` 
* Run `npm install` to install dependencies
* Run `npm start` or run config `start` in Visual Studio Code


# Commands 
* `npm start` Start Express web server.  
* `npm lint` Uses eslint to check for coding errors and warnings. 

# Best Practices
* Before pushing to Bitbucket run `npm lint` to check there are no code errors and warnings. 
* Do not commit to master
* Save all dependencies to packages.json when doing an NPM install
* Before doing an NPM install check if dependency is a dev dependency, if so install it as a dev dependency. 

# Project Structure  

* **src** (*React web application*)
    * **controllers** (*Business logic*)
    * **practitestApi** (*Request to Practitest Api*)
    * **routes** (*Server API routing*)
    * **utils** (*Reusable helper classes*)


