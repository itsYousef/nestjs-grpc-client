import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [
    ClientsModule.register([
      {
        name: 'PERSON_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'person',
          protoPath: join(__dirname, 'person.proto'),
          url: "localhost:5001"
        },
      },
    ]),
  ]
})
export class ClientModule {}
