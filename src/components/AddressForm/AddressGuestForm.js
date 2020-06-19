import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  Typography,
  TextField,
  Button,
  CardActions,
  ThemeProvider,
  FormControlLabel,
  FormHelperText,
  Checkbox, Grid
} from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from '../../styles/formStyle/formStyle';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import theme from '../../styles/formStyle/formStyleTheme';
import ApartmentIcon from '@material-ui/icons/Apartment';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import IconLabel from '../IconLabel/IconLabel';
import PinDropIcon from '@material-ui/icons/PinDrop';
import AutocompleteComponent from '../Autocomplete/Autocomplete';
import {validateObject} from './helper';

const AddressGuestForm = (props) => {
  const {saveGuestDataHandler, guestData} = props;
  const [address, setAddress] = useState('');

  const classes = useStyles();

  const handleCancel = () => {
    saveGuestDataHandler(null);
  };

  const submitAddressData = (values, {resetForm}) => {
    const deliveryAddress = {
      address: address,
      house: values.house,
      apartment: values.apartment,
      postalCode: values.postalCode
    };
    resetForm();
    saveGuestDataHandler(deliveryAddress);
  };

  const initFormValues = {
    autocomplete: '',
    house: guestData ? guestData.house : '',
    apartment: guestData ? guestData.apartment : '',
    postalCode: guestData ? guestData.postalCode : '',
    confirmation: guestData ? guestData.confirmation : false
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography className={classes.header} variant='h4' gutterBottom>
          your delivery address
        </Typography>
        <Formik
          initialValues={initFormValues}
          validationSchema={validateObject}
          onSubmit={submitAddressData}>
          {({
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched
          }) => (
            <form>
              <ThemeProvider theme={theme}>
                <AutocompleteComponent
                  autoComplete='on'
                  className={classes.input}
                  setAddress={setAddress}
                  name='autocomplete'
                  onBlur={handleBlur}
                  touched={touched}
                  value={values.autocomplete}
                  onChange={handleChange}
                  error={errors}
                  fullWidth
                />
                <TextField
                  autoComplete='off'
                  name='house'
                  label={<IconLabel label='Enter building number'
                    Component={ApartmentIcon}/>}
                  className={classes.input}
                  value={values.house}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.house ? errors.house : ''}
                  error={touched.house && Boolean(errors.house)}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
                <TextField
                  name='apartment'
                  label={<IconLabel label='Enter apartment number'
                    Component={MyLocationIcon}/>}
                  className={classes.input}
                  onBlur={handleBlur}
                  value={values.apartment}
                  onChange={handleChange}
                  helperText={touched.apartment ? errors.apartment : ''}
                  error={touched.apartment && Boolean(errors.apartment)}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
                <TextField
                  name='postalCode'
                  autoComplete='on'
                  label={<IconLabel label='Enter postal code'
                    Component={PinDropIcon}/>}
                  className={classes.input}
                  value={values.postalCode}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.postalCode ? errors.postalCode : ''}
                  error={touched.postalCode && Boolean(errors.postalCode)}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox
                      className='checkbox'
                      checked={values.confirmation}
                      onChange={handleChange}
                      name='confirmation'
                      color='default'/>}
                    label='I have read and agree to the Privacy Policy'
                  />
                  {touched.confirmation && errors.confirmation &&
                  <FormHelperText
                    error={touched.confirmation && !!errors.confirmation}>
                    {errors.confirmation}
                  </FormHelperText>}
                </FormGroup>
              </ThemeProvider>
              <CardActions>
                <Button
                  type='button'
                  className={classes.button}
                  onClick={handleCancel}
                  size='large'
                  variant='outlined'>cancel
                </Button>
                <Button
                  type='submit'
                  className={classes.button}
                  onClick={handleSubmit}
                  size='large'
                  disabled={isSubmitting}
                  variant='outlined'>submit
                </Button>
              </CardActions>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

AddressGuestForm.propTypes = {
  saveGuestDataHandler: PropTypes.func
};

export default React.memo(AddressGuestForm);