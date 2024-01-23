
import { injectable } from 'inversify';
import { Logger } from '../logger/index.js';
// import cors from 'cors';
// import { Component } from '../../types/component.enum.js';
import { Socket } from './socet.interface.js';
// import chalk from 'chalk';

import * as http from 'node:http';
import * as socketIo from 'socket.io';
import session from 'express-session';

@injectable()
export class SocketConection implements Socket {
  private io: socketIo.Server;
  private logger: Logger;
  constructor(
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>,
    logger: Logger,
  ) {
    this.logger = logger;

    this.io = new socketIo.Server(server, {
      cors: {
        origin: 'http://89.104.65.65:3000',
        allowedHeaders: ['my-custom-header'],
        credentials: true,
      }
    });

    this.init = this.init.bind(this);
    this.init();
    this.logger.info('Soooooocket created');
  }

  init(): void {
    const sessionMiddleware = session({
      secret: 'DB_PASSWORD',
      resave: true,
      saveUninitialized: true,
      cookie: {
        secure: false,
        sameSite: false,
        httpOnly: true,
      }
    });
    // this.io.origins('*:*');

    // this.io.engine.use(cors());
    this.io.engine.use(sessionMiddleware);
    this.logger.info('socket initialized');
  }

  public connection(): void {
    this.io.sockets.on('connection', (socket) => {
      console.log(socket.id, 'connected');
      socket.on('eventChangeDate', (data) => {
        socket.broadcast.emit('eventVoterClient', data);
      });
      socket.on('formChange', (data) => {
        this.logger.info(`form ${data} change`);
        socket.broadcast.emit('eventClient', data);
      });
      // socket.on('disconnect', () => {
      //   this.logger.info('user disconnected');
      // });
    });

    this.io.on('error', (err) => {
      console.error('Socket.IO error:', err);
    });
  }
}
