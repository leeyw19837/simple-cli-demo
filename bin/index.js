#! /usr/bin/env node
console.log('test cli');

import {Command} from 'commander';
import chalk from "chalk";
import config from '../package.json' assert {type: 'json'};

const program = new Command();

program.command('create <app-name>')
    .description('Create a new app')
    .option('-f, --force', 'overwrite target directory if it exists')
    .action((name, options, cmd) => {
        // console.log('执行 create 命令')
        import('../lib/create.js').then(({default: create}) => {
            create(name,options,cmd)
        })
    })

program.on('--help', () => {
    console.log()
    console.log(`Run ${chalk.cyan('rippi <command> --help')} to show detail of this command`)
    console.log()
})

program
    .version(`rippi-cli@${config.version}`)
    .usage('<command> [option]')

program.parse(process.argv)