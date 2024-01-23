export const CreateVoterValidationMessage = {
  family: {
    invalidFormat: 'Длина фамилии минимум 2 буквы',
    minLength: 'Длина фамилии минимум 2 буквы',
    maxLength: 'Длина фамилии максимум 30 букв',
  },
  name: {
    invalidFormat: 'Name must be a valid string',
    minLength: 'Длина имени минимум 2 буквы',
    maxLength: 'Длина имени максимум 30 букв',
  },
  surname: {
    invalidFormat: 'Surname must be a valid string',
    minLength: 'Длина отчества минимум 2 буквы',
    maxLength: 'Длина отчества максимум 30 букв',
  },
  address: {
    invalidFormat: 'Address must be a valid string',
    minLength: 'Minimum address length must be 3',
    maxLength: 'Maximum address length must be 100',
  },
  job: {
    invalidFormat: 'Job must be a valid string',
    minLength: 'Длина фамилии минимум 3 буквы',
    maxLength: 'Maximum 100',
  },
  phone: {
    invalidFormat: 'В телефоне не должны быть другие сиволы кроме цифр',
    minLength: 'Длина телефона 11 цифр',
    maxLength: 'Длина телефона 11 цифр',
  },
  registration: {
    invalidFormat: 'В номере регистрации не должны быть другие сиволы кроме цифр',
    minLength: 'Минимальная длина регистрации 9 цифр',
    maxLength: 'Максимальная длина регистрации 9 цифр',
  },
  direction: {
    invalidFormat: 'Direction must be a valid string ',
  },
  isCurrent: {
    invalidFormat: 'isCurrent must be a boolean',
  },
  author: {
    invalidId: 'Author field must be a valid id',
  },
} as const;
