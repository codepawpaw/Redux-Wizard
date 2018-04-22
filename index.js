#! /usr/bin/env node
const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const inquirer    = require('inquirer');
const generator   = require('./generator.js');
const fs          = require('fs');

clear();
console.log(
  chalk.yellow(
    figlet.textSync('Redux Wizard', { horizontalLayout: 'full' })
  )
);

var entity = "";

const questions = [
    {
      name: 'entity',
      type: 'input',
      message: 'Enter your Entity name:',
      validate: function( value ) {
        if (value.length) {
          value = value[0].toUpperCase() + value.substring(1, value.length).toLowerCase();
          entity = value;
          return true;
        } else {
          return 'Please enter your Entity name';
        }
      }
    },
    {
      name: 'destination',
      type: 'input',
      message: 'Enter your destination path (./example_destination_path/):',
      validate: function( value ) {
        if (value.length) {
          if(value[value.length-1] != "/") {
            value += "/"
          }
          generator(entity, value)
          return true;
        } else {
          return "Your path doesn't exist";
        }
      }
    },
  ];
  return inquirer.prompt(questions);