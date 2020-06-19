import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import theme from './ModalAddressTheme';
import AddressForm from '../AddressForm/AddressForm';
import useStyles from '../../containers/Header/headerStyle';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/styles';
import { setAddressModalOpenState, setGuestData } from '../../redux/actions/actions';
import { connect} from 'react-redux';
import { Typography } from '@material-ui/core';
import useCommonStyles from '../../styles/formStyle/formStyle';
import AddressGuestForm from '../../components/AddressForm/AddressGuestForm';

const ModalAddress = (props) => {
  const {
    user, guestData,
    isAddressModalOpen, setModalOpen,
    setGuestData
  } = props;
  const [message, setMessage] = useState('');
  const [isMessageHidden, setIsMessageHidden] = useState(false);

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const commonClasses = useCommonStyles();
  const classes = useStyles();

  const messageTag = <DialogContent>
    <Typography variant='subtitle1' gutterBottom style={{
      color: '#f0877c'
    }}>{message}</Typography>
  </DialogContent>;

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Button className={commonClasses.button} onClick={handleClickOpen}>
        Change delivery address
        </Button>
        <Dialog
          open={isAddressModalOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            component='span'
            className={classes.modalWindow}>

            <DialogContentText component='span' id="alert-dialog-description">
              {
                user._id
                  ? <AddressForm component='span'
                    submitAddressHandler={(result) => {
                      if (result) {
                        if (result.status === 400) {
                          setMessage(result.message);
                          setIsMessageHidden(true);
                        } else if (result.status === 200) {
                          isAddressModalOpen && setIsMessageHidden(false);
                          handleClose();
                        }
                      }
                      handleClose();
                    }}/>
                  : <AddressGuestForm component='span' guestData={guestData}
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
    isAddressModalOpen: store.isAddressModalOpen,
    user: store.user,
    guestData: store.guestData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setModalOpen: data => dispatch(setAddressModalOpenState(data)),
    setGuestData: data => dispatch(setGuestData(data))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(ModalAddress));