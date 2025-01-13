// backend/controllers/commandController.js
import runContainer from "../utility/dockerUtils"


const executeCommand = async (req: any, res: any) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ error: 'Command is required' });
  }

  let dockerfilePath = 'react-image';
  // if (language === 'node') {
  //   dockerfilePath = '/backend/docker/Dockerfile.nodejs';
  // } else if (language === 'python') {
  //   dockerfilePath = '/backend/docker/Dockerfile.python';
  // } else if (language === 'java') {
  //   dockerfilePath = '/backend/docker/Dockerfile.java';
  // } else {
  //   return res.status(400).send({ error: 'Unsupported language' });
  // }

  try {
    const result = await runContainer(command, dockerfilePath);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: 'Error running the command.' });
  }
};

module.exports = { executeCommand };
