import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { HelloRequest, PERSONS_SERVICE_NAME, PERSON_PACKAGE_NAME, PersonsServiceClient } from './interfaces/person';
import { ReplaySubject } from 'rxjs';


@Injectable()
export class ClientService implements OnModuleInit {
  constructor(@Inject(PERSON_PACKAGE_NAME) private client: ClientGrpc) { }
  private personsService: PersonsServiceClient;

  onModuleInit() {
    this.personsService = this.client.getService<PersonsServiceClient>(PERSONS_SERVICE_NAME);
  }

  create(createClientDto: CreateClientDto) {
    return 'This action adds a new client';
  }

  findAll() {
    const helloRequest$ = new ReplaySubject<HelloRequest>();

    helloRequest$.next({ greeting: 'Hello (1)!' });
    helloRequest$.next({ greeting: 'Hello (2)!' });
    helloRequest$.complete();

    return this.personsService.bidiHello(helloRequest$);
  }

  findOne(id: number) {
    let data = this.personsService.findOne({ id });
    return data;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
