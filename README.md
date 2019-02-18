# Bidding System
## Tech stack

I chose Angular version 6 as a client side application for this assignment. 
Backend code is done in Node, Express, TypeScript etc.

## Dependencies and installations

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

You must have angular cli globally installed on your machine before installing other dependencies with npm. To install, open any commandline terminal and type:
`npm install -g @angular/cli`
If you run into permission issues then Mac users may need to `sudo npm install -g @angular/cli` . 

### Project has frontend and backend dependencies
Project has 2 package.json files, the one on the root of app is frontend list of dependencies. Second package.json file is inside server folder. Server folder is inside project folder. You have to manually install both dependencies before starting the project. 

Once [Angular CLI](https://github.com/angular/angular-cli) is installed, Change directory to project folder to install frontend dependencies using npm. 
`cd PROJECT_FOLDER`, here PROJECT_FOLDER is the directory where you cloned this repo or extracted zip contents. 

Once in project directory type: 
`npm install`. Once installation is successfull, change directory into server folder inside project folder.
`cd server`

Then type again `npm install`. This should install all backend dependencies which server needs
## Development server

Once all dependencies (frontend and backend) are installed properly, make sure you are in the project folder and NOT in the server folder. If you are in server folder do `cd ..` so you can be in the main project directory. Then run `npm run serve` for dev server.  This script will automatically start backend server at `http://localhost:3001` and a frontend server at `http://localhost:4200/`. Simply open `http://localhost:4200/` in browser of your choice. App will automatically reload if you change any of the front-end source files. 

Happy testing the app.


## Running unit tests

Currently there are no unit tests available. 

## Further help

Let me know if you face any issues
