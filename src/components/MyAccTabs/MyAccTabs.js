import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import themeMui from './MyAccTabsTheme';
import PersonalDetailsForm from '../PersonalDetailsForm/PersonalDetailsForm';
import AddressForm from '../AddressForm/AddressForm';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component='span'>{children}</Typography>
        </Box>
      )}
    </Box>
  );
};

function a11yProps (index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%'
  }
}));

const MyAccTabs = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.root}>
      <ThemeProvider theme={themeMui}>
        <AppBar position='static' color='default'>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
            aria-label='full width tabs'
          >
            <Tab component='span' label='Contact info' {...a11yProps(0)} />
            <Tab component='span' label='Address' {...a11yProps(1)} />
            <Tab component='span' label='Wishlist' {...a11yProps(2)} />
            <Tab component='span' label='Purchase history' {...a11yProps(3)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0} dir={theme.direction}>
          <PersonalDetailsForm submitPersonalDetailsHandler={(submit) => {
            console.log('personal details values', submit);
            handleChange();
          }}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <AddressForm submitAddressHandler={(submit) => {
            console.log('address', submit);
            handleChange();
          }} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        Wishlist
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
        Purchase history
        </TabPanel>
      </ThemeProvider>
    </Box>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
export default React.memo(MyAccTabs);