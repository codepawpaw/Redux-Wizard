const ActionTemplate       = './template/action_template.js';
const ReducerTemplate      = './template/reducer_template.js';
const IndexReducerTemplate = './template/index_reducer_template.js';
const StoreTemplate        = './template/store_template.js';
//var _GENERATED_PATH      = './generated/';

const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const Spinner     = require('cli-spinner').Spinner;
const Utils       = require('./utils.js');

module.exports = generator = (entityName, _GENERATED_PATH) => {
    var actionFilter = [
        { regex: /Action/g, value: entityName+"Action" },
        { regex: /TYPE_REPLACE/g, value: entityName }
    ]

    var reducerFilter = [
        { regex: /Reducer/g, value: entityName+"Reducer" },
        { regex: /action_name/g, value: entityName.toLowerCase() }
    ]

    var indexReducerFilter = [
        { regex: "// REDUCERS", type: "Import" },
        { regex: /REPLACE/g, type: "json" }
    ]

    var spinner = new Spinner('processing.. %s');
    spinner.setSpinnerString('|/-\\');
    spinner.start();

    Utils.generateTemplate(ActionTemplate, _GENERATED_PATH, 
        entityName.toLowerCase()+"_action.js", 
        actionFilter, "ACTION",() => {
    });

    Utils.generateTemplate(ReducerTemplate, _GENERATED_PATH, 
        entityName.toLowerCase()+"_reducer.js", 
        reducerFilter, "REDUCER", () => {

            Utils.generateTemplate(IndexReducerTemplate, _GENERATED_PATH,
                "reducer.js", indexReducerFilter, 
                "MAIN_REDUCER", () => {
            });
    });

    Utils.generateTemplate( StoreTemplate, _GENERATED_PATH,
        "store.js", undefined,
        "STORE", () => {
            spinner.stop();
            console.log(chalk.green('Congratulation file success generated!!!'));
        }
    )

}