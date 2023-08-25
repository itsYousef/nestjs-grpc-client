import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PERSON_PACKAGE_NAME } from './interfaces/person';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [
    ClientsModule.register([
      {
        name: PERSON_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: PERSON_PACKAGE_NAME,
          protoPath: join(__dirname, 'person.proto'),
          url: "localhost:5001"
        },
      },
    ]),
  ]
})
export class ClientModule {}
