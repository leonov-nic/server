import { TVoter } from '../types/index.js';

export function createVoter(voterData: string): TVoter {
  const [
    family,
    name,
    surname,
    phone,
    registration,
    address,
    job,
    direction,
    isCurrent,
    author,
  ] = voterData.replace('\n', '').split('\t');

  return {
    family,
    name,
    surname,
    phone: Number.parseInt(phone, 10),
    registration: Number.parseInt(registration, 10),
    address,
    job,
    direction,
    isCurrent: isCurrent === 'true',
    author,
  };
}
