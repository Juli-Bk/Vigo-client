import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Typography,
  TextField,
  Button,
  CardActions,
  Grid,
  ThemeProvider, FormHelperText, Checkbox, FormControlLabel
} from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from '../../styles/formStyle/formStyle';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import theme from '../../styles/formStyle/formStyleTheme';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import IconLabel from '../IconLabel/IconLabel';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import AjaxUtils from '../../ajax';
import { setUser } from '../../redux/actions/actions';
import {validateObject} from './helper';

const PersonalDetailsForm = (props) => {
  const {user, setUser, saveUserAddressesHandler} = props;
  const {firstName, lastName, email, phoneNumber} = user;

  const handleCancel = () => {
    saveUserAddressesHandler(null);
  };

  const submitPersonalDetailsData = (values, {resetForm, setSubmitting}) => {
    setSubmitting(true);

    if (user._id) {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        email: values.email
      };

      AjaxUtils.Users.updateUserInfoById(user._id, data)
        .then(result => {
          setSubmitting(false);
          if (result.status !== 400) {
            resetForm();
            saveUserAddressesHandler(result);
          } else {
            saveUserAddressesHandler(result);
            setUser(result);
          }
        })
        .catch(error => {
          console.log(error);
          setSubmitting(false);
          saveUserAddressesHandler(values, error);
        });
    }
    if (values.subscribe === true) {
      AjaxUtils.Subscribers.subscribe(values.email);
    }
  };

  const initFormValues = {
    firstName: user ? firstName : '',
    lastName: user ? lastName : '',
    phoneNumber: user ? phoneNumber : '',
    email: user ? email : '',
    password: '',
    confirmPassword: '',
    confirmation: false,
    subscribe: false,
    saveMyData: true
  };

  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography className={classes.header} variant='h6' gutterBottom>your personal details</Typography>
        <Formik
          initialValues={initFormValues}
          validationSchema={Yup.object().shape(validateObject)}
          onSubmit={submitPersonalDetailsData}>
          {({
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched
          }) => (
            <form autoComplete='on'>
              <ThemeProvider theme={theme}>
                <TextField
                  autoComplete='on'
                  name='firstName'
                  label={<IconLabel label='Enter your Name' Component={PersonIcon}/>}
                  className={classes.input}
                  value={values.firstName || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.firstName ? errors.firstName : ''}
                  error={touched.firstName && Boolean(errors.firstName)}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
                <TextField
                  autoComplete='on'
                  name='lastName'
                  label={<IconLabel label='Enter your Surname' Component={PersonIcon}/>}
                  className={classes.input}
                  value={values.lastName || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.lastName ? errors.lastName : ''}
                  error={touched.lastName && Boolean(errors.lastName)}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
                <TextField
                  autoComplete='on'
                  name='email'
                  label={<IconLabel label='Enter your e-mail' Component={EmailIcon}/>}
                  className={classes.input}
                  value={values.email || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.email ? errors.email : ''}
                  error={touched.email && Boolean(errors.email)}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
                <TextField
                  autoComplete='on'
                  name='phoneNumber'
                  label={<IconLabel label='Enter your phone number' Component={PhoneAndroidIcon}/>}
                  className={classes.input}
                  value={values.phoneNumber || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.phoneNumber ? errors.phoneNumber : ''}
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
                <FormGroup
                  name='saveMyData'
                  column='true'>
                  <FormControlLabel
                    control={<Checkbox checked={values.subscribe}
                      onChange={handleChange}
                      name='subscribe'
                      color='default'/>}
                    label='I wish to subscribe to the Vigo Shop newsletter'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={values.confirmation}
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
                  disabled={isSubmitting}
                  size='large'
                  variant='outlined'>Continue
                </Button>
              </CardActions>
            </form>
          )}
        </Formik>

      </Grid>
    </Grid>
  );
};

PersonalDetailsForm.propTypes = {
  saveUserAddressesHandler: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    user: store.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: data => dispatch(setUser(data))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(PersonalDetailsForm));