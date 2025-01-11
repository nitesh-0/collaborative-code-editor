// backend/utils/dockerUtils.js
// const Docker = require('dockerode');
import Docker from "dockerode"
const docker = new Docker();

const runContainer = async (command: string, dockerfilePath: any) => {
  try {
    const container = await docker.createContainer({
      Image: dockerfilePath, // Use the correct Docker image path or Dockerfile
      Cmd: command.split(' '), // Split the command into an array of args
      Tty: true,
      OpenStdin: true,
      StdinOnce: false,
    });

    await container.start();
    const stream = await container.attach({stream: true, stdout: true, stderr: true});

    // Pipe the output to the terminal
    stream.pipe(process.stdout);

    // Wait for the container to finish execution
    const status = await container.wait();
    return status;
  } catch (err) {
    console.error('Error running container', err);
    return { error: 'Failed to execute command in Docker container.' };
  }
};

export default runContainer
