import React, {useState } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import theme from './CheckoutSteppereTheme';
import DeliveryForm from '../DeliveryForm/DeliveryForm';
import { Container } from '@material-ui/core';
import PaymentForm from '../PaymentForm/PaymentForm';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps () {
  return ['Personal data', 'Delivery Info', 'Payment Info', 'Complete your order'];
}
// todo get User data from BD and render as static info in 'case 0'
function getStepContent (stepIndex) {
  switch (stepIndex) {
    case 0:
      return (
        <Grid container>
          <Grid item sm={4}>
          John Smith
          1 Downing street
          Somewhere,
          City,
          Country, 00222,
          +380976662233
          </Grid>
        </Grid>
      );
    case 1:
      return (
        <DeliveryForm />
      );
    case 2:
      return (
        <PaymentForm />
      );
    case 3:
      return 'Review of order: order summary';
    default:
      return 'Unknown stepIndex';
  }
}

const CheckoutStepper = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  // todo - add order numbers instead of #2001539 in Typography

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box>
          {activeStep === steps.length ? (
            <Box >
              <Typography variant='h6' className={classes.instructions}>Thank you for your order.</Typography>
              <Typography variant='body2' className={classes.instructions}>Your order number is #2001539.
              We have emailed your order confirmation, and will send you an update when your order has shipped.
              Thank you for your order.</Typography>
              <Button onClick={handleReset}>Reset</Button>
            </Box>

          ) : (
            <Container >
              <Box>
                <Typography component='span' className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                <Box>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                Back
                  </Button>
                  <Button variant='contained' color='primary' onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </Box>
            </Container>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default React.memo(CheckoutStepper);