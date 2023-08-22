import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { PersonsService } from './interfaces/person-service.interface';


@Injectable()
export class ClientService implements OnModuleInit {
  constructor(@Inject('PERSON_PACKAGE') private client: ClientGrpc) { }
  private personsService: PersonsService;

  onModuleInit() {
    this.personsService = this.client.getService<PersonsService>('PersonsService');
  }

  create(createClientDto: CreateClientDto) {
    return 'This action adds a new client';
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    let data = this.personsService.findOne({ id });
    data.subscribe((da) => {
      console.debug(`\n🚀 => da:`, da);
      
    });
    return data;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
