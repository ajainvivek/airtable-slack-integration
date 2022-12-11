const sampleCommandCallback = async ({ ack, respond }) => {
  try {
    console.log('before hitting this callback');
    await ack();
    console.log('after hitting this callback');
    await respond('Responding to the sample command!');
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sampleCommandCallback };
