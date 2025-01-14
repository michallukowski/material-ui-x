import * as React from 'react';
import { GridCellParams } from '@material-ui/data-grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { createTheme } from '../../../_modules_/grid/utils/utils';
import { RATE_TYPE_OPTIONS } from '../services/static-data';

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      select: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
      },
      optionIcon: {
        minWidth: 36,
      },
      optionText: {
        overflow: 'hidden',
      },
    }),
  { defaultTheme },
);

function EditRateType(props: GridCellParams) {
  const classes = useStyles();
  const { id, value, api, field } = props;

  const handleChange = (event) => {
    const editProps = { value: event.target.value };
    if (event.key) {
      api.setEditCellProps({ id, field, props: editProps }, event);
    } else {
      api.commitCellChange({ id, field, props: editProps });
      api.setCellMode(id, field, 'view');
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      api.setCellMode(id, field, 'view');
    }
  };

  return (
    <Select
      value={value}
      classes={{ select: classes.select }}
      onChange={handleChange}
      MenuProps={{
        onClose: handleClose,
      }}
      autoFocus
      fullWidth
      open
    >
      {RATE_TYPE_OPTIONS.map((option) => {
        return (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        );
      })}
    </Select>
  );
}

export function renderEditRateType(params: GridCellParams) {
  return <EditRateType {...params} />;
}
