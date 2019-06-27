import {Response} from "express";

export interface ILoopback3Application {
  models: ILoopback3Models;

  listen(callback: Function): ILoopback3Server;
}

export interface ILoopback3Server {
  close(callback: Function): ILoopback3Server;
}

export interface ILoopback3Models {
  (name: string): ILoopback3Model;
}

export interface ILoopback3Model {

  getDataSource(): ILoopback3DataSource;

  remoteMethod(name: string, definition: any): void;

  emit(event: string, data?: any): void;

  on(event: string, handler: Function): void;

  findOne(predicate: ILoopback3FindOnePredicate): Promise<any>;
}

export interface ILoopback3DataSource {
  settings: ILoopback3DataSourceSettings;
}

export interface ILoopback3DataSourceSettings {
  transports?: Array<ILoopback3DataSourceTransport>;
}

export interface ILoopback3DataSourceTransport {
}

export interface ILoopback3FindOnePredicate {
  where: any;
}

export interface ILoopback3RemoteMethodRequest extends Request {
}

export interface ILoopback3RemoteMethodResponse extends Response {
}

export interface ILoopback3AccessToken {
}
