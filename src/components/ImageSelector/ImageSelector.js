import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardContent, CardHeader } from '@material-ui/core';
import { Dropzone } from '@/components';
import { uploadImage } from '@/api/uploadProvider';
import { makeStyles } from '@material-ui/styles';
import { useSnackbar } from 'notistack';
import { generateErrorMsg } from '@/utils/messages/generateErrorMsg';
import { staticUrl } from '@/api/host';

const useStyles = makeStyles((theme) => ({
  image: {
    marginTop: theme.spacing(3),
    width: '30%'
  },
  cropper: {
    width: '50%'
  }
}));

const ImageSelector = (props) => {
  const { className, onSelect, value, title } = props;
  const [src, setSrc] = React.useState(null);
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const selectHandler = async () => {
    const fd = new FormData();
    fd.append('File', src.file);
    try {
      const res = await uploadImage(fd);
      const { name } = res;
      if (name) {
        setSrc(null);
        onSelect(name);
      }
    } catch (err) {
      if (err.errors) {
        err.errors.forEach((err) => enqueueSnackbar(generateErrorMsg(err), { variant: 'error' }));
      } else {
        enqueueSnackbar(err.toString(), { variant: 'error' });
      }
    }
  };

  return (
    <Card className={className}>
      {title && <CardHeader title={title} />}
      <CardContent>
        {value ? (
          <img className={classes.image} src={staticUrl.concat(value)} alt="" />
        ) : (
          <>
            <Dropzone onSelect={setSrc} />
            {src && <img className={classes.image} src={src.image} alt="" />}
          </>
        )}
        <CardActions>
          {src && (
            <Button variant="contained" color="primary" style={{ marginLeft: 'auto' }} onClick={selectHandler}>
              Select
            </Button>
          )}
          {value && (
            <Button variant="contained" color="primary" style={{ marginLeft: 'auto' }} onClick={() => onSelect('')}>
              Remove
            </Button>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
};

ImageSelector.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onSelect: PropTypes.func,
  title: PropTypes.string
};

ImageSelector.defaultProps = {
  className: '',
  value: '',
  title: '',
  onSelect: () => {}
};

export default ImageSelector;
