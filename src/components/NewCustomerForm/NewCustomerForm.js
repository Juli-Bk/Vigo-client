import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Typography,
  RadioGroup,
  Button,
  CardActions,
  FormControl,
  FormHelperText,
  CardContent,
  FormControlLabel,
  Radio,
  Card, ThemeProvider
} from '@material-ui/core';
import useStyles from './NewCustomerFormStyle';
import theme from './CheckoutLabels/CheckboxLabelsTheme';
import PropTypes from 'prop-types';

const NewCustomerForm = (props) => {
  const {submitNewCustomerHandler} = props;

  const submitNewCustomerData = (values, {resetForm, setSubmitting}) => {
    setSubmitting(true);

    submitNewCustomerHandler(values, () => {
      setSubmitting(false);
      resetForm();
    });
  };

  const initFormValues = {
    radioGroup: ''
  };
  const validateObject = Yup.object({
    radioGroup: Yup.string().required('Please, choose one of these options')
  });

  const styles = useStyles();

  return (
    <Card>
      <CardContent>
        <Typography className={styles.header} variant='h4' gutterBottom>new customer</Typography>
        <Formik
          initialValues={initFormValues}
          validationSchema={validateObject}
          onSubmit={submitNewCustomerData}>
          {({ handleChange, values, handleSubmit, isSubmitting, errors}) => (
            <Form autoComplete='off' id='newCustomerForm'>
              <FormControl>
                <Typography variant='subtitle2' className={styles.text}>Register with us for future convenience:</Typography>
                <ThemeProvider theme={theme}>
                  <RadioGroup id='radioGroup' aria-label='newCustomer' value={values.radioGroup} name='formNew' onChange={handleChange}>
                    <FormControlLabel value='asGuest' name='radioGroup' id='radioOption1' color='default' control={<Radio />} label='Checkout as a guest' />
                    <FormControlLabel value='iWillRegister' name='radioGroup' id='radioOption2' color='default' control={<Radio />} label='Register' />
                  </RadioGroup>
                  <FormHelperText>{errors.radioGroup}</FormHelperText>
                </ThemeProvider>
                <Typography className={styles.text} variant='subtitle1' gutterBottom>By creating an account with our store,
                you will be able to move through the checkout process faster, store multiple shipping addresses, view
                and track your orders in your account and more.</Typography>
                <CardActions>
                  <Button
                    type='submit'
                    className={styles.button}
                    size='large'
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    variant='outlined'>Continue
                  </Button>
                </CardActions>
              </FormControl>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};
NewCustomerForm.propTypes = {
  submitNewCustomerHandler: PropTypes.func.isRequired
};

export default React.memo(NewCustomerForm);