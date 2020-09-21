import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from '@material-ui/core';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';

import colorShape from '../../../helpers/props/colorShape';

import './ColorCard.scss';

class ColorCard extends React.Component {
  static propTypes = {
    color: colorShape.colorShape,
    deleteThisColor: PropTypes.func.isRequired,
  }

  deleteColorEvent = (e) => {
    e.preventDefault();
    const { deleteThisColor } = this.props;
    const colorId = e.currentTarget.id;

    deleteThisColor(colorId);
  }

  render() {
    const { color, paletteId } = this.props;
    const editColorLink = `/${paletteId}/edit/${color.id}`;

    return (
      <Card className="ColorCard">
          <CardActionArea className="ColorCard__hover">
          <HighlightOffTwoToneIcon className="hide-delete" onClick={this.deleteColorEvent} id={color.id}/>
            <Link to={editColorLink} className="ColorCard__Link">
              <CardContent>
                <Box className="ColorCard__background" style={{ backgroundColor: color.code }}></Box>
                <Typography gutterBottom variant="h5" component="h4">
                  {color.name}
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>
      </Card>
    );
  }
}

export default ColorCard;
