export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  Io: Symbol.for('Io'),

  DatabaseClient: Symbol.for('DatabaseClient'),
  UserService: Symbol.for('UserService'),
  CommentService: Symbol.for('CommentService'),
  UserModel: Symbol.for('UserModel'),

  FormModel: Symbol.for('FormModel'),
  FormService: Symbol.for('FormService'),
  FormController: Symbol.for('FormController'),

  VoterService: Symbol.for('VoterService'),
  VoterModel: Symbol.for('VoterModel'),
  VoterController: Symbol.for('VoterController'),

  CommentModel: Symbol.for('CommentModel'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  CommentController: Symbol.for('CommentController'),

  UserController: Symbol.for('UserController'),
  AuthService: Symbol.for('AuthService'),
  AuthExceptionFilter: Symbol.for('AuthExceptionFilter'),
  HttpExceptionFilter: Symbol.for('HttpExceptionFilter'),
  ValidationExceptionFilter: Symbol.for('ValidationExceptionFilter'),
  PathTransformer: Symbol.for('PathTransformer'),
} as const;
