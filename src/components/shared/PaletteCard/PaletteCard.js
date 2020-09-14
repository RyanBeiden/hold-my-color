import React from 'react';

import {
  Card,
  CardActionArea,
  Typography,
  CardContent,
  Divider,
} from '@material-ui/core';

import paletteShape from '../../../helpers/props/paletteShape';

import './PaletteCard.scss';

class PaletteCard extends React.Component {
  static propTypes = {
    palette: paletteShape.paletteShape,
  }

  render() {
    const { palette } = this.props;

    return (
      <Card className="PaletteCard__container">
        <CardActionArea className="PaletteCard__action">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h3">
              {palette.name}
            </Typography>
            <Divider />
            <Typography variant="body2" color="textSecondary" component="p">
              Color Preview Here
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default PaletteCard;
