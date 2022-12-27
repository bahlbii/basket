# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.9.

## Local database

The <i>json-server</i> package was used for local database. 

## 1. Installing packages
First, open terminal in cloned project root, and install all packages.
``` bash
$ npm install
```

## 2. Starting local database
Open terminal in cloned project root
``` bash
$ json-server --watch db.json
```
Now, the local database will be available at ```http://localhost:3000/```

## 3. Launching app
Open terminal in cloned project root
``` bash
$ ng serve 
```
In case of default port inavailability, try ``` ng serve --port [4201] ```

## 4. Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
