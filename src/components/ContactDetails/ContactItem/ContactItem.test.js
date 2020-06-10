import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import ContactItem from './ContactItem';
import { SvgIcon } from '@material-ui/core';

const testData = {
  icon: (<SvgIcon data-testid='icon'>
    <path d="m23.309 14.547c1.738-7.81-5.104-14.905-13.139-13.543-4.362-2.707-10.17.352-10.17 5.542 0 1.207.333 2.337.912 3.311-1.615 7.828 5.283 14.821 13.311 13.366 5.675 3.001 11.946-2.984 9.086-8.676zm-7.638 4.71c-2.108.867-5.577.872-7.676-.227-2.993-1.596-3.525-5.189-.943-5.189 1.946 0 1.33 2.269 3.295 3.194.902.417 2.841.46 3.968-.3 1.113-.745 1.011-1.917.406-2.477-1.603-1.48-6.19-.892-8.287-3.483-.911-1.124-1.083-3.107.037-4.545 1.952-2.512 7.68-2.665 10.143-.768 2.274 1.76 1.66 4.096-.175 4.096-2.207 0-1.047-2.888-4.61-2.888-2.583 0-3.599 1.837-1.78 2.731 2.466 1.225 8.75.816 8.75 5.603-.005 1.992-1.226 3.477-3.128 4.253z"/>
  </SvgIcon>),
  type: 'tel',
  contactsArray: ['0203 980 1479', '0203 478 1296']
};

describe('contact item test', () => {
  it('contact item icon rendered properly', () => {
    const contactItem = render(<BrowserRouter><ContactItem icon={testData.icon} type={testData.type} contactsArray={testData.contactsArray}/></BrowserRouter>);
    const icon = contactItem.getByTestId('icon');
    expect(icon).toBeInTheDocument();
  });

  it('contact item first contact rendered properly', () => {
    const contactItem = render(<BrowserRouter><ContactItem icon={testData.icon} type={testData.type} contactsArray={testData.contactsArray}/></BrowserRouter>);
    const contact = contactItem.getByText(testData.contactsArray[0]);
    expect(contact).toBeInTheDocument();
  });

  it('contact item second contact rendered properly', () => {
    const contactItem = render(<BrowserRouter><ContactItem icon={testData.icon} type={testData.type} contactsArray={testData.contactsArray}/></BrowserRouter>);
    const contact = contactItem.getByText(testData.contactsArray[1]);
    expect(contact).toBeInTheDocument();
  });
});