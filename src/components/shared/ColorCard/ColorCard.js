import React from 'react';

import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from '@material-ui/core';

import colorShape from '../../../helpers/props/colorShape';

import './ColorCard.scss';

class ColorCard extends React.Component {
  static propTypes = {
    color: colorShape.colorShape,
  }

  render() {
    const { color } = this.props;

    return (
      <Card className="ColorCard">
        <CardActionArea>
          <CardContent>
            <Box className="ColorCard__background" style={{ backgroundColor: color.code }}></Box>
            <Typography gutterBottom variant="h5" component="h4">
              {color.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default ColorCard;
