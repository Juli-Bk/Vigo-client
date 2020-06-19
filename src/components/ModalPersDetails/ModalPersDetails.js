import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ListItem from '@material-ui/core/ListItem';
import DialogContentText from '@material-ui/core/DialogContentText';
import theme from '../../styles/formStyle/formStyleTheme';
import PersonalDetailsForm from '../PersonalDetailsForm/PersonalDetailsForm';
import useCommonStyles from '../../styles/formStyle/formStyle';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {ThemeProvider} from '@material-ui/styles';
import {setGuestData, setPersDetailsOpenState} from '../../redux/actions/actions';
import {connect} from 'react-redux';
import PersonalDetailsGuestForm from '../PersonalDetailsForm/PersonalDetailsGuestForm';

const ModalPersDetails = (props) => {
  const {
    user, isModalOpen,
    setModalOpen, setGuestData, guestData
  } = props;
  const commonClasses = useCommonStyles();
  const [message, setMessage] = useState('');
  const [isMessageHidden, setIsMessageHidden] = useState(false);

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const messageTag = <DialogContent>
    <Typography variant='subtitle1' gutterBottom style={{
      color: '#f0877c'
    }}>{message}</Typography>
  </DialogContent>;

  const savedGuestData = Object.keys(guestData).length > 0
    ? <>
      <Box component='ul' id="guest-data-list" style={{
        marginBottom: 10
      }}>
        <ListItem className={commonClasses.text}>First Name: {guestData.firstName}</ListItem>
        <ListItem className={commonClasses.text}>Last Name: {guestData.lastName}</ListItem>
        <ListItem className={commonClasses.text}>Phone Number: {guestData.phoneNumber}</ListItem>
        <ListItem className={commonClasses.text}>Email: {guestData.email}</ListItem>
      </Box>
    </>
    : null;

  const savedUserData = Object.keys(user).length > 0
    ? <>
      <Box component='ul' id="user-data-list" style={{
        marginBottom: 10
      }}>
        <ListItem className={commonClasses.text}>First Name: {user.firstName}</ListItem>
        <ListItem className={commonClasses.text}>Last Name: {user.lastName}</ListItem>
        <ListItem className={commonClasses.text}>Phone Number: {user.phoneNumber}</ListItem>
        <ListItem className={commonClasses.text}>Email: {user.email}</ListItem>
      </Box>
    </>
    : null;

  return (
    <ThemeProvider theme={theme}>
      <Box>
        {
          savedGuestData
        }
        {
          savedUserData
        }
        <Button className={commonClasses.button} onClick={handleClickOpen}>
          Change contact info
        </Button>
        <Dialog
          open={isModalOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            component='span'
            className={commonClasses.modalWindow}>

            <DialogContentText component='span' id="alert-dialog-description">
              {
                user._id
                  ? <PersonalDetailsForm component='span'
                    saveUserAddressesHandler={(result) => {
                      if (result) {
                        if (result.status === 400) {
                          setMessage(result.message);
                          setIsMessageHidden(true);
                        } else if (result.status === 200) {
                          isMessageHidden && setIsMessageHidden(false);
                          handleClose();
                        }
                      }
                      handleClose();
                    }}/>
                  : <PersonalDetailsGuestForm component='span' guestData={guestData}
                    saveGuestDataHandler={(result) => {
                      if (result) {
                        const userName = `${result.firstName} ${result.lastName}`;
                        setGuestData({
                          ...result,
                          userName
                        });
                      }
                      handleClose();
                    }
                    }/>
              }

            </DialogContentText>
            {isMessageHidden && messageTag}
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

const mapStateToProps = store => {
  return {
    isModalOpen: store.isPersDetailsModalOpen,
    user: store.user,
    guestData: store.guestData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setModalOpen: data => dispatch(setPersDetailsOpenState(data)),
    setGuestData: data => dispatch(setGuestData(data))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(ModalPersDetails));