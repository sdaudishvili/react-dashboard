import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core';
import deepClone from '@/utils/deepClone';
import { Popup, ElemsRenderer, Cropper } from '@/components';
import { propertyKeyToLabel } from '@/utils/base';

const useStyles = makeStyles((theme) => ({
  addButton: {
    marginTop: theme.spacing(3),
    marginLeft: 'auto'
  }
}));

const types = ['video', 'image'];

const MediaList = (props) => {
  const { items, onListChange } = props;

  const [currentItem, setCurrentItem] = React.useState({
    index: null,
    details: {}
  });
  const [popupOpened, setPopupOpened] = React.useState(false);

  const classes = useStyles();

  const handleValueUpdate = ({ field, value }) => {
    setCurrentItem((val) => ({
      index: val.index,
      details: { ...val.details, [field]: value }
    }));
  };

  const cancelClickHandler = () => {
    setPopupOpened(false);
    setCurrentItem({ index: null, details: {} });
  };

  const editHandler = (index) => {
    setCurrentItem({ index, details: deepClone(items[index]) });
    setPopupOpened(true);
  };

  const deleteHandler = (index) => {
    const cpy = Array.prototype.slice.call(items, 0);
    cpy.splice(index, 1);
    onListChange(cpy);
  };

  const popupSaveHandler = () => {
    const list = items || [];
    if (currentItem.index !== null) {
      items[currentItem.index] = currentItem.details;
      onListChange([...list]);
    } else {
      onListChange([...list, currentItem.details]);
    }
    setCurrentItem({ index: null, details: {} });
    setPopupOpened(false);
  };

  const generateTextFieldProps = (key) => ({
    fullWidth: true,
    label: propertyKeyToLabel(key),
    name: key,
    onChange: ({ target: { value } }) => handleValueUpdate({ field: key, value }),
    value: currentItem.details[key],
    variant: 'outlined'
  });

  const popupElems = [
    <FormControl variant="outlined" fullWidth>
      <InputLabel>Type</InputLabel>
      <Select value={currentItem.details.type || ''} label="Type">
        {types.map((option) => (
          <MenuItem value={option} onClick={() => handleValueUpdate({ field: 'type', value: option })}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>,
    currentItem.details.type === 'video' && <TextField {...generateTextFieldProps('url', { multiLanguage: true })} />,
    currentItem.details.type === 'image' && (
      <Cropper value={currentItem.details.url || ''} onSelect={(value) => handleValueUpdate({ field: 'url', value })} />
    )
  ];

  return (
    <>
      <Card>
        <CardHeader
          title="Media"
          action={
            <Button
              color="primary"
              variant="contained"
              onClick={() => setPopupOpened(true)}
              className={classes.addButton}
            >
              ADD
            </Button>
          }
        />
        {items && items.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Url</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items &&
                items.map((item, index) => {
                  return (
                    <TableRow hover key={index.toString()}>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.url}</TableCell>
                      <TableCell align="right" className={classes.actions}>
                        <Button onClick={() => editHandler(index)} color="primary" size="small" variant="outlined">
                          Edit
                        </Button>
                        <Button
                          style={{ marginLeft: 10 }}
                          onClick={() => deleteHandler(index)}
                          color="secondary"
                          variant="contained"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </Card>

      <Popup
        open={popupOpened}
        title="Answer"
        onSave={popupSaveHandler}
        onClose={cancelClickHandler}
        onCancel={cancelClickHandler}
      >
        <ElemsRenderer elems={popupElems} />
      </Popup>
    </>
  );
};

MediaList.propTypes = {
  items: PropTypes.array,
  onListChange: PropTypes.func
};

MediaList.defaultProps = {
  onListChange: () => {},
  items: []
};

export default MediaList;
