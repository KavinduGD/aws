require("dotenv").config();

const os = require("os");

const {
  CloudWatchLogsClient,
  DescribeLogStreamsCommand,
  CreateLogStreamCommand,
  PutLogEventsCommand,
} = require("@aws-sdk/client-cloudwatch-logs");

const client = new CloudWatchLogsClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const LOG_STREAM_NAME = os.hostname();

async function ensureLogStream() {
  const { logStreams } = await client.send(
    new DescribeLogStreamsCommand({
      logGroupName: process.env.LOG_GROUP_NAME,
      logStreamNamePrefix: LOG_STREAM_NAME,
    }),
  );

  const stream = logStreams.find((s) => s.logStreamName === LOG_STREAM_NAME);

  if (!stream) {
    await client.send(
      new CreateLogStreamCommand({
        logGroupName: process.env.LOG_GROUP_NAME,
        logStreamName: LOG_STREAM_NAME,
      }),
    );

    return null;
  }

  return stream.uploadSequenceToken;
}

async function sendLog(message) {
  try {
    const sequenceToken = await ensureLogStream();

    const params = {
      logGroupName: process.env.LOG_GROUP_NAME,
      logStreamName: LOG_STREAM_NAME,
      logEvents: [
        {
          timestamp: Date.now(),
          message,
        },
      ],
    };

    if (sequenceToken) {
      params.sequenceToken = sequenceToken;
    }

    await client.send(new PutLogEventsCommand(params));

    console.log("CloudWatch log sent");
  } catch (err) {
    console.error(err);
  }
}

module.exports = sendLog;
