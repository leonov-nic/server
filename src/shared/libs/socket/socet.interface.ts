export interface Socket {
  connection(): void;
  init(): void;
}

// export interface Config<U> {
//   get<T extends keyof U>(key: T): U[T];
// }
