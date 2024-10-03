export const FORM_ERRORS = {
  name: '',
  email: '',
  mobile: '',
  location: '',
};

export const FORM_SUCCESS = 'Принято!';

export const FORM_VALIDATION_MESSAGES = {
  name: {
    required: 'Имя обязательно.',
  },
  email: {
    required: 'Email обязателен.',
    email: 'Неверный формат адреса email.'
  },
  mobile: {
    required: 'Номер мобильного телефона обязателен.',
    minlength: 'Номер телефона должен содержать не менее 8 цифр.',
    maxlength: 'Номер телефона должен содержать не более 12 цифр.',
  },
  location: {
    required: 'Город обязателен.',
  }
};

export const FORM_LABELS = {
  name: 'Имя и фамилия:',
  email: 'Email:',
  mobile: 'Телефон:',
  location: 'Город:',
};

export const FORM_PLACEHOLDERS = {
  name: 'Введите имя и фамилию покупателя.',
  email: 'Введите email и фамилию покупателя.',
  mobile: 'Укажите номер мобильного покупателя.',
  location: 'Укажите город покупателя.'
};
