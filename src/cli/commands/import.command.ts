// import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
// import { Command } from './command.interface.js';
// import { createVoter, getErrorMessage, StatusMessage } from '../../shared/helpers/index.js';
// import chalk from 'chalk';
// import { Logger, ConsoleLogger } from '../../shared/libs/logger/index.js';
// import { DefaultVoterService, VoterService, VoterModel} from '../../shared/modules/voter/index.js';
// import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
// import { getMongoURI } from '../../shared/helpers/index.js';
// import { TVoter } from '../../shared/types/index.js';

// export const DEFAULT_DB_PORT = '27017';
// export const DEFAULT_USER_PASSWORD = '123456';

// export class ImportCommand implements Command {
//   private logger: Logger;
//   private databaseClient: DatabaseClient;
//   private voterService: VoterService;

//   constructor () {
//     this.onImportedLine = this.onImportedLine.bind(this);
//     this.onCompleteImport = this.onCompleteImport.bind(this);

//     this.logger = new ConsoleLogger();
//     this.databaseClient = new MongoDatabaseClient(this.logger);
//     this.voterService = new DefaultVoterService(this.logger, VoterModel);
//   }

//   public getName(): string {
//     return '--import';
//   }

//   private async saveVoter(voter: TVoter) {
//     await this.voterService.create({
//       family: voter.family,
//       name: voter.name,
//       surname: voter.surname,
//       phone: voter.phone,
//       registration: voter.registration,
//       address: voter.address,
//       job: voter.job,
//       direction: voter.direction,
//       isCurrent: voter.isCurrent,
//       author: voter.author,
//     });
//   }

//   private async onImportedLine(line: string, resolve: () => void) {
//     const offer = createVoter(line);
//     await this.saveVoter(offer);
//     resolve();
//   }

//   private onCompleteImport(count: number) {
//     console.info(chalk.blueBright(`${count} rows imported.`));
//     this.databaseClient.disconnect();
//   }

//   public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
//     const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
//     await this.databaseClient.connect(uri);

//     const fileReader = new TSVFileReader(filename.trim());

//     fileReader.on('line', this.onImportedLine);
//     fileReader.on('end', this.onCompleteImport);

//     try {
//       await fileReader.read();
//     } catch (err) {
//       console.error(chalk.red(`${StatusMessage.NOT_IMPORT_FILE} ${filename}`));
//       console.error(getErrorMessage(err));
//     }
//   }
// }
