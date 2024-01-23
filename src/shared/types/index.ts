export * from './component.enum.js';
export type RequestParams = Record<string, unknown>;
export type RequestBody = Record<string, unknown>;

export enum UserType {
  PRO = 'pro',
  SIMPLE = 'regular',
}

export enum SortType {
  Down = -1,
  Up = 1,
}

export type TVoter = {
  id?: string;
  family: string;
  name: string;
  surname: string;
  phone: number;
  registration: number;
  address: string;
  job: string;
  direction: string;
  isCurrent: boolean;
  author: string;
}

export type MockServerData = {
  family: string[];
  name: string[];
  surname: string[];
  address: string[];
  job: string[];
  direction: string;
  isCurrent: boolean;
  author: string[];
}


export type User = {
  direction: string;
  email: string;
  avatar?: string;
  type: UserType;
  password: string;
}

export type Form = {
  isActive: boolean;
}

