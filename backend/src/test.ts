import { exec } from "child_process";
import path from "path";

const runCommand = (dockerfilePath: string, command: string, imageName: string, containerName: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const buildCommand = `docker build -f ${dockerfilePath} -t ${imageName} .`;
        console.log('Building Docker image...');
        exec(buildCommand, (buildErr, buildStdout, buildStderr) => {
            if (buildErr) {
                return reject(`Build Error: ${buildStderr}`);
            }
            console.log(buildStdout);

            const runCommand = `docker run --rm --name ${containerName} ${imageName} ${command}`;
            console.log(`Running command in Docker: ${command}`);
            exec(runCommand, (runErr, runStdout, runStderr) => {
                if (runErr) {
                    return reject(`Run Error: ${runStderr}`);
                }
                resolve(runStdout);
            });
        });
    });
};

(async () => {
    try {
        const dockerfilePath = path.join(__dirname, '../docker/Dockerfile.nodejs');
        console.log('Resolved Dockerfile Path:', dockerfilePath);
        const command = 'npx create-next-app my-app';
        const imageName = 'next-image';
        const containerName = 'test-node-container';

        const output = await runCommand(dockerfilePath, command, imageName, containerName);
        console.log('Command Output:\n', output);
    } catch (error) {
        console.error('Error:', error);
    }
})();

module.exports = {runCommand}