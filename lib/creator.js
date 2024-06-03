import downloadGitRepo from 'download-git-repo';
import util from 'util';
import {loading} from "./util.js";
import {fetchRepoList} from "./request.js";
import chalk from "chalk";
import inquirer from "inquirer";

class Creator {
    constructor(projectName, targetDir) {
        this.name = projectName;
        this.dir = targetDir;
        this.downloadGitRepo = util.promisify(downloadGitRepo);
    }

    fetchRepo = async () => {
        const branches = await loading(fetchRepoList, 'fetching repo list',)
        return branches;
    }

    fetchTag = () => {

    }

    download = async (branch) => {
        const requestUrl = `leeyw19837/vue-admin-template/#${branch}`
        await this.downloadGitRepo(requestUrl, this.dir)
        console.log(chalk.green('done!'))
    }

    create = async () => {
        const branches = await this.fetchRepo();
        const {curBranch} = await inquirer.prompt([
            {
                name: 'curBranch',
                type: 'list',
                message: 'please Select a branch to download:',
                choices: branches.filter((branch) => branch)
                    .map((branch) => ({
                        name: branch.name,
                        value: branch.name,
                    }))
            }
        ]);
        await this.download(curBranch)
    }
}

export default Creator;