import amqp from 'amqplib/callback_api'; 

function createChannel(): Promise<amqp.Channel> {
  return new Promise((resolve, reject) => {
    amqp.connect('amqp://172.17.0.2', (err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      connection.createChannel((err, channel) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(channel);
      });
    });
  });
}

export default createChannel

