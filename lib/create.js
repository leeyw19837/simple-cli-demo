import path from 'path';
import Creator from "./creator.js";
import fs from 'fs-extra';
import inquirer from "inquirer";

const create = async (projectName, options, cmd) => {
    const cwd = process.cwd();
    const targetDir = path.join(cwd, projectName);

    if (fs.exists(targetDir)) {
        if (options.force){
            await fs.remove(targetDir);
        } else {
            const {action} = await inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: `${projectName} already existed, are you sure to overwrite this directory?`,
                    choices: [
                        {name:'overwrite',value: true},
                        {name:'cancel',value: false},
                    ]
                }
            ]);
            if (!action) {
                return;
            } else {
                console.log('\r\noverwriting...')
                await fs.remove(targetDir);
                console.log('overwrite done')
            }
        }
    }

    const creator = new Creator(projectName, targetDir);
    await creator.create()
}

export default create;