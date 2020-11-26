import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { config } from 'src/environments/config';
import { MqttService as RawService } from 'ngx-mqtt'

@Injectable({
  providedIn: 'root'
})
export class MqttService {

  constructor(
    private rawService: RawService
  ) { }

  async doThings() {
    this.rawService.connect();
    
    // const client = connect('wss://a3gfnasqfyjfxz-ats.iot.eu-west-1.amazonaws.com/mqtt', {
    //   clientId: 'asdasdalihsrfkjwe',
    //   username: 'test',
    //   password: 'test2',
      
    // })
    // client.on('connect', () => console.log('connected'));
    // client.on('error', (e) => console.log('error', e));
    // client.on('message', (topic, payload, packet) => {
    //   console.log('topic: ' + topic, payload);
    // });
    // const prov = new AWSIoTProvider({
    //   aws_pubsub_region: 'eu-west-1',
    //   aws_pubsub_endpoint: 'wss://a3gfnasqfyjfxz-ats.iot.eu-west-1.amazonaws.com/mqtt',
      
    // });
    // prov.configure({
    // });
    // const client = await prov.newClient({
    //   clientId: 'asdadas',
    //   url: 'wss://a3gfnasqfyjfxz-ats.iot.eu-west-1.amazonaws.com/mqtt'
    // });
    // const client_bootstrap = new io.ClientBootstrap();

    // let config_builder = iot.AwsIotMqttConnectionConfigBuilder.new_with_websockets({
    //     region: 'eu-west-1',
    //     credentials_provider: auth.AwsCredentialsProvider.newDefault(client_bootstrap)
    // });
    
    
    // config_builder.with_clean_session(false);
    // config_builder.with_client_id('test-client-id' || "test-" + Math.floor(Math.random() * 100000000));
    // config_builder.with_endpoint('a3gfnasqfyjfxz-ats.iot.eu-west-1.amazonaws.com');

    // // force node to wait 60 seconds before killing itself, promises do not keep node alive
    // const timer = setTimeout(() => { }, 60 * 1000);

    // const config = config_builder.build();
    // const client = new mqtt.MqttClient(client_bootstrap);
    // const connection = client.new_connection(config);

    // await connection.connect()
    // await execute_session(connection, argv)

    // Allow node to die if the promise above resolved
  }
}
